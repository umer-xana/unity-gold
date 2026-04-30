import React from "react";
import { useCountUp } from "../hooks/use-count-up";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1000,
  decimals = 2,
  prefix = "",
  suffix = "",
  className = ""
}) => {
  const formattedValue = useCountUp({
    end: value,
    duration,
    decimals,
    prefix,
    suffix
  });
  
  return <span className={className}>{formattedValue}</span>;
};