"use client";

import { useCallback, useEffect, useState } from "react";
import Cert1 from "./tipoCertificados/cert1";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~~/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~~/components/ui/form";
import { Input } from "~~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~~/components/ui/radio-group";
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
  nombre: z
    .string()
    .min(2, {
      message: "Nombre debe tener al menos 2 caracteres.",
    })
    .max(64, {
      message: "Nombre no debe tener más de 64 caracteres.",
    }),
  descripcion: z
    .string()
    .min(2, {
      message: "Descripción debe tener al menos 2 caracteres.",
    })
    .max(256, {
      message: "Descripción no debe tener más de 256 characters.",
    }),
  duracion: z.coerce
    .number()
    .min(1, {
      message: "Duración debe ser mayor a 0.",
    })
    .max(999, {
      message: "Duración no puede ser mayor a 999.",
    }),

  tipoCertificado: z.coerce.number().min(1, {
    message: "Debes seleccionar uno de los certificados disponibles.",
  }),
  certificador: z.string().length(42, {
    message: "El address debe tener 42 caracteres.",
  }),
  activo: z.coerce.boolean(),
});

type FormValores = z.infer<typeof formSchema>;

export function Componente() {
  const [mounted, setMounted] = useState(false);
  const [arregloCategorias, setArregloCategorias] = useState<any>();
  const [arregloCursos, setArregloCursos] = useState<any>();
  const [catSeleccionada, setCatSeleccionada] = useState<any>();
  const [cursoSeleccionado, setCursoSeleccionado] = useState<any>();

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

  // useEffect(() => {
  //   if(!mostrarArregloCursosPorCategoria) return
  //   console.log(mostrarArregloCursosPorCategoria);
  //   dataCursos(mostrarArregloCursosPorCategoria);
  // }, [mostrarArregloCursosPorCategoria]);

  useEffect(() => {
    if (!catSeleccionada) return;
    dataCursos(catSeleccionada, mostrarArregloCursosPorCategoria[catSeleccionada]);
  }, [catSeleccionada, dataCursos, mostrarArregloCursosPorCategoria]);

  const { writeContractAsync: modificarCurso } = useScaffoldWriteContract("Certificados");

  const transaccion = async (
    categoria: number,
    curso: number,
    nombre: string,
    descripcion: string,
    duracion: number,
    tipoCertificado: number,
    certificador: string,
    activo: boolean,
  ) => {
    try {
      await modificarCurso(
        {
          functionName: "modificarCurso",
          args: [
            BigInt(categoria),
            BigInt(curso),
            nombre,
            descripcion,
            BigInt(duracion),
            tipoCertificado,
            certificador,
            activo,
          ],
        },
        {
          blockConfirmations: 1,
          onBlockConfirmation: async (txnReceipt: any) => {
            console.log(txnReceipt);
            // setShowConfirmation(true);
            // form.reset();
            dataCursos(categoria, mostrarArregloCursosPorCategoria[categoria]);
          },
          onSuccess: async function (data: any) {
            // console.log("Success", data);
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
      nombre: "",
      descripcion: "",
      duracion: undefined,
      certificador: "",
      tipoCertificado: 1,
      activo: true,
    },
    mode: "onSubmit",
  });

  function onSubmit(data: FormValores) {
    console.log(JSON.stringify(data, null, 2));
    transaccion(
      Number(data.categoria),
      Number(data.curso),
      data.nombre,
      data.descripcion,
      data.duracion,
      Number(data.tipoCertificado),
      data.certificador,
      data.activo,
    );
  }

  useEffect(() => {
    if (cursoSeleccionado) {
      form.setValue("nombre", arregloCursos[cursoSeleccionado][0]);
      form.setValue("descripcion", arregloCursos[cursoSeleccionado][1]);
      form.setValue("duracion", Number(arregloCursos[cursoSeleccionado][2]));
      form.setValue("tipoCertificado", arregloCursos[cursoSeleccionado][3]);
      form.setValue("certificador", arregloCursos[cursoSeleccionado][4]);
    }
  }, [cursoSeleccionado, arregloCursos, form]);

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
                        <SelectLabel>Categorías</SelectLabel>
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
              <FormItem
                onChange={(e: any) => {
                  setCursoSeleccionado(e.target.value);
                }}
              >
                <FormLabel>Curso</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Curso" />
                    </SelectTrigger>
                    <SelectContent>
                      {arregloCursos && arregloCursos.length > 0 && (
                        <SelectGroup>
                          <SelectLabel>Cursos</SelectLabel>
                          {arregloCursos.map((curso: any, index: number) => (
                            <SelectItem key={index} value={index.toString()}>
                              {curso[0]} | {Number(curso[2])} horas | {curso[5] ? "Abierto" : "Cerrado"}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      )}
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
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nuevo Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Solidity Básico..." {...field} />
                </FormControl>
                <FormDescription>Este es el nombre del Curso.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="Conceptos básicos de solidity..." {...field} />
                </FormControl>
                <FormDescription>Esta es la descripción del Curso.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duracion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva Duración</FormLabel>
                <FormControl>
                  <Input
                    placeholder="16..."
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    {...field}
                    value={field.value ?? ""}
                    onChange={e => {
                      if (e.target.value === "") return field.onChange(undefined);
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormDescription>Esta es la Duración del Curso en Horas.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="certificador"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address del Certificador</FormLabel>
                <FormControl>
                  <Input placeholder="0x123..." {...field} />
                </FormControl>
                <FormDescription>Esta es la dirección ethereum del Certificador del Curso.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tipoCertificado"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Tipo de Certificado</FormLabel>
                <FormDescription>Este es el Modelo que tendrán los Certificados.</FormDescription>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                  className="flex flex-col items-center gap-8 pt-2 sm:flex-row sm:flex-wrap"
                >
                  <FormItem className="w-[250px]">
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value={"1"} className="sr-only" />
                      </FormControl>
                      <Cert1 />
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activo"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Estado del Curso</FormLabel>
                <FormDescription>Este es el Estado del Curso.</FormDescription>
                <FormMessage />
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                    className="flex flex-col items-center gap-8 pt-2 sm:flex-row sm:flex-wrap"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Activo</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="" />
                      </FormControl>
                      <FormLabel className="font-normal">Inactivo</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Modificar Curso</Button>
        </form>
      </Form>
    );
  }
}
