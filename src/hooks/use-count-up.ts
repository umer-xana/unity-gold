import React from "react";

interface UseCountUpProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export const useCountUp = ({
  end,
  start = 0,
  duration = 1000,
  decimals = 2,
  prefix = "",
  suffix = ""
}: UseCountUpProps) => {
  const [value, setValue] = React.useState(start);
  const countRef = React.useRef<number>(start);
  const frameRef = React.useRef<number>(0);
  
  React.useEffect(() => {
    const startTime = Date.now();
    const endValue = end;
    const startValue = start;
    
    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      if (progress < 1) {
        const currentValue = startValue + (endValue - startValue) * progress;
        countRef.current = currentValue;
        setValue(currentValue);
        frameRef.current = requestAnimationFrame(updateCount);
      } else {
        countRef.current = endValue;
        setValue(endValue);
      }
    };
    
    frameRef.current = requestAnimationFrame(updateCount);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, start, duration]);
  
  const formattedValue = React.useMemo(() => {
    const options = {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    };
    
    return `${prefix}${value.toLocaleString(undefined, options)}${suffix}`;
  }, [value, decimals, prefix, suffix]);
  
  return formattedValue;
};
