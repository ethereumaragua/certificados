"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~~/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~~/components/ui/form";
import { Input } from "~~/components/ui/input";
import { Label } from "~~/components/ui/label";
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
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const formSchema = z.object({
  categoria: z.string({
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
  estado: z.string(),
});

type FormValores = z.infer<typeof formSchema>;

export function Componente() {
  const [mounted, setMounted] = useState(false);
  const [arregloCategorias, setArregloCategorias] = useState<any>();

  const { data: mostrarArregloDeCategorias }: { data: any } = useScaffoldReadContract({
    contractName: "Certificados",
    functionName: "mostrarArregloDeCategorias",
  });

  useEffect(() => {
    if (!mostrarArregloDeCategorias) return;
    setMounted(true);
    setArregloCategorias(mostrarArregloDeCategorias);
    console.log(mostrarArregloDeCategorias);
    // setNombres(mostrarAdmins[1]);
  }, [mostrarArregloDeCategorias]);

  const { writeContractAsync: modificarCategoria } = useScaffoldWriteContract("Certificados");

  const transaccion = async (categoria: number, nombre: string, estado: boolean) => {
    try {
      await modificarCategoria(
        {
          functionName: "modificarCategoria",
          args: [BigInt(categoria), nombre, estado],
        },
        {
          blockConfirmations: 1,
          onBlockConfirmation: async (txnReceipt: any) => {
            console.log(txnReceipt);
            // form.reset();
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
      estado: "true",
    },
    mode: "onSubmit",
  });

  function onSubmit(data: FormValores) {
    console.log(JSON.stringify(data, null, 2));
    transaccion(Number(data.categoria), data.nombre, data.estado === "true" ? true : false);
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
                <FormDescription>Esta es la Categoría a modificar.</FormDescription>
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
                  <Input placeholder="Mecánica..." {...field} />
                </FormControl>
                <FormDescription>Este es el nombre nuevo de la categoria.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value.toString()}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"true"} id="r1" />
                      <Label htmlFor="r1">Activo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"false"} id="r2" />
                      <Label htmlFor="r2">Inactivo</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormDescription>Este es el nuevo estado de la categoria.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Modificar Categoría</Button>
        </form>
      </Form>
    );
  }
}
