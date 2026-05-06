import React from "react";
import { motion } from "framer-motion";
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerBody } from "@heroui/react";
import { AnimationWrapper } from "../components/animation-wrapper";
import { AnimatedNumber } from "../components/animated-number";

interface ClaimReferralPageProps {
  onBack: () => void;
}

interface RewardBreakdownEntry {
  name: string;
  rank: string;
  amount: number;
  percent: string;
}

const INITIAL_CLAIMABLE_REWARD = 25.5;
const REFERRAL_OZ_PER_USD = 1 / 2400;

const initialBreakdown: RewardBreakdownEntry[] = [
  { name: "UserName 1", rank: "V1", amount: 8.0,  percent: "0.01%" },
  { name: "UserName 2", rank: "V3", amount: 6.5,  percent: "0.01%" },
  { name: "UserName 3", rank: "V1", amount: 4.25, percent: "0.005%" },
  { name: "UserName 4", rank: "V2", amount: 3.75, percent: "0.005%" },
  { name: "UserName 5", rank: "V1", amount: 3.0,  percent: "0.003%" },
];

export const ClaimReferralPage: React.FC<ClaimReferralPageProps> = ({ onBack }) => {
  const [claimableReward, setClaimableReward] = React.useState<number>(INITIAL_CLAIMABLE_REWARD);
  const [breakdown, setBreakdown] = React.useState<RewardBreakdownEntry[]>(initialBreakdown);
  const [claimAmount, setClaimAmount] = React.useState<string>("");
  const [isClaiming, setIsClaiming] = React.useState(false);
  const [claimSuccess, setClaimSuccess] = React.useState<{ open: boolean; amount: number }>({ open: false, amount: 0 });

  const claimableOz = claimableReward * REFERRAL_OZ_PER_USD;
  const parsedAmount = parseFloat(claimAmount);
  const isAmountValid =
    !isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= claimableReward;

  const handleSetMax = () => {
    if (claimableReward > 0) setClaimAmount(claimableReward.toFixed(2));
  };

  const handleAmountChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setClaimAmount(value);
    }
  };

  const handleClaim = async () => {
    if (claimableReward <= 0 || !isAmountValid) return;
    setIsClaiming(true);
    try {
      const claimedAmount = parsedAmount;
      setClaimableReward((prev) => Math.max(0, prev - claimedAmount));
      if (claimedAmount >= claimableReward) {
        setBreakdown([]);
      }
      setClaimAmount("");
      setClaimSuccess({ open: true, amount: claimedAmount });
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
              <h1 className="text-center font-inter text-[20px] font-semibold leading-[24px] tracking-[-0.2px] text-[#EBC17B]">
                Claim Referral Reward
              </h1>
            </div>
          </AnimationWrapper>

          {/* Claimable Referral Reward card */}
          <AnimationWrapper delay={0.15} className="mb-6">
            <div className="bg-black/50 rounded-[16px] px-6 pt-2.5 pb-4">
              <span className="text-xs mt-[4px] block ugold-text text-left">
                Claimable Referral Reward
              </span>
              <h2 className="gold-gradient-text text-right mb-[6px] font-inter text-[40px] font-semibold leading-[47px] tracking-[-1.25px]">
                <span className="text-[25px] leading-[40px]">$ </span>
                <AnimatedNumber value={claimableReward} decimals={2} />
              </h2>
              <div className="border-t-[0.5px] border-[#FFD185] pt-[7px]"></div>
              <div className="flex justify-end items-center">
                <p className="text-[16px] font-semibold ugold-text leading-[20px]">
                  <AnimatedNumber value={claimableOz} decimals={6} suffix=" oz" />
                </p>
              </div>
            </div>
          </AnimationWrapper>

          {/* Amount input with MAX button */}
          <AnimationWrapper delay={0.2} className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <p className="text-xs font-semibold text-[#EBC17B] ml-2.5">Claim Amount</p>
              <div className="flex items-center">
                <p className="text-xs text-[#EBC17B]">
                  / <span>$</span>
                  <AnimatedNumber value={claimableReward} decimals={2} />
                </p>
                <Button
                  className="ml-2 bg-[#EBC17B] text-black rounded-full text-xs px-6 py-2 h-[26px] font-semibold"
                  onPress={handleSetMax}
                  isDisabled={claimableReward <= 0}
                >
                  MAX
                </Button>
              </div>
            </div>

            <div className="flex rounded-full overflow-hidden">
              <div className="bg-[#D09635] text-white py-[15px] pl-5 pr-4 flex items-center justify-center text-[16px] font-semibold w-1/4 min-w-[110px]">
                USD
              </div>
              <input
                className="w-[80%] flex-1 bg-white text-[16px] text-black placeholder:text-[#787878] font-semibold py-[15px] pr-8 outline-none text-right"
                placeholder="Enter USD amount"
                value={claimAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                inputMode="decimal"
                disabled={isClaiming || claimableReward <= 0}
              />
            </div>
          </AnimationWrapper>

          {/* Breakdown list */}
          <AnimationWrapper delay={0.25} className="flex-1 min-h-0 mb-4">
            <p className="mx-2.5 text-[#EBC17B] font-inter text-[12px] font-semibold leading-[15px] tracking-[-0.12px] pb-[8px]">
              Breakdown
            </p>
            {breakdown.length === 0 ? (
              <div className="bg-black/50 rounded-[16px] p-4 text-center">
                <p className="text-[14px] text-[#c9c9c9]">No breakdown available</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-full overflow-y-auto hide-scrollbar pr-1">
                {breakdown.map((entry, idx) => (
                  <motion.div
                    key={`${entry.name}-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.05 * idx }}
                    className="bg-black/50 rounded-[16px] p-3 h-[64px]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#EBC17B] flex items-center justify-center mr-3">
                          <span className="text-black font-bold text-[12px]">{entry.rank}</span>
                        </div>
                        <div>
                          <h3 className="text-[17px] font-bold ugold-text leading-[21px]">
                            {entry.name}
                          </h3>
                          <p className="text-[13px] text-[#c9c9c9] leading-[16px]">
                            {entry.percent}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[17px] font-semibold text-[#FFD185] leading-[21px]">
                          $<AnimatedNumber value={entry.amount} decimals={2} />
                        </p>
                        <p className="text-[13px] font-semibold text-[#c9c9c9] leading-[16px]">
                          ≈ <AnimatedNumber value={entry.amount * REFERRAL_OZ_PER_USD} decimals={6} suffix=" oz" />
                        </p>
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
              className="gold-gradient w-full rounded-full h-[64px] text-[18px] font-semibold text-white mb-[82px] disabled:opacity-60"
              onPress={handleClaim}
              isLoading={isClaiming}
              isDisabled={isClaiming || claimableReward <= 0 || !isAmountValid}
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
                    You have successfully claimed ${claimSuccess.amount.toFixed(2)} in referral rewards.
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
