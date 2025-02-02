import { Componente } from "./mostrar-admins-form";
import { Separator } from "~~/components/ui/separator";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Admins</h3>
        <p className="text-sm text-muted-foreground">Muestra las cuentas con el rol SUPER_ADMIN y ADMIN.</p>
      </div>
      <Separator />
      <Componente />
    </div>
  );
}
