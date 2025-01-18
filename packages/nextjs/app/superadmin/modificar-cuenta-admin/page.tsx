import { Separator } from "~~/components/ui/separator"
import { Componente } from "./form"

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Modificar Cuenta Admin</h3>
        <p className="text-sm text-muted-foreground">
          Modifica el address de una cuenta con el rol Admin.
        </p>
      </div>
      <Separator />
      <Componente />
    </div>
  )
}
