"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
import { Input } from "~~/components/ui/input"
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const formSchema = z.object({
  nombre: z
    .string()
    .min(2, {
      message: "Nombre debe tener al menos 2 caracteres.",
    })
    .max(64, {
      message: "Nombre no debe tener más de 64 caracteres.",
    }),
})

type FormValores = z.infer<typeof formSchema>

export function Componente() {

  const { writeContractAsync: crearCategoria } = useScaffoldWriteContract("Certificados");

  const transaccion = async (nombre: string) => {
    try {
      await crearCategoria(
        {
          functionName: "crearCategoria",
          args: [nombre],
        },
        {
          blockConfirmations: 1,
          onBlockConfirmation: async (txnReceipt: any) => {
            console.log(txnReceipt);
            // setShowConfirmation(true);
            form.reset();
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
      nombre: "",
    },
    mode: "onSubmit",
  })

  function onSubmit(data: FormValores) {
    console.log(JSON.stringify(data, null, 2))
    transaccion(data.nombre);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la Categoría</FormLabel>
              <FormControl>
                <Input placeholder="Informática..." {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre de la Categoría.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Crear Categoría</Button>
      </form>
    </Form>
  )
}
