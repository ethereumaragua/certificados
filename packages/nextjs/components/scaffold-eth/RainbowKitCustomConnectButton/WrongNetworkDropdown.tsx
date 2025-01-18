import { NetworkOptions } from "./NetworkOptions";
import { useDisconnect } from "wagmi";
import { ArrowLeftOnRectangleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "~~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~~/components/ui/dropdown-menu";

export const WrongNetworkDropdown = () => {
  const { disconnect } = useDisconnect();

  return (
    <div className="mr-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="destructive" size="sm" className="gap-1">
            <span>Red incorrecta</span>
            <ChevronDownIcon className="w-4 h-6 ml-2 sm:ml-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 p-2 mt-1 shadow-lg bg-background rounded-xl">
          <NetworkOptions />
          <DropdownMenuItem className="p-0" onClick={() => disconnect()}>
            <div className="flex items-center w-full gap-3 p-3 text-destructive">
              <ArrowLeftOnRectangleIcon className="w-4 h-6 ml-2 sm:ml-0" />
              <span>Desconectar</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
