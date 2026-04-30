import React from "react";
import { Button } from "@heroui/react";
import { useCurrency } from "../context/currency-context";

export const CurrencyToggle: React.FC = () => {
  const { currency, setCurrency } = useCurrency();
  
  return (
    <div className="flex rounded-full overflow-hidden font-semibold">
      <Button
        className={`min-w-[33px] h-[26px] px-2 rounded-none rounded-l-full text-xs font-semibold ${
          currency === "U" 
            ? "bg-[#D09635] text-white opacity-100" 
            : "bg-black text-white opacity-90"
        }`}
        onPress={() => setCurrency("U")}
        disableRipple
      >
        U
      </Button>
      <Button
        className={`min-w-[33px] h-[26px] rounded-none px-2 rounded-r-full text-sm font-semibold ${
          currency === "$" 
            ? "bg-[#D09635] text-black opacity-100" 
            : "bg-black text-white opacity-90"
        }`}
        onPress={() => setCurrency("$")}
        disableRipple
      >
        $
      </Button>
    </div>
  );
};