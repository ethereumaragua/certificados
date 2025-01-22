import { SidebarNav } from "./components/sidebar-nav";
import { Metadata } from "next";
import ReturnButton from "~~/components/common/ReturnButton";
import { Separator } from "~~/components/ui/separator";

export const metadata: Metadata = {
  title: "Super Admin",
  description: "All superadmin tasks.",
};

const sidebarNavItems = [
  {
    title: "Mostrar Admins",
    href: "/superadmin",
  },
  {
    title: "Crear Admin",
    href: "/superadmin/crear-admin",
  },
  {
    title: "Remover Admin",
    href: "/superadmin/remover-admin",
  },
  {
    title: "Modificar Nombre Admin",
    href: "/superadmin/modificar-nombre-admin",
  },
  {
    title: "Modificar Cuenta Admin",
    href: "/superadmin/modificar-cuenta-admin",
  },
  {
    title: "Transferir Super Admin",
    href: "/superadmin/transferir-superadmin",
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-10 pb-16 space-y-6 ">
      <ReturnButton ruta="/" />
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Página de Super Admin</h2>
        <p className="text-muted-foreground">
          Maneja tareas de Super Administrador: crea Administradores que tengan la capacidad de crear categorías y
          cursos, gestiona los roles y verifica los eventos.
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
