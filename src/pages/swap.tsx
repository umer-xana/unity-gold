import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { CurrencyToggle } from "../components/currency-toggle";
import { BottomNavigation } from "../components/bottom-navigation";
import { motion } from "framer-motion";
import { AnimationWrapper } from "../components/animation-wrapper";
import { AnimatedNumber } from "../components/animated-number";
import { useCurrency } from "../context/currency-context";

interface TokenProps {
  symbol: string;
  name: string;
  price: string;
  amount: string;
  icon: string;
}

const TokenCard: React.FC<{ label: string; token: TokenProps }> = ({ label, token }) => {
  const priceValue = parseFloat(token.price.replace(/[^0-9.]/g, ""));
  const amountValue = parseFloat(token.amount.replace(/[^0-9.]/g, ""));

  return (
    <div className="mb-2.5">
      <p className="text-xs text-[#EBC17B] ugold-text font-semibold mb-2.5">{label}</p>
      <div className="bg-black/50 rounded-[16px] p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={token.icon}
              alt="coin"
              className="w-10 h-10 rounded-full object-contain mr-3"
            />
            <div>
              <h3 className="text-[17px] font-bold ugold-text leading-[21px]">{token.symbol}</h3>
              <p className="text-[13px] text-[#c9c9c9] leading-[16px]">USDT+0.2233</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[17px] font-semibold text-[#FFD185] leading-[21px]">
              $<AnimatedNumber value={priceValue} decimals={3} />
            </p>
            <p className="text-[13px] font-semibold text-[#c9c9c9] leading-[16px]">
              <AnimatedNumber value={amountValue} decimals={2} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Swap: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { currency } = useCurrency();

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
          <AnimationWrapper type="header">
            <div className="flex justify-center items-center mb-[22px]">
              <h1 className="text-center font-inter text-[20px] font-semibold leading-[24px] tracking-[-0.2px] text-[#EBC17B]">
                Swap
              </h1>
              <div className="absolute right-4">
                <CurrencyToggle />
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper delay={0.1}>
            <TokenCard
              label="From"
              token={{
                symbol: "DMG",
                name: "DMG Token",
                price: "132.843",
                amount: "192.21",
                icon: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/ugold-coin.svg"
              }}
            />
          </AnimationWrapper>

          <AnimationWrapper delay={0.2}>
            <div className="flex justify-center mt-[20px] mb-[0]">
              <motion.div
                whileTap={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="w-[36px] h-[36px] rounded-full bg-black/50 flex items-center justify-center z-20"
              >
                <img
                  src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/swap-ug-mid.svg"
                  alt="Arrow down"
                  className="w-[22px] h-[22px]"
                />
              </motion.div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper delay={0.3}>
            <TokenCard
              label="To"
              token={{
                symbol: "USDT",
                name: "Tether USD",
                price: "132.843",
                amount: "192.21",
                icon: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/usdt-coin.svg"
              }}
            />
          </AnimationWrapper>
           <AnimationWrapper delay={0.4}>
         <div className="mb-8 px-[8px]">
         <p className="text-xs text-[#c9c9c9] leading-[15px] mb-[5px]">
          *1% swap fee will be deducted from the final amount.
         </p>

         <p className="text-xs text-[#c9c9c9] leading-[15px]">
         *The swap process may take a few minutes. Please do not perform any other actions until it is complete.
         </p>
        </div>
         </AnimationWrapper> 

          <div className="mt-auto mb-6">
            <AnimationWrapper type="button" delay={0.4}>
              <Button
                className="w-full gold-gradient rounded-full h-[64px] font-semibold text-white text-lg"
                startContent={
                  <img
                    src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/swap-ug.svg"
                    alt="swap btn"
                    className="w-[24px] h-[24px]"
                  />
                }
              >
                Swap
              </Button>
            </AnimationWrapper>
          </div>
        </div>

        <AnimationWrapper type="navbar" delay={0.5}>
          <BottomNavigation activeTab="swap" onTabChange={onNavigate} />
        </AnimationWrapper>
      </div>
    </div>
  );
};