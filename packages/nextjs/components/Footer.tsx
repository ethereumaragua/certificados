import React from "react";
// import Link from "next/link";
import { hardhat } from "viem/chains";
// import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
// import { Faucet } from "~~/components/scaffold-eth";
// import { Button } from "~~/components/ui/button";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { cn } from "~~/lib/utils";

// import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  // const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <div className="min-h-0 px-1 py-5 mb-11 lg:mb-0">
      <div>
        <div className="fixed bottom-0 left-0 z-10 flex items-center justify-end w-full p-4 pointer-events-none">
          {/* <div className="flex flex-col gap-2 pointer-events-auto md:flex-row">
            {nativeCurrencyPrice > 0 && (
              <div>
                <Button variant="default" size="sm" className="font-normal cursor-auto">
                  <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                  <span>{nativeCurrencyPrice.toFixed(2)}</span>
                </Button>
              </div>
            )}
            {isLocalNetwork && (
              <>
                <Faucet />
                <Button variant="default" size="sm" className="font-normal" asChild>
                  <Link href="/blockexplorer">
                    <MagnifyingGlassIcon className="w-4 h-4 mr-1" />
                    <span>Block Explorer</span>
                  </Link>
                </Button>
              </>
            )}
          </div> */}
          <SwitchTheme className={cn("pointer-events-auto", isLocalNetwork && "self-end md:self-auto")} />
        </div>
      </div>
      <div className="w-full">
        <nav className="w-full">
          <div className="flex items-center justify-center w-full gap-2 text-sm">
            <div className="text-center">
              <a
                href="https://t.me/ETHAragua"
                target="_blank"
                rel="noreferrer"
                className="underline text-primary hover:text-primary/80 underline-offset-4"
              >
                ETHAragua | {new Date().getFullYear()} &copy;
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
