import React from "react";
import { Icon } from "@iconify/react";
import { AnimatedNumber } from "./animated-number";

interface PriceIndicatorProps {
  percentage: string;
  price: string;
  unit: string;
}

export const PriceIndicator: React.FC<PriceIndicatorProps> = ({ percentage, price, unit }) => {
  // Extract numeric value from price string for animation
  const priceValue = parseFloat(price.replace(/[^0-9.]/g, ''));
  const percentValue = parseFloat(percentage.replace(/[^0-9.]/g, ''));
  
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Icon icon="lucide:arrow-up" className="text-[#24DC3B] mr-1" />
        <span className="text-[13px] text-[#24DC3B] font-semibold text-lg">
          <AnimatedNumber value={percentValue} decimals={2} suffix="%" />
        </span>
      </div>
      <div className="text-right">
        <span className="text-[#FFD185] font-bold text-[17px] leading-[21px] mr-1">
          <AnimatedNumber 
            value={priceValue} 
            decimals={0} 
            prefix={price.startsWith('$') ? '$' : ''} 
          />
        </span>
        <span className="text-[#C9C9C9] font-semibold text-[13px] leading-[21px]">{unit}</span>
      </div>
    </div>
  );
};