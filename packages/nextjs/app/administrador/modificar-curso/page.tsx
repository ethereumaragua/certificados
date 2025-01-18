import { Separator } from "~~/components/ui/separator"
import { Componente } from "./form"

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Modificar Curso</h3>
        <p className="text-sm text-muted-foreground">
          Modifica los detalles de un Curso.
        </p>
      </div>
      <Separator />
      <Componente />
    </div>
  )
}
