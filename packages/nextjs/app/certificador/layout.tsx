import { Metadata } from "next"

import { Separator } from "~~/components/ui/separator"
import { SidebarNav } from "./components/sidebar-nav"
import ReturnButton from "~~/components/common/ReturnButton"

export const metadata: Metadata = {
  title: "Certificador",
  description: "All certifier tasks.",
}

const sidebarNavItems = [
  {
    title: "Mostrar Cursos del Certificador",
    href: "/certificador",
  },
  {
    title: "Certificar por Address",
    href: "/certificador/certificar-address",
  },
  {
    title: "Certificar por ID",
    href: "/certificador/certificar-id",
  },
  {
    title: "Eliminar Certificado por Address",
    href: "/certificador/eliminar-certificado-address",
  },
  {
    title: "Eliminar Certificado por ID",
    href: "/certificador/eliminar-certificado-id",
  }
]

export default function AdminLayout({ children }: {children: React.ReactNode}) {
  return (
    <div className="p-10 pb-16 space-y-6 ">
      <ReturnButton ruta="/"/>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Página de Certificador</h2>
        <p className="text-muted-foreground">
          Maneja tareas de Certificador: Certifica usuarios en Cursos.
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
  )
}
