"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReturnButton from "~~/components/common/ReturnButton";
import Paises from "~~/components/common/paises";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~~/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~~/components/ui/form";
import { Input } from "~~/components/ui/input";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";

const formSchema = z.object({
  address: z.string().length(42, {
    message: "El address debe tener 42 caracteres.",
  }),
});

type FormValores = z.infer<typeof formSchema>;

export default function CardWithForm() {
  const form = useForm<FormValores>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
    mode: "onSubmit",
  });

  const [loading, setLoading] = useState(false);

  function onSubmit(data: FormValores) {
    setLoading(true);
    console.log(JSON.stringify(data, null, 2));
    // transaccion(data.pais, data.id, Number(data.categoria), Number(data.curso));
    estaCertificadoAddress(data.address);
  }

  function handleClick(e: any) {
    e.preventDefault();
    form.reset();
  }

  const { data: certificadosContract } = useScaffoldContract({
    contractName: "Certificados",
  });

  const router = useRouter();

  const estaCertificadoAddress = async (address: string) => {
    try {
      const a = await certificadosContract?.read.datosYCertificadosUsuarioAddress([address]);
      if (a && a[0].length > 0) {
        router.push(`/usuario/address/${address}`);
      } else {
        alert("Este usuario no posee certificados");
        setLoading(false);
      }
      console.log(a);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pt-10 pl-10">
        <ReturnButton ruta="/usuario" />
      </div>
      <div className="flex justify-center mt-8 sm:mt-4">
        <Card className="w-full mx-10 sm:w-[400px]">
          <CardHeader>
            <CardTitle>Ver por Address</CardTitle>
            <CardDescription>Busca las certificaciones de un usuario usando su address.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col w-full gap-4 sm:flex-row">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Address del Usuario</FormLabel>
                        <FormControl>
                          <Input placeholder="0x123..." {...field} />
                        </FormControl>
                        <FormDescription>Wallet del Usuario.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={e => handleClick(e)}>
                    Reset
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Buscando..." : "Buscar"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
