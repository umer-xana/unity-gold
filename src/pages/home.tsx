import React from "react";
import { Button } from "@heroui/react";
import { BottomNavigation } from "../components/bottom-navigation";
import { CurrencyToggle } from "../components/currency-toggle";
import { PriceIndicator } from "../components/price-indicator";
import { AnimationWrapper } from "../components/animation-wrapper";
import { AnimatedNumber } from "../components/animated-number";
import { useCurrency } from "../context/currency-context";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [amount, setAmount] = React.useState("");
  const [selectedUnit, setSelectedUnit] = React.useState("USD");
  const { currency } = useCurrency();

  // Define unit options based on currency selection
  const unitOptions = currency === "$" ? ["USD"] : ["Oz", "Kg", "Gm"];

  // Set default unit when currency changes
  React.useEffect(() => {
    setSelectedUnit(currency === "$" ? "USD" : "Oz");
  }, [currency]);

  return (
    <div className="dark min-h-[100dvh] bg-background text-foreground">
      <div
        className="relative mx-auto min-h-[100dvh] max-w-md overflow-hidden"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/mjoh996/images/images/unity-gold/envato-labs-image-edit 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative flex h-[100dvh] flex-col overflow-y-auto px-4 py-[24px] pb-[96px] hide-scrollbar">
          {/* Header */}
          <AnimationWrapper type="header">
            <div className="relative mb-[22px] flex items-center justify-center">
              <h1 className="text-center font-inter text-[20px] font-semibold leading-[24px] tracking-[-0.2px] text-[#EBC17B]">
                UGOLD
              </h1>
              <div className="absolute right-0">
                <CurrencyToggle />
              </div>
            </div>
          </AnimationWrapper>

          {/* Balance Card */}
          <AnimationWrapper delay={0.1}>
            <div className="mb-6">
              <p className="ml-2.5 pb-[8px] font-inter text-[12px] font-semibold leading-[15px] tracking-[-0.12px] text-[#EBC17B]">
                Your UGOLD Balance
              </p>
              <div className="rounded-[16px] bg-black/50 px-6 pt-[11px] pb-4">
                <h2 className="gold-gradient-text mb-1.5 text-right font-inter text-[40px] font-semibold leading-[47px] tracking-[-1.25px]">
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
                <div className="border-t-[0.5px] border-[#FFD185] pt-[6px]" />
                <div className="flex items-center justify-between">
                  <p className="ugold-text text-xs">Your Current gold balance</p>
                  <p className="ugold-text text-[16px] font-semibold leading-[20px]">
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

          {/* Live Price Section */}
          <AnimationWrapper delay={0.2}>
            <div className="mb-6">
              <p className="ml-2.5 pb-[8px] font-inter text-[12px] font-semibold leading-[15px] tracking-[-0.12px] text-[#EBC17B]">
                Live Gold Price
              </p>
              <div className="h-[90px] w-full rounded-[16px] bg-black/50">
                <div className="flex px-3 py-2">
                  <div className="mr-3">
                    <img
                      src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/livegoldpriceimg.png"
                      alt="Gold bars"
                      className="h-[74px] w-[113px] object-contain"
                    />
                  </div>
                  <div className="w-[80%] flex-1">
                    <PriceIndicator percentage="1.27%" price="$5,000" unit="/ Oz" />
                    <PriceIndicator percentage="1.27%" price="$130,000" unit="/ Kg" />
                    <PriceIndicator percentage="1.27%" price="$140" unit="/ gm" />
                  </div>
                </div>
              </div>
            </div>
          </AnimationWrapper>

          {/* Buy Section */}
          <AnimationWrapper delay={0.3}>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="ml-2.5 font-inter text-[12px] font-semibold leading-[15px] tracking-[-0.12px] text-[#EBC17B]">
                  Buy UGOLD
                </p>
                <p className="ugold-text mr-5 text-xs leading-[15px]">
                  = $<AnimatedNumber value={42.42} decimals={2} />
                </p>
              </div>

              <div className="mb-[13px] overflow-hidden rounded-full ring-1 ring-inset ring-[#EBC17B]">
                <input
                  className="text-black w-full bg-white px-5 py-[15px] text-right font-semibold outline-none placeholder-[#787878]"
                  placeholder={currency === "$" ? "Enter amount" : "Enter gold amount"}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="mb-11 flex gap-[12px] px-[14px]">
                {unitOptions.map((unit) => (
                  <Button
                    key={unit}
                    className={`h-[26px] min-w-17 max-w-[66px] rounded-full bg-[#FCD48E] px-0 text-xs font-semibold leading-[15px] text-black ${
                      selectedUnit === unit ? "bg-[#D09635] text-white ring-2 ring-white/0" : ""
                    }`}
                    onPress={() => setSelectedUnit(unit)}
                  >
                    {unit}
                  </Button>
                ))}
              </div>
            </div>
          </AnimationWrapper>

          {/* Buy Button pushed toward bottom */}
          <div className="mt-auto mb-[24px]">
            <AnimationWrapper delay={0.3} type="button">
              <Button
                className="gold-gradient h-16 w-full rounded-full text-lg font-semibold text-white"
                startContent={
                  <img
                    src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/buy-ug.svg"
                    alt="Buy UGOLD"
                    className="mr-1 h-[24px] w-[24px]"
                  />
                }
              >
                Buy UGOLD
              </Button>
            </AnimationWrapper>
          </div>
        </div>

        {/* Bottom Navigation */}
        <AnimationWrapper type="navbar" delay={0.4}>
          <BottomNavigation activeTab="home" onTabChange={onNavigate} />
        </AnimationWrapper>
      </div>
    </div>
  );
};