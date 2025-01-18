"use client";

import { useState, useEffect, useCallback, memo } from "react";
import ReturnButton from "~~/components/common/ReturnButton";
import Paises from "~~/components/common/paises/paises";
import { useScaffoldContract, useScaffoldEventHistory, useScaffoldReadContract, useTargetNetwork } from "~~/hooks/scaffold-eth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "~~/components/ui/card";
import { Address } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import { getBlockExplorerTxLink } from "~~/utils/scaffold-eth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "~~/components/ui/dialog"
import Cert1 from "~~/components/common/tipoCertificados/cert1";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { FaCheck, FaLink, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Link from "next/link";

function unixToFecha(timestamp: number) {
  const fecha = new Date(timestamp * 1000);
  const opciones: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return fecha.toLocaleDateString('es-ES', opciones);
}

const page = ({ params }: { params: { pais: number; id: number } }) => {

  const [mounted, setMounted] = useState(false);
  const [poseeCertificados, setPoseeCertificados] = useState(false);
  const [certificados, setCertificados] = useState<any>([]);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [certs, setCerts] = useState<any>([]);

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams();

  const [certSelected, setCertSelected] = useState(searchParams.get("cert"));
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data: events,
    refetch: refetchEvents,
  } = useScaffoldEventHistory({
    contractName: "Certificados",
    eventName: "LogCertificado",
    fromBlock: 0n,
    filters: { 
      idCertificado: certificados.map((certificado: any) => certificado[2].idCertificado) 
    },
  });

  useEffect(() => {
    if(events && events.length > 0){
      console.log(events);
      let a:any = certificados;
      for(let i = 0; i < certificados.length; i++) {
        for(let j = 0; j < events.length; j++) {
          if(events[j].args.idCertificado == certificados[i][2].idCertificado) {
            a[i].push({"fecha": events[j].args.fecha, "hash":(events[j] as any).transactionHash, "nombreCertificador": events[j].args.nombreCertificador});
          }
        }
      }
      setCerts(a);
    }
  }, [events]);

  useEffect(() => {
    if(certificados.length > 0)
      refetchEvents();
  }, [certificados]);

  useEffect(() => {
    if(certs &&certSelected && !dialogOpen) {
      setDialogOpen(true);
    }
  }, [certs, certSelected]);

  const { data: certificadosContract } = useScaffoldContract({
    contractName: "Certificados",
  });

  const { data: datosYCertificadosUsuario }: { data: any } = useScaffoldReadContract({
    contractName: "Certificados",
    functionName: "datosYCertificadosUsuario",
    args: [Number(params.pais), BigInt(params.id)],
  });

  const estaCertificado = async() => {
    try{
      let arr:any = [];
      let a:any = [];
      for(let i = 0; i < datosYCertificadosUsuario[0].length; i++) {
        try{
          a = await certificadosContract?.read.mostrarCategoriaYCurso([BigInt(datosYCertificadosUsuario[0][i].categoria), BigInt(datosYCertificadosUsuario[0][i].curso)]);
          if(a) {
            a.push({"idCertificado": datosYCertificadosUsuario[0][i].idCertificado, "usuario": datosYCertificadosUsuario[1]});
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
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (datosYCertificadosUsuario && datosYCertificadosUsuario[0].length > 0) {
      console.log(datosYCertificadosUsuario);
      setNombreUsuario(datosYCertificadosUsuario[1]);
      setPoseeCertificados(true);
      estaCertificado();
    }
  }, [datosYCertificadosUsuario]);

  

  const { targetNetwork } = useTargetNetwork();

  const acortar = (s: string) => {
    return (
      <a
        href={getBlockExplorerTxLink(targetNetwork.id, s)}
        target="_blank"
        rel="noreferrer"
      >
        {s.slice(0, 5) + "..." + s.slice(-3)}
      </a>
    );
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  if(mounted) {
    return (
      <>
        <div className="pt-10 pl-10">
          <ReturnButton ruta="/usuario/id"/>
        </div>

        <div className="flex flex-col items-center flex-grow px-5">
          <div className="w-full text-center">
            <span className="block mt-6 mb-2 text-5xl font-bold sm:mt-0">Certificados</span>
            <div className="flex flex-col my-8">
              {nombreUsuario && <div className="text-4xl font-semibold">{nombreUsuario}</div>}
              <div className="flex flex-row justify-center gap-2 text-2xl font-extralight">
                <div>{Paises[params.pais] ? Paises[params.pais].label : "Fuera de Rango"}</div>
                <div>ID: {params.id}</div>
              </div>
            </div>
          </div>
          {poseeCertificados && certs ? 
            (<div className="flex-grow w-full my-4">

              <VerCertificado open={dialogOpen} onClose={() => setDialogOpen(false)} certSelected={certSelected} setCertSelected={setCertSelected} certs={certs} params={params}/>

              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-10 lg:gap-x-4">
                  {certs.map((certificado: any, index: number) => {
                    return (
                        <Card className="w-full mx-4 sm:w-2/5 md:w-1/3 lg:w-1/4" key={index}>
                          <CardHeader>
                            <CardTitle className="flex justify-end text-md">{certificado[0]}</CardTitle>
                            <CardTitle className={`${certificado[1].nombreCurso.length > 32 ? "text-lg" : ""} flex !mt-0 items-center font-bold h-[70px] overflow-auto`}>{certificado[1].nombreCurso}</CardTitle>
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
                              <Address address={certificado[1].certificador} blockie={false} size="sm"/>
                            </span>
                            <span className="flex flex-row justify-between w-full">
                              <span>Fecha </span>
                              <span>{unixToFecha(Number(certificado[3].fecha))}</span>
                            </span>
                            <span className="flex flex-row justify-between w-full">
                              <span>Hash </span>
                              <span>{acortar((certificado[3].hash))} </span>
                            </span>
                          </CardContent>
                          <CardFooter className="flex justify-center">
                            <Button className="w-full"
                            onClick={() => {
                                // setDialogOpen(true);
                                setCertSelected(Number(certificado[2].idCertificado).toString());
                                router.push(pathname + '?' + createQueryString('cert', Number(certificado[2].idCertificado).toString()), { scroll: false })
                              }
                            }>Ver Certificado</Button>
                          </CardFooter>
                        </Card>
                    )
                  })}
                </div>
              </div>) : 
            <div>Este usuario no posee certificados</div>
          }
          
        </div>
      </>
    );
  }
};

const VerCertificado = memo(({ open, onClose, certSelected, setCertSelected, certs, params }: { open: boolean; onClose: () => void, certSelected: any, setCertSelected: any, certs: any, params: { pais: number; id: number }}) => {

  const [loading, setLoading] = useState(false);

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

  const handleDownload = async () => {
    setLoading(true);
    const div = document.getElementById('div-to-download');
    const dialog = document.getElementById('dialog');
    if (div && dialog) {
      const divCopia = div.cloneNode(true) as HTMLDivElement;
      dialog.appendChild(divCopia);
      divCopia.style.width = '798px';
      divCopia.style.height = '515px';
      const scale = 3; // Aumenta la resolución a 3x
      const canvas = await html2canvas(
        divCopia, {
        scale,
      });
      dialog.removeChild(divCopia);
      const dataURL = canvas.toDataURL('image/png');
      const blob = await fetch(dataURL).then((response) => response.blob());
      saveAs(blob, 'cert.png');
    }
    setLoading(false);
  };

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  let index = certs.findIndex((cert:any) => Number(cert[2].idCertificado).toString() === certSelected);

  const [location, setLocation] = useState('');
  
  useEffect(() => {
    setTimeout(function() {
      setLocation(window.location.href);
    }, 500)
  }, [window.location.href]);

  const [copiado, setCopiado] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(location);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1200);
  };

  if(certs[index] && open) return (
    <Dialog open={open} onOpenChange={() => {
        onClose()
        setCertSelected(null);
        router.push(pathname + '?' + createQueryString('cert', ''), { scroll: false })
      }}>
      <DialogContent 
        className="min-w-[60%] overflow-y-auto max-h-screen"
      >
        <VisuallyHidden>
          <div id="dialog" className="w-0 h-0"></div>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>
              Description
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        {/* <div>
          {certs[index][1].nombreCurso}
        </div> */}
        <div className="mt-4" id="div-to-download">
          <Cert1
              address={""}
              pais={Paises[params.pais] ? Paises[params.pais].label : "Fuera de Rango"}
              id={params.id}
              nombre={certs[index][2].usuario}
              curso={certs[index][1].nombreCurso}
              institucion="UPT Aragua y ETH Aragua"
              duracion={Number(certs[index][1].duracion).toString()}
              certificador={certs[index][1].certificador}
              fecha={unixToFecha(Number(certs[index][3].fecha))}
              nombreCertificador={certs[index][3].nombreCertificador}
            />
        </div>
        <DialogFooter className="flex flex-row gap-2">
          <button onClick={handleCopy} className="self-center">
          {copiado ? <FaCheck className="w-8 h-8"/> : <FaLink className="w-8 h-8" onClick={handleCopy} title="Copiar enlace"/>}
          </button>
          <Link href={`https://twitter.com/intent/tweet?url=${location}`} target="_blank" className="self-center" title="Compartir en Twitter">
            <FaTwitter className="w-9 h-9"/>
          </Link>
          <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${location}`} target="_blank" className="self-center" title="Compartir en LinkedIn">
            <FaLinkedin className="w-9 h-9"/>
          </Link>
          <Button onClick={handleDownload} disabled={loading} title="Descargar Certificado">
            {loading ? 'Descargando...' : 'Descargar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
});

export default page;
