import { useCallback } from "react";
import { bytesToString, isHex, toBytes, toHex } from "viem";
import { CommonInputProps, InputBase } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import { cn } from "~~/lib/utils";

export const BytesInput = ({ value, onChange, name, placeholder, disabled }: CommonInputProps) => {
  const convertStringToBytes = useCallback(() => {
    onChange(isHex(value) ? bytesToString(toBytes(value)) : toHex(toBytes(value)));
  }, [onChange, value]);

  return (
    <InputBase
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      suffix={
        <Button
          variant="ghost"
          size="sm"
          className={cn("px-3 font-semibold text-xl", "hover:bg-transparent hover:text-primary")}
          onClick={convertStringToBytes}
          type="button"
        >
          #
        </Button>
      }
    />
  );
};
