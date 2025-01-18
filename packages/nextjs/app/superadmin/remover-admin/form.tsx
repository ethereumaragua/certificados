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
  admin: z
    .string()
    .length(42, {
      message: "El address debe tener 42 caracteres.",
    })
})

type FormValores = z.infer<typeof formSchema>

export function Componente() {

  const { writeContractAsync: removerAdmin } = useScaffoldWriteContract("Certificados");

  const transaccion = async (admin: string) => {
    try {
      await removerAdmin(
        {
          functionName: "removerAdmin",
          args: [admin],
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
      admin: "",
    },
    mode: "onSubmit",
  })

  function onSubmit(data: FormValores) {
    console.log(JSON.stringify(data, null, 2))
    transaccion(data.admin);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="admin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Address</FormLabel>
              <FormControl>
                <Input placeholder="0x123..." {...field} />
              </FormControl>
              <FormDescription>
                Esta es la dirección ethereum del Admin.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Remover Admin</Button>
      </form>
    </Form>
  )
}
