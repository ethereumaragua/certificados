"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import ReturnButton from "~~/components/common/ReturnButton";
import Cert1 from "~~/components/common/tipoCertificados/cert1";
import { Address } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~~/components/ui/dialog";
import {
  useScaffoldContract,
  useScaffoldEventHistory,
  useScaffoldReadContract,
  useTargetNetwork,
} from "~~/hooks/scaffold-eth";
import { getBlockExplorerTxLink } from "~~/utils/scaffold-eth";

function unixToFecha(timestamp: number) {
  const fecha = new Date(timestamp * 1000);
  const opciones: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return fecha.toLocaleDateString("es-ES", opciones);
}

const usePage = ({ params }: { params: { address: string } }) => {
  const [mounted, setMounted] = useState(false);
  const [poseeCertificados, setPoseeCertificados] = useState(false);
  const [certificados, setCertificados] = useState<any>([]);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [certs, setCerts] = useState<any>([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [certSelected, setCertSelected] = useState(searchParams.get("cert"));
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: events, refetch: refetchEvents } = useScaffoldEventHistory({
    contractName: "Certificados",
    eventName: "LogCertificadoAddress",
    fromBlock: 0n,
    filters: {
      idCertificado: certificados.map((certificado: any) => certificado[2].idCertificado),
    },
  });

  useEffect(() => {
    if (events && events.length > 0) {
      console.log(events);
      const a: any = certificados;
      for (let i = 0; i < certificados.length; i++) {
        for (let j = 0; j < events.length; j++) {
          if (events[j].args.idCertificado == certificados[i][2].idCertificado) {
            a[i].push({
              fecha: events[j].args.fecha,
              hash: (events[j] as any).transactionHash,
              nombreCertificador: events[j].args.nombreCertificador,
            });
          }
        }
      }
      setCerts(a);
    }
  }, [events, certificados]);

  useEffect(() => {
    if (certificados.length > 0) refetchEvents();
  }, [certificados, refetchEvents]);

  useEffect(() => {
    if (certs && certSelected && !dialogOpen) {
      setDialogOpen(true);
    }
  }, [certs, certSelected, dialogOpen]);

  const { data: certificadosContract } = useScaffoldContract({
    contractName: "Certificados",
  });

  const { data: datosYCertificadosUsuarioAddress }: { data: any } = useScaffoldReadContract({
    contractName: "Certificados",
    functionName: "datosYCertificadosUsuarioAddress",
    args: [params.address],
  });

  const estaCertificado = async () => {
    try {
      const arr: any = [];
      let a: any = [];
      for (let i = 0; i < datosYCertificadosUsuarioAddress[0].length; i++) {
        try {
          a = await certificadosContract?.read.mostrarCategoriaYCurso([
            BigInt(datosYCertificadosUsuarioAddress[0][i].categoria),
            BigInt(datosYCertificadosUsuarioAddress[0][i].curso),
          ]);
          if (a) {
            a.push({
              idCertificado: datosYCertificadosUsuarioAddress[0][i].idCertificado,
              usuario: datosYCertificadosUsuarioAddress[1],
            });
            arr.push(a);
          }
        } catch (error) {
          console.log(error);
        }
      }
      console.log(arr);
      setCertificados(arr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (datosYCertificadosUsuarioAddress && datosYCertificadosUsuarioAddress[0].length > 0) {
      console.log(datosYCertificadosUsuarioAddress);
      setNombreUsuario(datosYCertificadosUsuarioAddress[1]);
      setPoseeCertificados(true);
      estaCertificado();
    }
  }, [datosYCertificadosUsuarioAddress, estaCertificado]);

  const { targetNetwork } = useTargetNetwork();

  const acortar = (s: string) => {
    return (
      <a href={getBlockExplorerTxLink(targetNetwork.id, s)} target="_blank" rel="noreferrer">
        {s.slice(0, 5) + "..." + s.slice(-3)}
      </a>
    );
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  if (mounted) {
    return (
      <>
        <div className="pt-10 pl-10">
          <ReturnButton ruta="/usuario/address" />
        </div>

        <div className="flex flex-col items-center flex-grow px-5">
          <div className="w-full text-center">
            <span className="block mt-6 mb-2 text-5xl font-bold sm:mt-0">Certificados</span>
            <div className="flex flex-col my-8">
              {nombreUsuario && <div className="text-4xl font-semibold">{nombreUsuario}</div>}
              <div className="flex flex-row justify-center gap-2 mt-4 text-2xl font-extralight">
                <Address address={params.address} onlyEnsOrAddress size="2xl" />
              </div>
            </div>
          </div>
          {poseeCertificados && certs ? (
            <div className="flex-grow w-full my-4">
              <VerCertificado
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                certSelected={certSelected}
                setCertSelected={setCertSelected}
                certs={certs}
                params={params}
              />

              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-10 lg:gap-x-4">
                {certs.map((certificado: any, index: number) => {
                  return (
                    <Card className="w-full mx-4 shadow-md sm:w-2/5 md:w-1/3 lg:w-1/4" key={index}>
                      <CardHeader>
                        <CardTitle className="flex justify-end text-md">{certificado[0]}</CardTitle>
                        <CardTitle
                          className={`${certificado[1].nombreCurso.length > 32 ? "text-lg" : ""} flex !mt-0 items-center font-bold h-[70px] overflow-auto`}
                        >
                          {certificado[1].nombreCurso}
                        </CardTitle>
                        <CardDescription className="h-[70px] overflow-auto">
                          {certificado[1].descripcion}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center text-sm lg:text-base">
                        <span className="flex flex-row justify-between w-full">
                          <span>ID Certificado </span>
                          <span>{Number(certificado[2].idCertificado)} </span>
                        </span>
                        <span className="flex flex-row justify-between w-full">
                          <span>Certificador </span>
                          <Address address={certificado[1].certificador} blockie={false} size="sm" />
                        </span>
                        <span className="flex flex-row justify-between w-full">
                          <span>Fecha </span>
                          <span>{unixToFecha(Number(certificado[3].fecha))}</span>
                        </span>
                        <span className="flex flex-row justify-between w-full">
                          <span>Hash </span>
                          <span>{acortar(certificado[3].hash)} </span>
                        </span>
                      </CardContent>
                      <CardFooter className="flex justify-center">
                        <Button
                          className="w-full"
                          onClick={() => {
                            // setDialogOpen(true);
                            setCertSelected(Number(certificado[2].idCertificado).toString());
                            router.push(
                              pathname +
                                "?" +
                                createQueryString("cert", Number(certificado[2].idCertificado).toString()),
                              { scroll: false },
                            );
                          }}
                        >
                          Ver Certificado
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>Este usuario no posee certificados</div>
          )}
        </div>
      </>
    );
  }
};

const VerCertificado = memo(
  ({
    open,
    onClose,
    certSelected,
    setCertSelected,
    certs,
    params,
  }: {
    open: boolean;
    onClose: () => void;
    certSelected: any;
    setCertSelected: any;
    certs: any;
    params: { address: string };
  }) => {
    const [loading, setLoading] = useState(false);

    // const [windowSize, setWindowSize] = useState(document.body.clientWidth);

    // useEffect(() => {
    //   const handleResize = () => {
    //     setWindowSize(document.body.clientWidth);
    //   };
    //   window.addEventListener('resize', handleResize);
    //   return () => {
    //     window.removeEventListener('resize', handleResize);
    //   };
    // }, []);

    const handleDownload = async () => {
      setLoading(true);
      const div = document.getElementById("div-to-download");
      const dialog = document.getElementById("dialog");
      if (div && dialog) {
        const divCopia = div.cloneNode(true) as HTMLDivElement;
        dialog.appendChild(divCopia);
        divCopia.style.width = "798px";
        divCopia.style.height = "515px";
        const scale = 3; // Aumenta la resolución a 3x
        const canvas = await html2canvas(divCopia, {
          scale,
        });
        dialog.removeChild(divCopia);
        const dataURL = canvas.toDataURL("image/png");
        const blob = await fetch(dataURL).then(response => response.blob());
        saveAs(blob, "cert.png");
      }
      setLoading(false);
    };

    // const handleDownload = async () => {
    //   setLoading(true);
    //   const div = document.getElementById('div-to-download');
    //   if (div) {
    //     const scale = 3; // Aumenta la resolución a 3x
    //     const canvas = await html2canvas(div, {
    //       scale,
    //     });
    //     const dataURL = canvas.toDataURL('image/png');
    //     const blob = await fetch(dataURL).then((response) => response.blob());
    //     saveAs(blob, 'cert.png');
    //   }
    //   setLoading(false);
    // };

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);

        return params.toString();
      },
      [searchParams],
    );

    const index = certs.findIndex((cert: any) => Number(cert[2].idCertificado).toString() === certSelected);

    if (certs[index] && open)
      return (
        <Dialog
          open={open}
          onOpenChange={() => {
            onClose();
            setCertSelected(null);
            router.push(pathname + "?" + createQueryString("cert", ""), { scroll: false });
          }}
        >
          <DialogContent className="min-w-[90%] lg:min-w-[75%] xl:min-w-[60%] overflow-y-auto max-h-screen">
            <VisuallyHidden>
              <div id="dialog" className="w-0 h-0"></div>
              <DialogHeader>
                <DialogTitle>Title</DialogTitle>
                <DialogDescription>Description</DialogDescription>
              </DialogHeader>
            </VisuallyHidden>
            {/* <div>
          {certs[index][1].nombreCurso}
        </div> */}
            <div className="mt-4" id="div-to-download">
              <Cert1
                address={params.address}
                pais={""}
                id={0}
                nombre={certs[index][2].usuario}
                curso={certs[index][1].nombreCurso}
                institucion="UPT Aragua y ETH Aragua"
                duracion={Number(certs[index][1].duracion).toString()}
                certificador={certs[index][1].certificador}
                fecha={unixToFecha(Number(certs[index][3].fecha))}
                nombreCertificador={certs[index][3].nombreCertificador}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleDownload} disabled={loading}>
                {loading ? "Descargando..." : "Descargar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
  },
);

VerCertificado.displayName = "VerCertificado";

export default usePage;
