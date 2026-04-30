import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { CurrencyToggle } from "../components/currency-toggle";
import { BottomNavigation } from "../components/bottom-navigation";
import { AnimationWrapper } from "../components/animation-wrapper";
import { AnimatedNumber } from "../components/animated-number";
import { useCurrency } from "../context/currency-context";

interface StakeProps {
  onNavigate: (page: string) => void;
}

export const Stake: React.FC<StakeProps> = ({ onNavigate }) => {
  const [selectedTab, setSelectedTab] = React.useState("stake");
  const [stakeAmount, setStakeAmount] = React.useState("");
  const [claimAmount, setClaimAmount] = React.useState("");
  const [selectedLevel, setSelectedLevel] = React.useState("M");
  const [claimTabVisited, setClaimTabVisited] = React.useState(false);
  const [animationKey, setAnimationKey] = React.useState(0);
  const { currency } = useCurrency();

  const levels = [
    { id: "SS", label: "SS" },
    { id: "S", label: "S" },
    { id: "M", label: "M" },
    { id: "L", label: "L" },
    { id: "XL", label: "XL" },
  ];

  const claimStakes = [
    { id: 1, progress: 35, days: 24, amount: 132.483, usd: 12000 },
    { id: 2, progress: 80, days: 79, amount: 132.483, usd: 12000 },
    { id: 3, progress: 52, days: 46, amount: 98.245, usd: 8900 },
    { id: 4, progress: 64, days: 112, amount: 210.125, usd: 18400 },
    { id: 5, progress: 18, days: 301, amount: 56.731, usd: 5100 },
  ];

  const handleTabChange = (key: React.Key) => {
    const newTab = key as string;
    setSelectedTab(newTab);

    if (newTab === "claim" && !claimTabVisited) {
      setClaimTabVisited(true);
      setAnimationKey((prev) => prev + 1);
    }
  };

  const handleMaxClick = () => {
    if (selectedTab === "stake") {
      setStakeAmount("42.42");
    } else {
      setClaimAmount("42.42");
    }
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

        <div
          className={`relative z-10 pt-6 flex flex-col h-[100dvh] overflow-y-auto hide-scrollbar ${
            selectedTab === "claim" ? "pb-[0px]" : "pb-[97px]"
          }`}
        >
          {/* Header */}
          <AnimationWrapper type="header">
            <div className="flex justify-center items-center mb-[22px]">
              <h1 className="text-center font-inter text-[20px] font-semibold leading-[24px] tracking-[-0.2px] text-[#EBC17B]">
                {selectedTab === "stake" ? "Stake" : "Claim"}
              </h1>
              <div className="absolute right-4">
                <CurrencyToggle />
              </div>
            </div>
          </AnimationWrapper>

          {/* Tabs */}
          <AnimationWrapper delay={0.1}>
            <div className="mb-1.5">
              <div className="flex">
                <div
                  className={`w-1/2 text-center text-xs font-semibold leading-[15px] pb-1 cursor-pointer ${
                    selectedTab === "stake" ? "border-b-1 border-[#EBC17B]" : ""
                  }`}
                  onClick={() => handleTabChange("stake")}
                >
                  <span
                    className={`text-xs font-semibold leading-[15px] ${
                      selectedTab === "stake" ? "text-[#EBC17B]" : "text-[#e7e7e7]"
                    }`}
                  >
                    Stake
                  </span>
                </div>
                <div
                  className={`w-1/2 text-center text-xs font-semibold leading-[15px] pb-1 cursor-pointer ${
                    selectedTab === "claim" ? "border-b-1 border-[#EBC17B]" : ""
                  }`}
                  onClick={() => handleTabChange("claim")}
                >
                  <span
                    className={`text-xs font-semibold leading-[15px] ${
                      selectedTab === "claim" ? "text-[#EBC17B]" : "text-[#e7e7e7]"
                    }`}
                  >
                    Claim
                  </span>
                </div>
              </div>
            </div>
          </AnimationWrapper>

          {/* Balance Card */}
          <AnimationWrapper delay={0.2} key={`balance-${selectedTab}-${animationKey}`}>
            <div className="mb-6 px-3">
              <div className="bg-black/50 rounded-[16px] px-6 pt-2.5 pb-4">
                <h2 className="gold-gradient-text text-right mb-[6px] font-inter text-[40px] font-semibold leading-[47px] tracking-[-1.25px]">
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
                <div className="border-t-[0.5px] border-[#FFD185] pt-[7px]"></div>
                <div className="flex justify-between items-center">
                  <p className="text-xs ugold-text">
                    {selectedTab === "stake" ? "Your Current gold balance" : "Claimable"}
                  </p>
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

          {selectedTab === "stake" ? (
            <AnimationWrapper delay={0.3}>
              <div className="mb-6 px-3">
                <div className="flex justify-between items-center mb-1.5">
                  <p className="text-xs font-semibold text-[#EBC17B] ml-2.5">Stake UGOLD</p>
                  <div className="flex items-center">
                    <p className="text-xs text-[#EBC17B]">
                      / <AnimatedNumber value={42.42} decimals={2} />
                    </p>
                    <Button
                      className="ml-2 bg-[#EBC17B] text-black rounded-full text-xs px-6 py-2 h-[26px] font-semibold"
                      onPress={handleMaxClick}
                    >
                      MAX
                    </Button>
                  </div>
                </div>

                <div className="flex rounded-full overflow-hidden mb-5">
                  <div className="bg-[#D09635] text-white py-[15px] pl-6 pr-5 flex items-center justify-end font-[16px] font-semibold w-1/4 min-w-[110px]">
                    UGOLD
                  </div>
                  <input
                    className="w-[80%] flex-1 bg-white text-[16px] text-black placeholder:text-[#787878] font-semibold py-[15px] pr-6 outline-none text-right"
                    placeholder="Enter Amount"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    dir="rtl"
                  />
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center relative">
                    <div className="absolute left-0 right-0 h-[5px] bg-[#EBC17B] top-1/2 transform -translate-y-1/2 z-0"></div>

                    {levels.map((level, index) => (
                      <div
                        key={level.id}
                        onClick={() => setSelectedLevel(level.id)}
                        className={`w-[27px] h-[27px] text-xs rounded-full flex items-center justify-center z-10 cursor-pointer ${
                          selectedLevel === level.id
                            ? "bg-[#EBC17B] text-black font-semibold"
                            : index < levels.findIndex((l) => l.id === selectedLevel)
                              ? "bg-[#EBC17B] text-black font-semibold"
                              : index > levels.findIndex((l) => l.id === selectedLevel)
                                ? "bg-[#525252] text-white font-semibold"
                                : "bg-[#EBC17B] text-black font-semibold"
                        }`}
                      >
                        {level.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-[#EBC17B] font-inter text-[12px] font-semibold leading-[15px] tracking-[-0.12px] pb-[8px]">
                    Expected Mining
                  </p>
                  <div className="w-full rounded-[16px] bg-black/50 pl-3 pr-3 pt-2 pb-2">
                    <div className="flex items-start">
                      <div className="mr-2.5">
                        <img
                          src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/livegoldpriceimg.png"
                          alt="Gold bars"
                          className="w-[113px] h-[74px] object-contain"
                        />
                      </div>
                      <div className="space-y-[1px] flex-1 w-[80%]">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center justify-end">
                            <Icon icon="lucide:arrow-up" className="text-[#24DC3B] mr-0.5" />
                            <span className="text-right text-[#24DC3B] text-[13px] leading-[15px] font-semibold">
                              <AnimatedNumber value={0.1} decimals={1} suffix="%" />
                            </span>
                          </div>
                          <div>
                            <span className="text-[#FFD185] text-[17px] leading-[21px] font-semibold tracking-[-0.65px]">
                              <AnimatedNumber value={5000} decimals={0} prefix="$" />
                            </span>
                            <span className="text-[#c9c9c9] text-[13px] leading-[21px]"> / Day</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center justify-end">
                            <Icon icon="lucide:arrow-up" className="text-[#24DC3B] mr-0.5" />
                            <span className="text-right font-semibold text-[#24DC3B] text-[13px] leading-[15px]">
                              <AnimatedNumber value={1.0} decimals={1} suffix="%" />
                            </span>
                          </div>
                          <div>
                            <span className="text-[#FFD185] text-[17px] leading-[21px] font-semibold tracking-[-0.65px]">
                              <AnimatedNumber value={130000} decimals={0} prefix="$" />
                            </span>
                            <span className="text-[#c9c9c9] text-[13px] leading-[15px]"> / Month</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center justify-end">
                            <Icon icon="lucide:arrow-up" className="text-[#24DC3B] mr-0.5" />
                            <span className="text-right font-semibold text-[#24DC3B] text-[13px] leading-[15px]">
                              <AnimatedNumber value={193} decimals={0} suffix="%" />
                            </span>
                          </div>
                          <div>
                            <span className="text-[#FFD185] text-[17px] leading-[21px] font-semibold tracking-[-0.65px]">
                              <AnimatedNumber value={140} decimals={0} prefix="$" />
                            </span>
                            <span className="text-[#c9c9c9] text-[13px] leading-[15px]"> / Year</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          ) : (
            <AnimationWrapper delay={0.3} key={`claim-content-${animationKey}`}>
              <div className="mb-6 mx-3">
                <div className="flex justify-between items-center mb-1.5">
                  <p className="text-xs font-semibold text-[#EBC17B] ml-2.5">Claim Amount</p>
                  <div className="flex items-center">
                    <p className="text-xs text-[#EBC17B]">
                      / $
                      <AnimatedNumber
                        value={0.0}
                        decimals={2}
                        key={`claim-amount-${animationKey}`}
                      />
                    </p>
                    <Button
                      className="ml-2 bg-[#EBC17B] text-black rounded-full text-xs px-6 py-2 h-[26px] font-semibold"
                      onPress={handleMaxClick}
                    >
                      MAX
                    </Button>
                  </div>
                </div>

                <div className="flex rounded-full overflow-hidden mb-6">
                  <div className="bg-[#D09635] text-white py-[15px] pl-5 pr-4 flex items-center justify-center font-[16px] font-semibold w-1/4 min-w-[110px]">
                    $
                  </div>
                  <input
                    className="w-[80%] flex-1 bg-white text-[16px] text-black placeholder:text-[#787878] font-semibold py-[15px] pr-8 outline-none text-right"
                    placeholder="Enter amount"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    dir="rtl"
                  />
                </div>

                <div className="mb-6">
                  <p className="mx-2.5 text-[#EBC17B] font-inter text-[12px] font-semibold leading-[15px] tracking-[-0.12px] pb-[8px]">
                    Remaining
                  </p>

                  <div className="space-y-2 overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-[#EBC17B] scrollbar-track-[#4a4a4a]">
                    {claimStakes.map((stake) => (
                      <div key={stake.id} className="bg-black/50 rounded-[16px] p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/ugold-coin.svg"
                              alt="coin"
                              className="w-10 h-10 rounded-full mr-3 object-contain"
                            />
                            <div>
                              <h3 className="text-[17px] font-bold ugold-text leading-[21px]">
                                UGOLD
                              </h3>
                              <p className="text-[13px] text-[#c9c9c9] leading-[16px]">
                                {stake.progress}% ({stake.days} Days) Remaining
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[17px] font-semibold text-[#FFD185] leading-[21px]">
                              <AnimatedNumber value={stake.amount} decimals={3} />
                            </p>

                            <p className="text-[13px] font-semibold text-[#c9c9c9] leading-[16px]">
                              $<AnimatedNumber value={stake.usd} decimals={0} />
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          )}

          {/* Bottom CTA */}
          <div className="mt-auto mb-6 px-4">
            <AnimationWrapper
              type="button"
              delay={0.4}
              key={`button-${selectedTab}-${animationKey}`}
            >
              {selectedTab === "stake" ? (
                <div className="flex gap-3">
                  <Button
                    className="w-1/2 bg-black border border-[#EBC17B] rounded-full h-[64px] font-semibold text-[#EBC17B] text-lg"
                    onPress={() => onNavigate("your-stakes")}
                  >
                    Staking List
                  </Button>
                  <Button
                    className="w-1/2 gold-gradient rounded-full h-[64px] font-semibold text-white text-lg"
                    startContent={
                      <>
                        {/* <img
                          src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/stake-ug.svg"
                          alt="stake arrow"
                          className="w-[24px] h-[24px]"
                        /> */}
                      </>
                    }
                  >
                    Stake UGOLD
                  </Button>
                </div>
              ) : null}
            </AnimationWrapper>
          </div>
        </div>

        {/* One homogeneous black opacity blur layer for claim button + navbar */}
        {selectedTab === "claim" && (
          <>
            <div
  className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[218px]
  bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.54)_15%,rgba(0,0,0,0.70)_100%)]
  backdrop-blur-[10px]
  [mask-image:linear-gradient(to_top,black_10%,black_50%,transparent_100%)]
  [WebkitMaskImage:linear-gradient(to_top,black_0%,black_50%,transparent_100%)]"
/>

            {/* Fixed claim button */}
            <div className="absolute inset-x-0 bottom-[120px] z-30 px-4">
              <AnimationWrapper
                type="button"
                delay={0.4}
                key={`button-${selectedTab}-${animationKey}`}
              >
                <Button
                  className="w-full gold-gradient rounded-full h-[64px] font-semibold text-white text-md"
                  startContent={
                    <img
                      src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/claim-ug.svg"
                      alt="claim arrow"
                      className="w-[24px] h-[24px]"
                    />
                  }
                >
                  Claim UGOLD
                </Button>
              </AnimationWrapper>
            </div>
          </>
        )}

        {/* Bottom Navigation */}
        <div className="absolute inset-x-0 bottom-0 z-50">
          <AnimationWrapper
            type="navbar"
            delay={0.5}
            key={`navbar-${selectedTab}-${animationKey}`}
          >
            <BottomNavigation activeTab="stake" onTabChange={onNavigate} />
          </AnimationWrapper>
        </div>
      </div>
    </div>
  );
};