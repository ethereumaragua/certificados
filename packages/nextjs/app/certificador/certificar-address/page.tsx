import { Componente } from "./form";
import { Separator } from "~~/components/ui/separator";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Certificar por Address</h3>
        <p className="text-sm text-muted-foreground">Certifica un Usuario en un Curso usando su address.</p>
      </div>
      <Separator />
      <Componente />
    </div>
  );
}
