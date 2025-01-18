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
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { RadioGroup, RadioGroupItem } from "~~/components/ui/radio-group"
import Cert1 from "./tipoCertificados/cert1"

const formSchema = z.object({
  categoria: z
    .string({
      required_error: "Por favor seleccione una categoría.",
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
      message: "Descripcion debe tener al menos 2 caracteres.",
    })
    .max(256, {
      message: "Descripcion no debe tener más de 256 characters.",
    }),
  duracion: z.coerce.number().min(1, {
    message: "Duración debe ser mayor a 0.",
  }).max(999, {
    message: "Duración no puede ser mayor a 999.",
  }),

  tipoCertificado: z.coerce.number().min(1, {
    message: "Debes seleccionar uno de los certificados disponibles.",
  }),
  certificador: z
    .string()
    .length(42, {
      message: "El address debe tener 42 caracteres.",
  }),
  activo: z.coerce.boolean()
})

type FormValores = z.infer<typeof formSchema>

export function Componente() {

  const [mounted, setMounted] = useState(false);
  const [arregloCategorias, setArregloCategorias] = useState<any>();
  
  const { data: mostrarArregloDeCategorias }: { data: any } = useScaffoldReadContract({
    contractName: "Certificados",
    functionName: "mostrarArregloDeCategorias",
  });

  useEffect(() => {
    if(!mostrarArregloDeCategorias) return
    setMounted(true);
    setArregloCategorias(mostrarArregloDeCategorias);
    console.log(mostrarArregloDeCategorias);
    // setNombres(mostrarAdmins[1]);
  }, [mostrarArregloDeCategorias]);

  const { writeContractAsync: agregarCurso } = useScaffoldWriteContract("Certificados");

  const transaccion = async (categoria: number, nombre: string, descripcion: string, duracion: number, tipoCertificado: number, certificador: string, activo: boolean) => {
    try {
      await agregarCurso(
        {
          functionName: "agregarCurso",
          args: [BigInt(categoria), nombre, descripcion, BigInt(duracion), tipoCertificado, certificador, activo],
        },
        {
          blockConfirmations: 1,
          onBlockConfirmation: async (txnReceipt: any) => {
            console.log(txnReceipt);
            // setShowConfirmation(true);
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
      nombre: "",
      descripcion: "",
      duracion: undefined,
      certificador: "",
      tipoCertificado: 1,
      activo: true
    },
    mode: "onSubmit",
  })

  function onSubmit(data: FormValores) {
    console.log(JSON.stringify(data, null, 2))
    transaccion(Number(data.categoria), data.nombre, data.descripcion, data.duracion, Number(data.tipoCertificado), data.certificador, data.activo);
  }

  if (mounted && arregloCategorias) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem>
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
                  {/* <Input placeholder="1..." type='number'
                    inputMode='numeric'
                    autoComplete='off'
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      if (e.target.value === '') return field.onChange(undefined);
                      field.onChange(Number(e.target.value));
                    }}
                  /> */}
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
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Solidity Básico..." {...field} />
                </FormControl>
                <FormDescription>
                  Este es el nombre del Curso.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="Conceptos básicos de solidity..." {...field} />
                </FormControl>
                <FormDescription>
                  Esta es la Descripción del Curso.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duracion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duración</FormLabel>
                <FormControl>
                  <Input placeholder="16..." type='text'
                    inputMode='numeric'
                    autoComplete='off'
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      if (e.target.value === '') return field.onChange(undefined);
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Esta es la Duración del Curso en Horas.
                </FormDescription>
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
                <FormDescription>
                  Esta es la dirección ethereum del Certificador del Curso.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* <FormField
            control={form.control}
            name="tipoCertificado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Certificado</FormLabel>
                <FormControl>
                  <Input placeholder="1..." type='number'
                    inputMode='numeric'
                    autoComplete='off'
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      if (e.target.value === '') return field.onChange(undefined);
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Este es el Tipo de Certificado.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="tipoCertificado"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Tipo de Certificado</FormLabel>
                <FormDescription>
                  Este es el Modelo que tendrán los Certificados.
                </FormDescription>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={(field.value).toString()}
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
                  {/* <FormItem className="w-[250px]">
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value={"2"} className="sr-only" />
                      </FormControl>
                      <Cert2 />
                    </FormLabel>
                  </FormItem> */}
                </RadioGroup>
              </FormItem>
            )}
          />
          {/* <Cert3
            nombre="John Doe"
            curso="Solidity Básico"
            institucion="ETH Aragua"
            duracion="16"
          /> */}


          <FormField
            control={form.control}
            name="activo"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Estado del Curso</FormLabel>
                <FormDescription>
                  Este es el Estado del Curso.
                </FormDescription>
                <FormMessage />
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={(field.value).toString()}
                    className="flex flex-col items-center gap-8 pt-2 sm:flex-row sm:flex-wrap"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Activo
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Inactivo
                      </FormLabel>
                    </FormItem>
                    {/* <FormItem className="w-[250px]">
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem value={"2"} className="sr-only" />
                        </FormControl>
                        <Cert2 />
                      </FormLabel>
                    </FormItem> */}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />


          <Button type="submit">Agregar Curso</Button>
        </form>
      </Form>
    )
  }
}
