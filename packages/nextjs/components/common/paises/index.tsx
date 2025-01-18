"use client";

import * as React from "react";
import paises from "./paises";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "~~/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~~/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "~~/components/ui/popover";
import { cn } from "~~/lib/utils";

interface Props {
  valor: string;
  setValor: (newValue: string) => void;
}

export default function Paises(props: Props) {
  const [open, setOpen] = React.useState(false);
  const { valor, setValor } = props;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between w-full">
          {valor ? paises.find(paises => paises.value === valor)?.label : "Selecciona el País..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar país..." />
          <CommandList>
            <CommandEmpty>País no encontrado.</CommandEmpty>
            <CommandGroup>
              {paises.map(pais => (
                <CommandItem
                  key={pais.value}
                  value={pais.label}
                  onSelect={(currentValue: string) => {
                    const selectedCountry = paises.find(country => country.label === currentValue);
                    if (selectedCountry) {
                      setValor(selectedCountry.value === valor ? "" : selectedCountry.value);
                      setOpen(false);
                    }
                  }}
                >
                  {pais.label}
                  <Check className={cn("ml-auto", valor === pais.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
