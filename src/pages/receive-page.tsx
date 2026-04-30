import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { CurrencyToggle } from "../components/currency-toggle";
import { BottomNavigation } from "../components/bottom-navigation";
import { AnimationWrapper } from "../components/animation-wrapper";

interface ReceivePageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export const ReceivePage: React.FC<ReceivePageProps> = ({ onBack, onNavigate }) => {
  const walletAddress = "0x74146f2bf264c79bd098421b1539c70ce008b355";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    // Could add a toast notification here
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
        
        <div className="relative z-10 px-4 pt-[19px] flex flex-col h-[100dvh] overflow-y-auto hide-scrollbar pb-[97px]">
          {/* Header with back button */}
          <AnimationWrapper type="header">
            <div className="flex items-center justify-between mb-[52px]">
              <Button
                isIconOnly
                variant="light"
                className="bg-black/50 rounded-full w-9 h-9 min-w-9 p-0 border-[0.5px] border-[#EBC17B]"
                onPress={onBack}
              >
                
                <img
                src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/back-left.svg"
                alt="back-ic"
                className="w-[20px] h-[20px]"
                />
              </Button>
              <h1 className="text-center font-inter text-[20px] font-semibold leading-[24px] tracking-[-0.2px] text-[#EBC17B]">
                Receive
              </h1>
              <CurrencyToggle />
            </div>
          </AnimationWrapper>
          
          {/* QR Code Container */}
          <AnimationWrapper delay={0.1}>
            <div className="bg-black/50 rounded-[30px] p-9 mb-4 flex flex-col items-center mx-6">
              {/* QR Code */}
              <div className="bg-white p-0 rounded-md mb-[20px]">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=0x74146f2bf264c79bd098421b1539c70ce008b355" 
                  alt="QR Code"
                  className="w-[125px] h-[125px]"
                />
              </div>
              
              {/* Wallet Address */}
              <p className="text-[#C9C9C9] text-sm leading-[17px] font-medium mb-[20px] max-w-[180px] break-all text-center">
                {walletAddress}
              </p>
              
              {/* Copy Button */}
              <button 
                className="flex items-center text-[#EBC17B] font-bold text-[15px] leading-[18px]"
                onClick={handleCopy}
              >
                <img
                src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/copy-ug1.svg"
                alt="copy-ic"
                className="w-[20px] h-[20px] mr-[7px]"
                />
                
                Copy
              </button>
            </div>
          </AnimationWrapper>
          
          {/* Instructions */}
          <AnimationWrapper delay={0.2}>
            <p className="text-center text-[#c9c9c9] text-xs leading-[15px] mb-10 px-4" >
              * This address only accepts USDT and UGOLD on the Base chain. To prevent loss of funds, do not send any other tokens to this address.
            </p>
          </AnimationWrapper>
          
          {/* Receive Button */}
          <div className="mt-auto mb-6">
            <AnimationWrapper type="button" delay={0.3}>
              <Button
                className="w-full gold-gradient rounded-full h-[64px] font-semibold text-white text-lg"
                startContent={
                <img
              src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/receiveicon.svg"
              alt="receive-ic"
              className="w-[24px] h-[24px]"
              />  
                
                }
              >
                Receive
              </Button>
            </AnimationWrapper>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        {/* <AnimationWrapper type="navbar" delay={0.4}>
          <BottomNavigation activeTab="wallet" onTabChange={onNavigate} />
        </AnimationWrapper> */}
      </div>
    </div>
  );
};