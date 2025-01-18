import { useRef, useState } from "react";
import { NetworkOptions } from "./NetworkOptions";
import CopyToClipboard from "react-copy-to-clipboard";
import { getAddress } from "viem";
import { Address } from "viem";
import { useDisconnect } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { BlockieAvatar, isENS } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~~/components/ui/dropdown-menu";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const allowedNetworks = getTargetNetworks();

type AddressInfoDropdownProps = {
  address: Address;
  blockExplorerAddressLink: string | undefined;
  displayName: string;
  ensAvatar?: string;
};

export const AddressInfoDropdown = ({
  address,
  ensAvatar,
  displayName,
  blockExplorerAddressLink,
}: AddressInfoDropdownProps) => {
  const { disconnect } = useDisconnect();
  const checkSumAddress = getAddress(address);
  const [addressCopied, setAddressCopied] = useState(false);
  const [selectingNetwork, setSelectingNetwork] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setSelectingNetwork(false));

  return (
    <div ref={dropdownRef}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm" className="h-auto gap-0 pl-0 pr-2 shadow-md">
            <BlockieAvatar address={checkSumAddress} size={30} ensImage={ensAvatar} />
            <span className="ml-2 mr-1">
              {isENS(displayName) ? displayName : checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4)}
            </span>
            <ChevronDownIcon className="w-4 h-6 ml-2 sm:ml-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 p-2 mt-2 shadow-lg bg-background rounded-xl">
          <NetworkOptions hidden={!selectingNetwork} />
          {!selectingNetwork && (
            <>
              <DropdownMenuItem className="p-0">
                {addressCopied ? (
                  <div className="flex items-center gap-3 p-3 cursor-default">
                    <CheckCircleIcon className="w-4 h-6 ml-2 sm:ml-0" />
                    <span className="whitespace-nowrap">Copiar address</span>
                  </div>
                ) : (
                  <CopyToClipboard
                    text={checkSumAddress}
                    onCopy={() => {
                      setAddressCopied(true);
                      setTimeout(() => {
                        setAddressCopied(false);
                      }, 800);
                    }}
                  >
                    <div className="flex items-center gap-3 p-3">
                      <DocumentDuplicateIcon className="w-4 h-6 ml-2 sm:ml-0" />
                      <span className="whitespace-nowrap">Copiar address</span>
                    </div>
                  </CopyToClipboard>
                )}
              </DropdownMenuItem>

              <DropdownMenuItem className="p-0">
                <label htmlFor="qrcode-modal" className="flex items-center w-full gap-3 p-3">
                  <QrCodeIcon className="w-4 h-6 ml-2 sm:ml-0" />
                  <span className="whitespace-nowrap">Ver código QR</span>
                </label>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-0">
                <a
                  target="_blank"
                  href={blockExplorerAddressLink}
                  rel="noopener noreferrer"
                  className="flex items-center w-full gap-3 p-3"
                >
                  <ArrowTopRightOnSquareIcon className="w-4 h-6 ml-2 sm:ml-0" />
                  <span className="whitespace-nowrap">Ver en el explorador</span>
                </a>
              </DropdownMenuItem>

              {allowedNetworks.length > 1 && (
                <DropdownMenuItem className="p-0" onClick={() => setSelectingNetwork(true)}>
                  <div className="flex items-center gap-3 p-3">
                    <ArrowsRightLeftIcon className="w-4 h-6 ml-2 sm:ml-0" />
                    <span>Cambiar Red</span>
                  </div>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem className="p-0" onClick={() => disconnect()}>
                <div className="flex items-center gap-3 p-3 text-destructive">
                  <ArrowLeftOnRectangleIcon className="w-4 h-6 ml-2 sm:ml-0" />
                  <span>Desconectar</span>
                </div>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
