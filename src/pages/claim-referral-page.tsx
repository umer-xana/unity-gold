import React from "react";
import { motion } from "framer-motion";
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerBody } from "@heroui/react";
import { AnimationWrapper } from "../components/animation-wrapper";
import { AnimatedNumber } from "../components/animated-number";
import { CurrencyToggle } from "../components/currency-toggle";
import { useCurrency } from "../context/currency-context";

interface ClaimReferralPageProps {
  onBack: () => void;
}

interface RewardBreakdownEntry {
  name: string;
  rank: string;
  stakingDate: string;
  stakingAmountUgold: number;
  firstRewardDate: string;
  nextRewardDate: string;
  lastRewardDate: string;
  totalRewardsUgold: number;
  nextRewardAmountUgold: number;
  remainingRewardsUgold: number;
}

const INITIAL_CLAIMABLE_REWARD_USD = 25.5;
const REFERRAL_OZ_PER_USD = 1 / 2400;
const FIXED_FEE_OZ = 0.00001;
const MIN_CLAIM_OZ = 1;

const initialBreakdown: RewardBreakdownEntry[] = [
  {
    name: "UserName 1", rank: "V1",
    stakingDate: "2026-04-01 09:30",
    stakingAmountUgold: 0.0420,
    firstRewardDate: "2026-04-08",
    nextRewardDate: "2026-05-15",
    lastRewardDate: "2026-04-30",
    totalRewardsUgold: 0.003333,
    nextRewardAmountUgold: 0.000833,
    remainingRewardsUgold: 0.002500,
  },
  {
    name: "UserName 2", rank: "V3",
    stakingDate: "2026-04-05 14:12",
    stakingAmountUgold: 0.0271,
    firstRewardDate: "2026-04-12",
    nextRewardDate: "2026-05-12",
    lastRewardDate: "2026-05-02",
    totalRewardsUgold: 0.002708,
    nextRewardAmountUgold: 0.000700,
    remainingRewardsUgold: 0.001950,
  },
  {
    name: "UserName 3", rank: "V1",
    stakingDate: "2026-04-10 18:45",
    stakingAmountUgold: 0.0177,
    firstRewardDate: "2026-04-17",
    nextRewardDate: "2026-05-17",
    lastRewardDate: "2026-05-04",
    totalRewardsUgold: 0.001770,
    nextRewardAmountUgold: 0.000420,
    remainingRewardsUgold: 0.001100,
  },
  {
    name: "UserName 4", rank: "V2",
    stakingDate: "2026-04-15 11:20",
    stakingAmountUgold: 0.0156,
    firstRewardDate: "2026-04-22",
    nextRewardDate: "2026-05-22",
    lastRewardDate: "2026-05-05",
    totalRewardsUgold: 0.001562,
    nextRewardAmountUgold: 0.000390,
    remainingRewardsUgold: 0.000950,
  },
  {
    name: "UserName 5", rank: "V1",
    stakingDate: "2026-04-22 08:05",
    stakingAmountUgold: 0.0125,
    firstRewardDate: "2026-04-29",
    nextRewardDate: "2026-05-29",
    lastRewardDate: "2026-05-06",
    totalRewardsUgold: 0.001250,
    nextRewardAmountUgold: 0.000312,
    remainingRewardsUgold: 0.000820,
  },
];

export const ClaimReferralPage: React.FC<ClaimReferralPageProps> = ({ onBack }) => {
  const { currency } = useCurrency();
  const [claimableUsd, setClaimableUsd] = React.useState<number>(INITIAL_CLAIMABLE_REWARD_USD);
  const [breakdown, setBreakdown] = React.useState<RewardBreakdownEntry[]>(initialBreakdown);
  const [claimAmount, setClaimAmount] = React.useState<string>("");
  const [isClaiming, setIsClaiming] = React.useState(false);
  const [claimSuccess, setClaimSuccess] = React.useState<{ open: boolean; ugold: number }>({ open: false, ugold: 0 });

  const claimableUgold = claimableUsd * REFERRAL_OZ_PER_USD;
  const parsedAmount = parseFloat(claimAmount);
  const hasAmount = !isNaN(parsedAmount) && parsedAmount > 0;
  const belowMinimum = hasAmount && parsedAmount < MIN_CLAIM_OZ;
  const isAmountValid = hasAmount && !belowMinimum && parsedAmount <= claimableUgold;

  const feeOz = FIXED_FEE_OZ;
  const receiveOz = isAmountValid && parsedAmount > FIXED_FEE_OZ ? parsedAmount - FIXED_FEE_OZ : 0;

  const handleSetMax = () => {
    if (claimableUgold > 0) setClaimAmount(claimableUgold.toFixed(6));
  };

  const handleAmountChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setClaimAmount(value);
    }
  };

  const handleClaim = async () => {
    if (claimableUgold <= 0 || !isAmountValid) return;
    setIsClaiming(true);
    try {
      const claimedUgold = parsedAmount;
      const claimedUsd = claimedUgold / REFERRAL_OZ_PER_USD;
      setClaimableUsd((prev) => Math.max(0, prev - claimedUsd));
      if (claimedUgold >= claimableUgold) {
        setBreakdown([]);
      }
      setClaimAmount("");
      setClaimSuccess({ open: true, ugold: Math.max(0, claimedUgold - FIXED_FEE_OZ) });
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div
        className="relative mx-auto max-w-md min-h-screen overflow-hidden"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/mjoh996/images/images/unity-gold/envato-labs-image-edit 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 px-4 py-6 flex flex-col h-[100dvh]">
          {/* Header with back button */}
          <AnimationWrapper type="header">
            <div className="flex items-center justify-center mb-[24px] relative">
              <div
                className="w-9 h-9 rounded-full bg-black/50 border-[0.5px] border-[#EBC17B] flex items-center justify-center cursor-pointer absolute left-0"
                onClick={onBack}
              >
                <img
                  src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/back-left.svg"
                  alt="Back"
                  className="w-[20px] h-[20px]"
                />
              </div>
              <h1 className="text-center font-inter text-[17px] font-semibold leading-[24px] tracking-[-0.2px] text-[#EBC17B] px-12">
                Claim Referral Reward
              </h1>
              <div className="absolute right-0">
                <CurrencyToggle />
              </div>
            </div>
          </AnimationWrapper>

          {/* Claimable Referral Reward card — UGOLD primary, USD secondary */}
          <AnimationWrapper delay={0.15} className="mb-5">
            <div className="bg-black/50 rounded-[16px] px-6 pt-2.5 pb-4">
              <span className="text-xs mt-[4px] block ugold-text text-left">
                Claimable Referral Reward
              </span>
              <h2 className="gold-gradient-text text-right mb-[6px] font-inter text-[40px] font-semibold leading-[47px] tracking-[-1.25px]">
                {currency === "$" ? (
                  <>
                    <span className="text-[25px] leading-[40px]">$ </span>
                    <AnimatedNumber value={claimableUsd} decimals={2} />
                  </>
                ) : (
                  <>
                    <AnimatedNumber value={claimableUgold} decimals={6} />
                    <span className="text-[25px] leading-[40px]"> UGOLD</span>
                  </>
                )}
              </h2>
              <div className="border-t-[0.5px] border-[#FFD185] pt-[7px]"></div>
              <div className="flex justify-end items-center">
                <p className="text-[13px] font-semibold text-[#c9c9c9] leading-[16px]">
                  {currency === "$" ? (
                    <>
                      ≈ <AnimatedNumber value={claimableUgold} decimals={6} suffix=" UGOLD" />
                    </>
                  ) : (
                    <>
                      ≈ $<AnimatedNumber value={claimableUsd} decimals={2} />
                    </>
                  )}
                </p>
              </div>
            </div>
          </AnimationWrapper>

          {/* Amount input with MAX */}
          <AnimationWrapper delay={0.2} className="mb-3">
            <div className="flex justify-between items-center mb-1.5">
              <p className="text-xs font-semibold text-[#EBC17B] ml-2.5">Claim Amount</p>
              <div className="flex items-center">
                <p className="text-xs text-[#EBC17B]">
                  / <AnimatedNumber value={claimableUgold} decimals={4} suffix=" UGOLD" />
                </p>
                <Button
                  className="ml-2 bg-[#EBC17B] text-black rounded-full text-xs px-6 py-2 h-[26px] font-semibold"
                  onPress={handleSetMax}
                  isDisabled={claimableUgold <= 0}
                >
                  MAX
                </Button>
              </div>
            </div>

            <div className="flex rounded-full overflow-hidden">
              <div className="bg-[#D09635] text-white py-[15px] pl-5 pr-4 flex items-center justify-center text-[16px] font-semibold w-1/4 min-w-[110px]">
                UGOLD
              </div>
              <input
                className="w-[80%] flex-1 bg-white text-[16px] text-black placeholder:text-[#787878] font-semibold py-[15px] pr-6 outline-none text-right"
                placeholder="Enter UGOLD amount"
                value={claimAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                inputMode="decimal"
                disabled={isClaiming || claimableUgold <= 0}
              />
            </div>
          </AnimationWrapper>

          {/* Fee + receivable */}
          <AnimationWrapper delay={0.25} className="mb-4">
            <div className="flex justify-between items-start px-2">
              <span className="text-[13px] text-[#c9c9c9] whitespace-nowrap">
                Fee: <AnimatedNumber value={feeOz} decimals={6} suffix=" UGOLD" />
              </span>
              <div className="flex flex-col items-end">
                <span className="text-[13px] font-semibold text-[#EBC17B]">
                  You will receive:{" "}
                  {receiveOz === 0 ? (
                    "0 UGOLD"
                  ) : (
                    <AnimatedNumber value={receiveOz} decimals={6} suffix=" UGOLD" />
                  )}
                </span>
                {belowMinimum && (
                  <span className="text-[12px] font-normal text-[#FF3B30] mt-0.5 whitespace-nowrap">
                    Minimum claim amount is {MIN_CLAIM_OZ} UGOLD.
                  </span>
                )}
              </div>
            </div>
          </AnimationWrapper>

          {/* Breakdown list */}
          <AnimationWrapper delay={0.3} className="flex-1 min-h-0 mb-4 flex flex-col">
            <p className="mx-2.5 text-[#EBC17B] font-inter text-[12px] font-semibold leading-[15px] tracking-[-0.12px] pb-[8px]">
              Reward Breakdown
            </p>
            {breakdown.length === 0 ? (
              <div className="bg-black/50 rounded-[16px] p-4 text-center">
                <p className="text-[14px] text-[#c9c9c9]">No breakdown available</p>
              </div>
            ) : (
              <div className="space-y-3 flex-1 min-h-0 overflow-y-auto hide-scrollbar pr-1">
                {breakdown.map((entry, idx) => (
                  <motion.div
                    key={`${entry.name}-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.05 * idx }}
                    className="bg-black/50 rounded-[12px] px-3 py-2.5"
                  >
                    {/* Top: Total Rewards (prominent) + username (muted) */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#c9c9c9] leading-[12px]">Total Rewards</span>
                        <div className="flex items-baseline whitespace-nowrap">
                          <span className="gold-gradient-text font-bold text-[16px] leading-[22px]">
                            <AnimatedNumber value={entry.totalRewardsUgold} decimals={6} />
                          </span>
                          <span className="text-[11px] ml-1 font-bold text-[#EBC17B] leading-[14px]">
                            UGOLD
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[12px] text-[#EBC17B] font-semibold leading-[14px]">{entry.name}</span>
                        <span className="text-[10px] text-[#c9c9c9] leading-[12px] mt-0.5">
                          Stake <AnimatedNumber value={entry.stakingAmountUgold} decimals={4} suffix=" UGOLD" />
                        </span>
                      </div>
                    </div>

                    {/* Bottom: Next + Remaining stats */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t-[0.5px] border-[#3a3a3a]">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#c9c9c9] leading-[12px]">Next · {entry.nextRewardDate}</span>
                        <span className="text-[12px] text-[#FFD185] font-semibold leading-[15px]">
                          <AnimatedNumber value={entry.nextRewardAmountUgold} decimals={6} suffix=" UGOLD" />
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-[#c9c9c9] leading-[12px]">Remaining</span>
                        <span className="text-[12px] text-[#FFD185] font-semibold leading-[15px]">
                          <AnimatedNumber value={entry.remainingRewardsUgold} decimals={6} suffix=" UGOLD" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimationWrapper>

          {/* Bottom CTA */}
          <AnimationWrapper type="button" delay={0.4}>
            <Button
              className="gold-gradient w-full rounded-full h-[64px] text-[18px] font-semibold text-white mb-6 disabled:opacity-60"
              onPress={handleClaim}
              isLoading={isClaiming}
              isDisabled={isClaiming || claimableUgold <= 0 || !isAmountValid}
            >
              {isClaiming ? "Claiming..." : "Claim Referral Reward"}
            </Button>
          </AnimationWrapper>
        </div>

        {/* Success drawer */}
        <Drawer
          isOpen={claimSuccess.open}
          onOpenChange={(open) => setClaimSuccess((prev) => ({ ...prev, open }))}
          placement="bottom"
          classNames={{
            wrapper: "w-full max-w-md mx-auto",
            base: "rounded-t-[35px] bg-black/60 backdrop-blur-[20px] max-w-md mx-auto",
            backdrop: "!backdrop-opacity-100 bg-black/30 backdrop-blur-[3px]",
          }}
          hideCloseButton={true}
        >
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="text-[20px] pt-[40px] pb-[24px] font-semibold leading-[24px] flex justify-center border-b-0">
                  <h2 className="text-[20px] leading-[24px] font-semibold text-[#EBC17B]">Claim Successful</h2>
                  <Button
                    isIconOnly
                    variant="light"
                    className="absolute right-4 top-3"
                    onPress={onClose}
                  >
                    <img
                      src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/cross-icon-ug-img.png"
                      alt="cross-ic"
                      className="w-[24px] h-[24px]"
                    />
                  </Button>
                </DrawerHeader>
                <DrawerBody className="text-center gap-0 py-0 pb-[32px]">
                  <p className="text-center text-[14px] font-medium leading-[17px] mb-[5px] max-w-[292px] mx-auto text-[#c9c9c9]">
                    You have successfully claimed {claimSuccess.ugold.toFixed(6)} UGOLD in referral rewards.
                  </p>

                  <div className="flex justify-center mt-[32px] mb-[64px]">
                    <div className="w-[74px] h-[74px] rounded-full flex items-center justify-center">
                      <img
                        src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/ug-success.svg"
                        alt="success-ic"
                        className="w-[74px] h-[74px]"
                      />
                    </div>
                  </div>

                  <Button
                    fullWidth
                    className="gold-gradient rounded-full h-[64px] text-[18px] font-semibold text-white"
                    onPress={onClose}
                  >
                    OK
                  </Button>
                </DrawerBody>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default ClaimReferralPage;
