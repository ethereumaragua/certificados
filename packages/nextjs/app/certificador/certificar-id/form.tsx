"use client";

import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { z } from "zod";
import Paises from "~~/components/common/paises";
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
  nombreCertificador: z.string().min(2, {
    message: "Nombre del Certificador debe tener al menos 2 caracteres.",
  }),
  usuarios: z.array(
    z.object({
      pais: z.string().min(1, {
        message: "Selecciona un País.",
      }),
      id: z.string().min(1, {
        message: "ID debe tener al menos 1 caracter.",
      }),
      nombre: z.string().min(2, {
        message: "Nombre debe tener al menos 2 caracteres.",
      }),
    }),
  ),
});

type FormValores = z.infer<typeof formSchema>;

export function Componente() {
  const [mounted, setMounted] = useState(false);
  const [arregloCategorias, setArregloCategorias] = useState<any>();
  const [arregloCursos, setArregloCursos] = useState<any>();
  const [catSeleccionada, setCatSeleccionada] = useState<any>();

  // const [valor, setValor] = useState("sveltekit")

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
    if (!catSeleccionada || !mostrarArregloCursosPorCategoria) return;
    dataCursos(catSeleccionada, mostrarArregloCursosPorCategoria[catSeleccionada]);
  }, [catSeleccionada]);

  const { writeContractAsync: certificarId } = useScaffoldWriteContract("Certificados");

  const transaccion = async (
    usuarioPais: any,
    usuarioId: any,
    usuarioNombre: any,
    categoria: number,
    curso: number,
    nombreCertificador: string,
  ) => {
    try {
      await certificarId(
        {
          functionName: "certificarId",
          args: [usuarioPais, usuarioId, usuarioNombre, BigInt(categoria), BigInt(curso), nombreCertificador],
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
      nombreCertificador: "",
      usuarios: [{ pais: "189", id: "", nombre: "" }],
    },
    mode: "onSubmit",
  });

  function onSubmit(data: FormValores) {
    console.log(JSON.stringify(data, null, 2));
    if (data.usuarios.length === 0) return;
    const paises = data.usuarios.map(obj => obj.pais);
    const ids = data.usuarios.map(obj => obj.id);
    const nombres = data.usuarios.map(obj => obj.nombre);

    transaccion(paises, ids, nombres, Number(data.categoria), Number(data.curso), data.nombreCertificador);
  }

  const { fields, append, remove } = useFieldArray<any>({
    control: form.control,
    name: "usuarios",
    rules: {
      minLength: 1,
    },
  });

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
            name="nombreCertificador"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Certificador</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre..." {...field} />
                </FormControl>
                <FormDescription>Este es el nombre del Certificador del Curso.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Usuarios</FormLabel>
            <FormDescription>Datos de los usuarios a certificar.</FormDescription>
            {fields.map((item, index) => {
              return (
                <div className="flex flex-row w-full gap-4" key={item.id}>
                  {/* <FormItem className="w-1/3">
                      <FormLabel>País</FormLabel>
                      <FormControl>
                        <Controller
                          render={({ field }) => (<Paises valor={field.value} setValor={field.onChange} />)}
                          name={`usuarios.${index}.pais`}
                          control={form.control}
                        />
                      </FormControl>
                    </FormItem> */}

                  <FormField
                    control={form.control}
                    name={`usuarios.${index}.pais`}
                    render={({ field }) => (
                      <FormItem className="w-1/3">
                        <FormLabel>País</FormLabel>
                        <FormControl>
                          <Paises valor={field.value} setValor={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* <FormItem className="w-1/3">
                      <FormLabel>ID</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register(`usuarios.${index}.id`, { required: true })}
                        />
                      </FormControl>
                    </FormItem> */}

                  <FormField
                    control={form.control}
                    name={`usuarios.${index}.id`}
                    render={({ field }) => (
                      <FormItem className="w-1/3">
                        <FormLabel>ID</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* <FormItem className="w-1/3">
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Controller
                          render={({ field }) => <Input {...field} />}
                          name={`usuarios.${index}.nombre`}
                          control={form.control}
                        />
                      </FormControl>
                    </FormItem> */}

                  <FormField
                    control={form.control}
                    name={`usuarios.${index}.nombre`}
                    render={({ field }) => (
                      <FormItem className="w-1/3">
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <button className="self-end pb-[8px]" type="button" onClick={() => remove(index)}>
                    <IoIosCloseCircleOutline className="justify-center w-6 h-6" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              className="p-2 border rounded-md"
              onClick={() => {
                append({ pais: "189", id: "", nombre: "" });
              }}
            >
              <FaUserPlus className="w-6 h-6" />
            </button>
          </div>

          <Button type="submit">Certificar Usuarios</Button>
        </form>
      </Form>
    );
  }
}
