import { Componente } from "./form";
import { Separator } from "~~/components/ui/separator";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Modificar Nombre Admin</h3>
        <p className="text-sm text-muted-foreground">Modifica el nombre de una cuenta con el rol Admin.</p>
      </div>
      <Separator />
      <Componente />
    </div>
  );
}
