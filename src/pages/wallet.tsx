import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { CurrencyToggle } from "../components/currency-toggle";
import { BottomNavigation } from "../components/bottom-navigation";
import { AnimationWrapper } from "../components/animation-wrapper";
import { AnimatedNumber } from "../components/animated-number";
import { useCurrency } from "../context/currency-context";

interface AssetProps {
  icon: string;
  name: string;
  subtitle: string;
  value: string;
  change?: {
    percentage: string;
    isPositive: boolean;
  };
}

const Asset: React.FC<AssetProps> = ({ icon, name, subtitle, value, change }) => {
  const valueNumber = parseFloat(value.replace(/[^0-9.]/g, ""));
  const subtitleNumber = parseFloat(subtitle.replace(/[^0-9,]/g, "").replace(",", ""));
  const percentageValue = change ? parseFloat(change.percentage.replace(/[^0-9.]/g, "")) : 0;

  return (
    <div className="bg-black/50 rounded-[16px] py-[7px] px-3 mb-2.5">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <img
            src={icon}
            alt="coin"
            className="w-[40px] h-[40px] rounded-full object-contain mr-2.5"
          />
          <div className="flex-1 h-10 flex flex-col justify-between pt-[2px]">
            <h3 className="text-[15px] leading-[18px] font-bold text-white">{name}</h3>
            <p className="text-[13px] leading-[16px] font-semibold text-[#8B8B8B] mt-[3px]">
              $<AnimatedNumber value={subtitleNumber} decimals={0} />
            </p>
          </div>
        </div>
        <div className="flex-1 h-10 flex flex-col justify-between text-right">
          <p className="text-[14px] leading-[17px] font-semibold text-white">
            $<AnimatedNumber value={valueNumber} decimals={3} />
          </p>
          {change && (
            <p className="text-[12px] leading-[15px] pt-[5px] text-[#24DC3B] font-semibold flex items-center justify-end">
              <Icon icon="lucide:arrow-up" className="mr-1" width={15} />
              <AnimatedNumber value={percentageValue} decimals={0} suffix="%" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface WalletProps {
  onNavigate: (page: string) => void;
}

export const Wallet: React.FC<WalletProps> = ({ onNavigate }) => {
  const { currency } = useCurrency();
  const assets: AssetProps[] = [
    {
      icon: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/ugold-coin.svg",
      name: "UGOLD",
      subtitle: "$1,012",
      value: "$132.843",
      change: {
        percentage: "32%",
        isPositive: true
      }
    },
    {
      icon: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/ugold-coin.svg",
      name: "UGOLD Staking",
      subtitle: "$1,012",
      value: "$132.843"
    },
    {
      icon: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/ugold-coin.svg",
      name: "UGOLD Claimable",
      subtitle: "$1,012",
      value: "$132.843",
      change: {
        percentage: "32%",
        isPositive: true
      }
    },
    {
      icon: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/usdt-coin.svg",
      name: "USDT",
      subtitle: "$1,012",
      value: "$132.843",
      change: {
        percentage: "32%",
        isPositive: true
      }
    }
  ];

  const handleSendClick = () => {
    onNavigate("send");
  };

  const handleReceiveClick = () => {
    onNavigate("receive");
  };

  return (
    <div className="dark min-h-[100dvh] bg-background text-foreground">
      <div
        className="relative mx-auto max-w-md min-h-[100dvh] overflow-hidden"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/mjoh996/images/images/unity-gold/envato-labs-image-edit 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 px-4 py-6 flex flex-col h-[100dvh] overflow-y-auto hide-scrollbar pb-[97px]">
          {/* Header - Updated to match home page style */}
          <AnimationWrapper type="header">
            <div className="flex justify-center items-center mb-[22px]">
              <h1 className="text-center font-inter text-[20px] font-semibold leading-[24px] tracking-[-0.2px] text-[#EBC17B]">
                Wallet
              </h1>
              <div className="absolute right-4">
                <CurrencyToggle />
              </div>
            </div>
          </AnimationWrapper>

          {/* Balance Card */}
          <AnimationWrapper delay={0.1}>
            <div className="mb-6">
              <p className="text-[#EBC17B] font-inter text-[12px] font-semibold leading-[15px] tracking-[-0.12px] pb-[8px]">
                Your UGOLD Balance
              </p>
              <div className="bg-black/50 rounded-[16px] px-6 pt-2.5 pb-4">
                <h2 className="gold-gradient-text text-right mb-[7px] font-inter text-[40px] font-semibold leading-[48px] tracking-[-1.25px]">
                  {currency === "$" ? (
                    <>
                      <span className="text-[25px] leading-[40px]">$ </span>
                      <AnimatedNumber value={34985} decimals={2} />
                    </>
                  ) : (
                    <>
                      <AnimatedNumber value={11.34} decimals={2} />
                      <span className="text-[25px] leading-[40px]"> oz</span>
                    </>
                  )}
                </h2>
                <div className="border-t-[0.5px] border-[#FFD185] pt-[6px]"></div>
                <div className="flex justify-between items-center">
                  <p className="text-xs ugold-text">Your Current gold balance</p>
                  <p className="text-[16px] font-semibold ugold-text leading-[20px]">
                    {currency === "$" ? (
                      <AnimatedNumber value={11.34} decimals={2} suffix=" oz" />
                    ) : (
                      <>
                        <span>$</span>
                        <AnimatedNumber value={11.34} decimals={2} />
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </AnimationWrapper>

          {/* Assets Section */}
          <AnimationWrapper delay={0.2}>
            <div className="mb-6">
              <p className="text-[#EBC17B] font-inter text-[12px] leading-[15px] font-semibold mb-2.5">
                MY Assets
              </p>
              {assets.map((asset, index) => (
                <Asset
                  key={index}
                  icon={asset.icon}
                  name={asset.name}
                  subtitle={asset.subtitle}
                  value={asset.value}
                  change={asset.change}
                />
              ))}
            </div>
          </AnimationWrapper>

          {/* Action Buttons now in a fixed container for larger screens, but scrolls with content on smaller screens */}
          <div className="mt-auto mb-6">
            <AnimationWrapper type="button" delay={0.3}>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  className="gold-gradient rounded-full h-16 font-semibold text-white text-lg"
                  startContent={
                    <img
                      src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/send-ug.svg"
                      alt="send arr"
                      className="w-[24px] h-[24px]"
                    />
                  }
                  onPress={handleSendClick}
                >
                  Send
                </Button>
                <Button
                  className="gold-gradient rounded-full h-[64px] font-semibold text-white text-lg"
                  startContent={
                    <img
                      src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/receive-ug.svg"
                      alt="receive arr"
                      className="w-[24px] h-[24px]"
                    />
                  }
                  onPress={handleReceiveClick}
                >
                  Receive
                </Button>
              </div>
            </AnimationWrapper>
          </div>
        </div>

        {/* Bottom Navigation */}
        <AnimationWrapper type="navbar" delay={0.4}>
          <BottomNavigation activeTab="wallet" onTabChange={onNavigate} />
        </AnimationWrapper>
      </div>
    </div>
  );
};