import { SidebarNav } from "./components/sidebar-nav";
import { Metadata } from "next";
import ReturnButton from "~~/components/common/ReturnButton";
import { Separator } from "~~/components/ui/separator";

export const metadata: Metadata = {
  title: "Administrador",
  description: "All admin tasks.",
};

const sidebarNavItems = [
  {
    title: "Mostrar Categorías y Cursos",
    href: "/administrador",
  },
  {
    title: "Crear Categoría",
    href: "/administrador/crear-categoria",
  },
  {
    title: "Modificar Categoría",
    href: "/administrador/modificar-categoria",
  },
  {
    title: "Agregar Curso",
    href: "/administrador/agregar-curso",
  },
  {
    title: "Modificar Curso",
    href: "/administrador/modificar-curso",
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-10 pb-16 space-y-6 ">
      <ReturnButton ruta="/" />
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Página de Administrador</h2>
        <p className="text-muted-foreground">
          Maneja tareas de Administrador: gestiona categorías, cursos y selecciona los certificadores para cada uno de
          los cursos creados.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
