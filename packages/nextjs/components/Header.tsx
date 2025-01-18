"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import {
  // FaucetButton,
  RainbowKitCustomConnectButton,
} from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "~~/components/ui/dropdown-menu";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { cn } from "~~/lib/utils";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  target?: boolean;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Ethereum Aragua",
    href: "https://aragua.org",
    target: true,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon, target }) => {
        const isActive = pathname === href;
        return (
          <li key={href} className="list-none">
            <Link
              href={href}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors",
                "hover:bg-secondary/80 hover:text-secondary-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive && "bg-secondary text-secondary-foreground shadow-sm",
              )}
              target={target ? "_blank" : ""}
              rel={target ? "noopener noreferrer" : ""}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <header className="fixed top-0 z-20 flex items-center justify-between w-full h-16 px-4 py-2 border-b lg:fixed bg-background">
      <div className="flex items-center w-auto gap-4 lg:w-1/2">
        <div className="lg:hidden" ref={burgerMenuRef}>
          <DropdownMenu open={isDrawerOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn("px-2", isDrawerOpen && "bg-secondary")}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              >
                <Bars3Icon className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="mt-2 w-52">
              <nav className="grid gap-1 p-2" onClick={() => setIsDrawerOpen(false)}>
                <HeaderMenuLinks />
              </nav>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link href="/" className="items-center hidden gap-2 lg:flex shrink-0">
          <div className="relative flex w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/etharagua.png" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">ETH Aragua</span>
            <span className="text-xs">Certificados</span>
          </div>
        </Link>
        <nav className="items-center hidden gap-2 lg:flex">
          <HeaderMenuLinks />
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <RainbowKitCustomConnectButton />
        {/* <FaucetButton /> */}
      </div>
    </header>
  );
};
