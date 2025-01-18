import { Componente } from "./form";
import { Separator } from "~~/components/ui/separator";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Crear Categoría</h3>
        <p className="text-sm text-muted-foreground">Crea una nueva Categoría.</p>
      </div>
      <Separator />
      <Componente />
    </div>
  );
}
