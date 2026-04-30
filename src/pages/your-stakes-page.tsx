import React from "react";
import { Icon } from "@iconify/react";
import { Button, Switch } from "@heroui/react";
import { CurrencyToggle } from "../components/currency-toggle";
import { AnimationWrapper } from "../components/animation-wrapper";
import { useCurrency } from "../context/currency-context";

interface YourStakesPageProps {
  onBack: () => void;
}

interface StakeItem {
  id: string;
  level: string;
  amount: number;
  percentage: number;
  daysRemaining: number;
  dollarValue: number;
  autoRestake: boolean;
  icon: string;
}

export const YourStakesPage: React.FC<YourStakesPageProps> = ({ onBack }) => {
  const { currency } = useCurrency();
  const [stakes, setStakes] = React.useState<StakeItem[]>([
  {
    id: "1",
    level: "M",
    amount: 132.843,
    percentage: 35,
    daysRemaining: 24,
    dollarValue: 12000,
    autoRestake: false,
    icon: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/ugold-coin.svg"
  },
  {
    id: "2",
    level: "M",
    amount: 132.843,
    percentage: 35,
    daysRemaining: 365,
    dollarValue: 12000,
    autoRestake: true,
    icon: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/ugold-coin.svg"
  },
  {
    id: "3",
    level: "M",
    amount: 132.843,
    percentage: 35,
    daysRemaining: 24,
    dollarValue: 12000,
    autoRestake: true,
    icon: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/ugold-coin.svg"
  },
  {
    id: "4",
    level: "M",
    amount: 132.843,
    percentage: 35,
    daysRemaining: 24,
    dollarValue: 12000,
    autoRestake: false,
    icon: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/ugold-coin.svg"
  }
]);

  const handleToggleAutoRestake = (id: string) => {
    setStakes(prevStakes =>
      prevStakes.map(stake =>
        stake.id === id ? { ...stake, autoRestake: !stake.autoRestake } : stake
      )
    );
  };

  return (
    <div className="dark min-h-[100dvh] bg-background text-foreground">
      <div
        className="relative mx-auto max-w-md min-h-[100dvh] overflow-hidden"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/mjoh996/images/images/unity-gold/envato-labs-image-edit 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 px-4 py-6 flex flex-col h-[100dvh] overflow-y-auto hide-scrollbar pb-6">
          {/* Header */}
          <AnimationWrapper type="header">
            <div className="flex justify-center items-center mb-[22px] relative">
              <div 
                className="w-9 h-9 rounded-full bg-black/50 border border-[#EBC17B]/50 flex items-center justify-center cursor-pointer absolute left-0"
                onClick={onBack}
              >
                <img
                  src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/back-left.svg"
                  alt="back-ic"
                  className="w-[20px] h-[20px]"
                />
              </div>
              
              <h1 className="text-center font-inter text-[20px] font-semibold leading-[24px] tracking-[-0.2px] text-[#EBC17B]">
                My Stakes
              </h1>
              <div className="absolute right-4">
                <CurrencyToggle />
              </div>
            </div>
          </AnimationWrapper>

          {/* Your Stakes Title */}
          <AnimationWrapper delay={0.1}>
            <div className="px-0 mb-2">
              <p className="text-[#EBC17B] font-inter text-[12px] font-semibold leading-[15px] tracking-[-0.12px]">
                My Stakes
              </p>
            </div>
          </AnimationWrapper>

          {/* Stakes List */}
          <div className="px-0 space-y-[18px]">
            {stakes.map((stake, index) => (
              <AnimationWrapper key={stake.id} delay={0.2 + index * 0.1}>
  <div className="relative bg-black/70 rounded-[16px] px-3 py-2 h-[64px] flex items-center justify-between">

    
    
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/ugold-coin.svg"
          alt="UGOLD coin"
          className="w-10 h-10 rounded-full mr-3 object-contain"
        />
        <div>
          <div className="flex items-center gap-1.5">
          <h3 className="text-[17px] font-bold ugold-text leading-[21px] mb-1">UGOLD</h3>
            <p className="text-[13px] text-[#c9c9c9] leading-[16px] mb-0.5">
            {stake.percentage}%
            </p>
            </div>
          <p className="text-[13px] text-[#c9c9c9] leading-[16px]">
            {stake.daysRemaining} Days Remaining
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[17px] font-semibold text-[#FFD185] leading-[21px] mb-1">
          {stake.amount.toFixed(3)}
        </p>
        <p className="text-[13px] font-semibold text-[#c9c9c9] leading-[16px]">
          ${stake.dollarValue.toLocaleString()}
        </p>
      </div>
    </div>

   <div className="absolute bottom-[-10px] right-[12px] flex items-center rounded-full bg-black pl-2 pr-3 py-0.5">
  <span className="mr-3 text-xs font-medium tracking-[-0.55px] text-white">Auto Restake</span>

  <button
    type="button"
    onClick={() => handleToggleAutoRestake(stake.id)}
    className={`relative flex h-4 w-[47px] items-center justify-between rounded-full px-0.5 transition-all duration-300 ${
      stake.autoRestake ? "bg-[#D09635]" : "bg-white"
    }`}
  >
    <span
      className={`absolute text-[12px] leading-[14px] font-medium transition-all duration-300 ${
        stake.autoRestake
          ? "left-1 text-white"
          : "right-1 text-black"
      }`}
    >
      {stake.autoRestake ? "ON" : "OFF"}
    </span>

    <span
      className={`absolute h-[14px] w-[14px] rounded-full transition-all duration-300 ${
        stake.autoRestake ? "right-0.5 bg-[#fff]" : "left-0.5 bg-black"
      }`}
    />
  </button>
</div>
    
  </div>
</AnimationWrapper>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};