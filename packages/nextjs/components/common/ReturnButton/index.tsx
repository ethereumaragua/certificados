"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "~~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~~/components/ui/tooltip";

const ReturnButton = ({ ruta }: { ruta: string }) => {
  return (
    <Link
      href={ruta}
    >
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button size="icon" className="rounded-full">
              <FaArrowLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Volver</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
};

export default ReturnButton;
