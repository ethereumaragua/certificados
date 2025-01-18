import { Separator } from "~~/components/ui/separator"
import { Componente } from "./form"

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Eliminar Certificado por Address</h3>
        <p className="text-sm text-muted-foreground">
          Elimina el Certificado de un Usuario en un Curso usando su Address.
        </p>
      </div>
      <Separator />
      <Componente />
    </div>
  )
}
