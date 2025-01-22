"use client";

import { useEffect, useState } from "react";
import { Address } from "~~/components/scaffold-eth";
import {
  Table,
  TableBody, // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~~/components/ui/table";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export function Componente() {
  const [mounted, setMounted] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [nombres, setNombres] = useState([]);

  const { data: mostrarAdmins }: { data: any } = useScaffoldReadContract({
    contractName: "Certificados",
    functionName: "mostrarAdmins",
  });

  const { data: superAdmin }: { data: any } = useScaffoldReadContract({
    contractName: "Certificados",
    functionName: "superAdmin",
  });

  useEffect(() => {
    if (!mostrarAdmins) return;
    setMounted(true);
    setAdmins(mostrarAdmins[0]);
    setNombres(mostrarAdmins[1]);
  }, [mostrarAdmins]);

  if (mounted) {
    return (
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-[200px]">Nombre</TableHead>
            <TableHead className="flex-grow text-center">Cuenta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {superAdmin && (
            <TableRow>
              <TableCell className="font-medium text-center w-[200px]">SUPER_ADMIN</TableCell>
              <TableCell className="flex justify-center flex-grow">
                <Address address={superAdmin} format={window.innerWidth < 768 ? "short" : "long"} />
              </TableCell>
            </TableRow>
          )}
          {admins.map((admin, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center w-[200px]">{nombres[index]}</TableCell>
              <TableCell className="flex justify-center flex-grow">
                <Address address={admin} format={window.innerWidth < 768 ? "short" : "long"} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
