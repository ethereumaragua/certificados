"use client";

import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { z } from "zod";
import { Button } from "~~/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~~/components/ui/form";
import { Input } from "~~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~~/components/ui/select";
import { useScaffoldContract, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const formSchema = z.object({
  categoria: z.string({
    required_error: "Por favor seleccione una categoría.",
  }),
  curso: z.string({
    required_error: "Por favor seleccione un curso.",
  }),
  address: z.string().length(42, {
    message: "El address debe tener 42 caracteres.",
  }),
});

type FormValores = z.infer<typeof formSchema>;

export function Componente() {
  const [mounted, setMounted] = useState(false);
  const [arregloCategorias, setArregloCategorias] = useState<any>();
  const [arregloCursos, setArregloCursos] = useState<any>();
  const [catSeleccionada, setCatSeleccionada] = useState<any>();

  const { data: mostrarArregloDeCategorias }: { data: any } = useScaffoldReadContract({
    contractName: "Certificados",
    functionName: "mostrarArregloDeCategorias",
  });

  const { data: mostrarArregloCursosPorCategoria }: { data: any } = useScaffoldReadContract({
    contractName: "Certificados",
    functionName: "mostrarArregloCursosPorCategoria",
  });

  const { data: certificadosContract } = useScaffoldContract({
    contractName: "Certificados",
  });

  const dataCursos = useCallback(
    async (categoria: number, cantidadCursos: number) => {
      const arr: any = [];
      for (let j = 0; j < cantidadCursos; j++) {
        try {
          const a = await certificadosContract?.read.mapCurso([BigInt(categoria), BigInt(j)]);
          if (a) arr.push(a);
        } catch (error) {
          console.log(error);
        }
      }
      console.log(arr);
      setArregloCursos(arr);
    },
    [certificadosContract, setArregloCursos],
  );

  useEffect(() => {
    if (!mostrarArregloDeCategorias) return;
    setMounted(true);
    setArregloCategorias(mostrarArregloDeCategorias);
    console.log(mostrarArregloDeCategorias);
  }, [mostrarArregloDeCategorias]);

  useEffect(() => {
    if (!catSeleccionada) return;
    dataCursos(catSeleccionada, mostrarArregloCursosPorCategoria[catSeleccionada]);
  }, [catSeleccionada, dataCursos, mostrarArregloCursosPorCategoria]);

  const { writeContractAsync: eliminarCertificadoAddress } = useScaffoldWriteContract("Certificados");

  const transaccion = async (usuarioAddress: string, categoria: number, curso: number) => {
    try {
      await eliminarCertificadoAddress(
        {
          functionName: "eliminarCertificadoAddress",
          args: [usuarioAddress, BigInt(categoria), BigInt(curso)],
        },
        {
          blockConfirmations: 1,
          onBlockConfirmation: async (txnReceipt: any) => {
            console.log(txnReceipt);
          },
        },
      );
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const form = useForm<FormValores>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoria: undefined,
      curso: undefined,
      address: "",
    },
    mode: "onSubmit",
  });

  function onSubmit(data: FormValores) {
    console.log(JSON.stringify(data, null, 2));

    transaccion(data.address, Number(data.categoria), Number(data.curso));
  }

  if (mounted && arregloCategorias) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem
                onChange={(e: any) => {
                  setCatSeleccionada(e.target.value);
                }}
              >
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {arregloCategorias && arregloCategorias.length > 0 ? "Categorías" : "Sin Categorías"}
                        </SelectLabel>
                        {arregloCategorias.map((categoria: any, index: number) => (
                          <SelectItem key={index} value={index.toString()}>
                            {categoria.nombre}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Esta es la Categoría del Curso.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="curso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Curso</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{arregloCursos && arregloCursos.length > 0 ? "Cursos" : "Sin Cursos"}</SelectLabel>
                        {arregloCursos &&
                          arregloCursos.length > 0 &&
                          arregloCursos.map((curso: any, index: number) => (
                            <SelectItem key={index} value={index.toString()}>
                              {curso[0]} | {Number(curso[2])} horas | {curso[5] ? "Abierto" : "Cerrado"}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Este es el Curso.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address del Usuario</FormLabel>
                <FormControl>
                  <Input placeholder="0x123..." {...field} />
                </FormControl>
                <FormDescription>Esta es la dirección ethereum del Usuario.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Eliminar Certificado del Usuario</Button>
        </form>
      </Form>
    );
  }
}
