import React from "react";
import { Icon } from "@iconify/react";
import { AnimationWrapper } from "../components/animation-wrapper";
import { motion } from "framer-motion";

interface HistoryPageProps {
  onBack: () => void;
}

interface TransactionProps {
  date: string;
  action: string;
  token: string;
  amount: string;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onBack }) => {
  const transactions: TransactionProps[] = [
    { date: "2026-01-02 12:05", action: "Send", token: "UGOLD", amount: "-99,999,999.99" },
    { date: "2026-01-02 12:05", action: "Receive", token: "UGOLD", amount: "+99,999,999.99" },
    { date: "2026-01-02 12:05", action: "Claim", token: "USDT", amount: "-10.00" },
    { date: "2026-01-02 12:05", action: "Stake", token: "UGOLD", amount: "+10.00" },
    { date: "2026-01-02 12:05", action: "Swap", token: "USDT", amount: "-25.50" },
    { date: "2026-01-02 12:05", action: "Buy", token: "UGOLD", amount: "+250.00" },
    { date: "2026-01-02 12:05", action: "Send", token: "USDT", amount: "-75.00" },
    { date: "2026-01-02 12:05", action: "Receive", token: "UGOLD", amount: "+125.00" },
    { date: "2026-01-02 12:05", action: "Claim", token: "USDT", amount: "+30.00" },
  ];

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div
        className="relative mx-auto max-w-md min-h-screen overflow-hidden pb-20"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/mjoh996/images/images/unity-gold/envato-labs-image-edit 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 px-4 py-6">
          {/* Header with back button - Now with animation */}
          <AnimationWrapper type="header">
            <div className="flex items-center justify-center mb-[24px]">
              <div
                className="w-9 h-9 rounded-full bg-black/50 border-[0.5px] border-[#EBC17B] flex items-center justify-center mr-4 cursor-pointer absolute left-4"
                onClick={onBack}
              >
                <img
                  src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/back-left.svg"
                  alt="Back"
                  className="w-[20px] h-[20px]"
                />
              </div>
              <h1 className="text-center font-inter text-[20px] font-semibold leading-[24px] tracking-[-0.2px] text-[#EBC17B]">
                History
              </h1>
            </div>
          </AnimationWrapper>

          {/* Transaction Table Header with animation */}
          <AnimationWrapper delay={0.1}>
            <div className="flex justify-between mb-2.5 px-2 gap-2">
              <span className="text-xs text-[#EBC17B] font-normal w-[33%]">Date</span>
              <span className="text-xs text-[#EBC17B] font-normal w-[16%]">Action</span>
              <span className="text-xs text-[#EBC17B] font-normal w-[17%]">Token</span>
              <span className="text-xs text-[#EBC17B] font-normal w-[34%] text-right">Amount</span>
            </div>
          </AnimationWrapper>

          {/* Transaction List with staggered animation */}
          <AnimationWrapper delay={0.2}>
            <div className="bg-black/50 rounded-[16px] overflow-hidden max-h-[calc(100vh-150px)] pt-2 pb-4 overflow-y-auto">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: 0.2 + index * 0.08,
                  }}
                  className="flex justify-between items-center pt-0 pb-0 px-2 gap-2"
                >
                  <span className="text-[#EBC17B] text-[13px] font-medium tracking-[-0.65px] leading-[31px] w-[33%] whitespace-nowrap">
                    {transaction.date}
                  </span>
                  <span className="text-[#EBC17B] text-[13px] font-medium tracking-[-0.65px] leading-[31px] w-[16%]">
                    {transaction.action}
                  </span>
                  <span className="text-[#EBC17B] text-[13px] font-medium tracking-[-0.65px] leading-[31px] w-[17%]">
                    {transaction.token}
                  </span>
                  <span className="text-[#ffffff] text-[15px] font-semibold tracking-[-0.65px] leading-[31px] w-[34%] text-right whitespace-nowrap">
                    {transaction.amount}
                  </span>
                </motion.div>
              ))}
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </div>
  );
};