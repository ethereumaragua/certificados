import { Componente } from "./form";
import { Separator } from "~~/components/ui/separator";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Remover Admin</h3>
        <p className="text-sm text-muted-foreground">Elimina el rol Admin de una cuenta.</p>
      </div>
      <Separator />
      <Componente />
    </div>
  );
}
