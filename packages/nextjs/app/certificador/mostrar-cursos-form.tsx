"use client";

import { useEffect, useState } from "react";
import { stringify } from "querystring";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~~/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~~/components/ui/table";
import { useScaffoldEventHistory, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export function Componente() {
  const { address: connectedAddress } = useAccount();

  const [mounted, setMounted] = useState(false);
  const [arregloCategorias, setArregloCategorias] = useState<any>();
  const [arregloCursos, setArregloCursos] = useState<any>();

  const { data: mostrarArregloDeCategorias }: { data: any } = useScaffoldReadContract({
    contractName: "Certificados",
    functionName: "mostrarArregloDeCategorias",
  });

  const { data: events1 } = useScaffoldEventHistory({
    contractName: "Certificados",
    eventName: "LogCursoCreado",
    fromBlock: 0n,
  });

  const { data: events2 } = useScaffoldEventHistory({
    contractName: "Certificados",
    eventName: "LogCursoModificado",
    fromBlock: 0n,
  });

  useEffect(() => {
    if (!connectedAddress || !mounted || events1 === undefined || events1.length === 0 || events2 === undefined) return;
    else {
      console.log(events1);
      events2?.forEach((event2: any) => {
        const matchingEvent = events1?.find(
          (event1: any) => event1.args.categoria === event2.args.categoria && event1.args.curso === event2.args.curso,
        );
        if (matchingEvent) {
          Object.assign(matchingEvent, event2);
        }
      });
      const arr = [];
      for (let i = 0; i < events1.length; i++) {
        arr.push(events1[i].args);
      }

      const aux: any = [];
      for (let i = 0; i < arr.length; i++) {
        const indice = Number(arr[i].categoria);
        if (!aux[indice]) {
          aux[indice] = [];
        }
        if (arr[i].certificador == connectedAddress) aux[Number(arr[i].categoria)].push(arr[i]);
      }
      console.log(aux);
      if (stringify(arregloCursos) !== stringify(aux)) {
        setArregloCursos(aux);
      }
    }
  }, [events1, events2, connectedAddress, arregloCursos, mounted]);

  useEffect(() => {
    if (!mostrarArregloDeCategorias) return;
    setMounted(true);
    setArregloCategorias(mostrarArregloDeCategorias);
    // console.log(mostrarArregloDeCategorias);
  }, [mostrarArregloDeCategorias]);

  if (mounted && arregloCategorias) {
    return (
      <Accordion type="single" collapsible className="w-full">
        {arregloCategorias.map((categoria: any, index: number) => (
          <AccordionItem value={`item-${index + 1}`} key={index}>
            <AccordionTrigger className="justify-between ml-4">
              <span className="flex justify-center flex-grow">{categoria.nombre}</span>
              <span className="flex sm:w-[200px] w-[100px]">{categoria.activa ? "Activa" : "Inactiva"}</span>
            </AccordionTrigger>
            <AccordionContent className="flex justify-center">
              {arregloCursos && arregloCursos[index] !== undefined && arregloCursos[index].length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Curso</TableHead>
                      <TableHead>Duración</TableHead>
                      <TableHead>Certificador</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Tipo de Certificado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {arregloCursos[index]?.map((curso: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{curso.nombreCurso}</TableCell>
                        <TableCell>{Number(curso.duracion)}</TableCell>
                        <TableCell>
                          <Address address={curso.certificador} />
                        </TableCell>
                        <TableCell>{curso.activo ? "Activo" : "Inactivo"}</TableCell>
                        <TableCell>{curso.tipoCertificado}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <span>Sin cursos en esta categoría</span>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }
}
