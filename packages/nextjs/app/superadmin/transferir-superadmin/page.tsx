import { Componente } from "./form";
import { Separator } from "~~/components/ui/separator";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Transferir Super Admin</h3>
        <p className="text-sm text-muted-foreground">Transfiere el rol SUPER_ADMIN a una nueva cuenta.</p>
      </div>
      <Separator />
      <Componente />
    </div>
  );
}
