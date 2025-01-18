import { Separator } from "~~/components/ui/separator"
import { Componente } from "./form"

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Crear Admin</h3>
        <p className="text-sm text-muted-foreground">
          Asigna el rol Admin a una cuenta, para que esta pueda crear categorías y cursos.
        </p>
      </div>
      <Separator />
      <Componente />
    </div>
  )
}
