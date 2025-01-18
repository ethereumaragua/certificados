"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~~/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~~/components/ui/select"
import { Input } from "~~/components/ui/input"
import { useScaffoldContract, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import Paises from "~~/components/common/paises";


const formSchema = z.object({
  categoria: z
    .string({
      required_error: "Por favor seleccione una categoría.",
    }),
  curso: z
    .string({
      required_error: "Por favor seleccione un curso.",
    }),
  pais: z
    .string().min(1, {
      message: "Selecciona un País.",
    }),
  id: z
    .string().min(1, {
      message: "ID debe tener al menos 1 caracter.",
    }),
})

type FormValores = z.infer<typeof formSchema>

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

  const dataCursos = async(categoria:number, cantidadCursos:number) => {
    let arr:any = [];
      for(let j = 0; j < cantidadCursos; j++) {
        try{
          let a = await certificadosContract?.read.mapCurso([BigInt(categoria), BigInt(j)]);
          if(a) arr.push(a);
        } catch (error) {
          console.log(error);
        }
    }
    console.log(arr);
    setArregloCursos(arr);
  }

  useEffect(() => {
    if(!mostrarArregloDeCategorias) return
    setMounted(true);
    setArregloCategorias(mostrarArregloDeCategorias);
    console.log(mostrarArregloDeCategorias);
  }, [mostrarArregloDeCategorias]);

  useEffect(() => {
    if(!catSeleccionada) return
    dataCursos(catSeleccionada, mostrarArregloCursosPorCategoria[catSeleccionada]);
  }, [catSeleccionada]);

  const { writeContractAsync: eliminarCertificadoId } = useScaffoldWriteContract("Certificados");

  const transaccion = async (usuarioPais: string, usuarioId: string, categoria: number, curso: number) => {
    try {
      await eliminarCertificadoId(
        {
          functionName: "eliminarCertificadoId",
          args: [Number(usuarioPais), BigInt(usuarioId), BigInt(categoria), BigInt(curso)],
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
      pais: "189",
      id: "",
    },
    mode: "onSubmit",
  })

  function onSubmit(data: FormValores) {
    console.log(JSON.stringify(data, null, 2))

    transaccion(data.pais, data.id, Number(data.categoria), Number(data.curso));
  }

  if (mounted && arregloCategorias) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem onChange={(e:any) => {
                  setCatSeleccionada(e.target.value);
                }}>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{arregloCategorias && arregloCategorias.length > 0 ? "Categorías" : "Sin Categorías"}</SelectLabel>
                        {arregloCategorias.map((categoria: any, index: number) => (
                          <SelectItem key={index} value={index.toString()}>
                            {categoria.nombre}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Esta es la Categoría del Curso.
                </FormDescription>
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
                        {arregloCursos && arregloCursos.length > 0 &&
                          arregloCursos.map((curso: any, index: number) => (
                            <SelectItem key={index} value={index.toString()}>
                              {curso[0]} | {Number(curso[2])} horas | {curso[5] ? "Abierto" : "Cerrado"}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Este es el Curso.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row w-full gap-4">
            {/* <FormItem className="w-1/2">
              <FormLabel>País</FormLabel>
              <FormControl>
                <Controller
                  render={({ field }) => (<Paises valor={field.value} setValor={field.onChange} />)}
                  name="pais"
                  control={form.control}
                />
              </FormControl>
              <FormDescription>
                Este es el País del Usuario.
              </FormDescription>
            </FormItem> */}

            <FormField
              control={form.control}
              name="pais"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>País del Usuario</FormLabel>
                  <FormControl>
                    <Paises valor={field.value} setValor={field.onChange} />
                    </FormControl>
                  <FormDescription>
                    País de origen del Usuario.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>ID del Usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="123..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Identificador del Usuario.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Eliminar Certificado del Usuario</Button>
        </form>
      </Form>
    )
  }
}
