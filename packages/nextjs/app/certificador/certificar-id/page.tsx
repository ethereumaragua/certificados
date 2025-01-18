import { Separator } from "~~/components/ui/separator"
import { Componente } from "./form"

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Certificar por Id</h3>
        <p className="text-sm text-muted-foreground">
          Certifica un Usuario en un Curso usando la identificación nacional de su país.
        </p>
      </div>
      <Separator />
      <Componente />
    </div>
  )
}
