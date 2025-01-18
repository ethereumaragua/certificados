// import { Separator } from "~~/components/ui/separator"
import { Componente } from "./mostrar-cursos-form";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Mostrar Cursos del Certificador</h3>
        <p className="text-sm text-muted-foreground">Muestra los Cursos asignados al Certificador.</p>
      </div>
      {/* <Separator /> */}
      <Componente />
    </div>
  );
}
