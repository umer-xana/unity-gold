import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/language-context";

type Step = {
  id: number;
  title: string;
  subtitle: string;
  component?: React.ReactNode;
};

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const { t, language } = useLanguage();

  const steps: Step[] = [
    {
      id: 1,
      title: t("loginSignUp"),
      subtitle: t("loginSignUpSubtitle"),
      component: (
        <div className="flex w-full flex-col gap-5">
          <Button
            className="flex h-15 w-full items-center justify-center rounded-full bg-white py-3 text-[18px] font-semibold leading-[25px] text-black"
            startContent={
              <Icon icon="logos:google-icon" className="mr-2 h-5 w-5" />
            }
            onPress={() => handleNext()}
          >
            {t("continueWithGoogle")}
          </Button>

          <Button
            className="gold-gradient flex h-15 w-full items-center justify-center rounded-full py-3 text-[18px] font-semibold leading-[25px] text-white"
            startContent={
              <Icon icon="lucide:mail" className="mr-2 h-5 w-5" />
            }
            onPress={() => handleNext()}
          >
            {t("continueWithEmail")}
          </Button>
        </div>
      ),
    },
    {
      id: 2,
      title: t("trackGoldValue"),
      subtitle: t("trackGoldValueSubtitle"),
    },
    {
      id: 3,
      title: t("instantSwap"),
      subtitle: t("instantSwapSubtitle"),
    },
    {
      id: 4,
      title: t("stakeEarn"),
      subtitle: t("stakeEarnSubtitle"),
    },
    {
      id: 5,
      title: t("claimRewards"),
      subtitle: t("claimRewardsSubtitle"),
    },
    {
      id: 6,
      title: t("ugoldWallet"),
      subtitle: t("ugoldWalletSubtitle"),
    },
    {
      id: 7,
      title: t("manageProfile"),
      subtitle: t("manageProfileSubtitle"),
    },
    {
      id: 8,
      title: t("transactionHistory"),
      subtitle: t("transactionHistorySubtitle"),
    },
    {
      id: 9,
      title: t("inviteEarn"),
      subtitle: t("inviteEarnSubtitle"),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("onboardingCompleted", "true");
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepImages = () => {
  const baseUrl = "https://ik.imagekit.io/mjoh996/images/images/unity-gold/";
  const suffix = language === "ja" ? "-jp" : "";

  const images = [
    `${baseUrl}ug${suffix}-step1.png`,
    `${baseUrl}ug${suffix}-step2.png`,
    `${baseUrl}ug${suffix}-step3.png`,
    `${baseUrl}ug${suffix}-step4.png`,
    `${baseUrl}ug${suffix}-step5.png`,
    `${baseUrl}ug${suffix}-step6.png`,
    `${baseUrl}ug${suffix}-step7.png`,
    `${baseUrl}ug${suffix}-step8.png`,
    `${baseUrl}ug${suffix}-step9.png`,
  ];

  // ✅ Step 1 → SAME image for BOTH EN + JP
  images[0] = `${baseUrl}ug-step1-1.png`;

  // ✅ Step 8 → ONLY change for EN
  if (language === "en") {
    images[7] = `${baseUrl}ug-step8-1.png`;
  }

  return images;
};

  const stepImages = getStepImages();
  const currentStepData = steps[currentStep];
  const showBackButton = currentStep !== 0;

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div
        className="relative mx-auto min-h-screen max-w-md overflow-hidden"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/mjoh996/images/images/unity-gold/envato-labs-image-edit 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex h-[100dvh] flex-col overflow-y-auto px-[30px] pt-[24px] pb-[36px] hide-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentStep}`}
              className={`mx-auto mb-[28px] w-full max-w-[262px] overflow-hidden rounded-[28px] bg-transparent aspect-[131/170] min-h-[340px] ${
                currentStep !== 0 ? "shadow-md" : ""
              }`}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={stepImages[currentStep]}
                alt={`Step ${currentStep + 1} Image`}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-1 flex-col px-[10px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentStep}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h1
                  className="mb-2 whitespace-nowrap text-[28px] font-medium leading-[39px] text-[#fff]"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {currentStepData.title}
                </motion.h1>

                <motion.p
                  className="mb-[22px] min-h-[50px] whitespace-normal break-words text-[21px] font-medium leading-[25px] tracking-[-0.42px] text-[#c1c1c1]"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {currentStepData.subtitle}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            className="mt-auto flex w-full flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              opacity: { duration: 1, ease: "easeIn", delay: 0.5 },
            }}
          >
            {currentStepData.component && currentStepData.component}

            <div className="mt-0 flex w-full items-center justify-between">
              {showBackButton ? (
                <Button
                  variant="light"
                  color="default"
                  onPress={handleBack}
                  className="text-[18px] font-semibold leading-[25px] text-[#c1c1c1]"
                  startContent={
                    <Icon
                      icon="lucide:chevron-left"
                      strokeWidth={2.5}
                      className="text-[#c1c1c1]"
                    />
                  }
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep !== 0 && (
                <Button
                  onPress={handleNext}
                  className="gold-gradient h-15 gap-1 rounded-full px-12 py-2 text-[18px] font-semibold leading-[25px] text-white"
                  endContent={
                    <Icon
                      icon="lucide:chevron-right"
                      className="ml-0"
                      strokeWidth={2.5}
                    />
                  }
                >
                  {t("next")}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};