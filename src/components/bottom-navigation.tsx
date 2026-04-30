import React from "react";
import { motion } from "framer-motion";

interface NavItemProps {
  activeIcon: string;
  inactiveIcon: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ activeIcon, inactiveIcon, label, isActive = false, onClick }) => {
  return (
    <div className="flex flex-col items-center gap-[6px] cursor-pointer" onClick={onClick}>
      <img 
        src={isActive ? activeIcon : inactiveIcon} 
        alt={`${label} icon`}
        className="w-[22px] h-[22px]"
      />
      <span className={`text-[13px] font-medium leading-[16px] mt-0 ${isActive ? 'text-[#FFD185]' : 'text-[#8984A4]'}`}>
        {label}
      </span>
    </div>
  );
};

export const BottomNavigation: React.FC<{ 
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}> = ({ 
  activeTab = "home",
  onTabChange = () => {} 
}) => {
  return (
    <div className="fixed bottom-[16px] left-0 right-0 px-[10px] z-30 mx-auto max-w-md">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30 
        }}
        className="w-full h-[80px] rounded-[30px] bg-black/80 shadow-[0_-3px_4px_rgba(0,0,0,0.03)] px-6 py-3 mx-auto grid items-center"
      >
        <div className="flex justify-between items-center">
          <NavItem 
            activeIcon="https://ik.imagekit.io/mjoh996/images/images/unity-gold/home-ug-ac.svg"
            inactiveIcon="https://ik.imagekit.io/mjoh996/images/images/unity-gold/home-ug-un.svg"
            label="Home" 
            isActive={activeTab === "home"} 
            onClick={() => onTabChange("home")}
          />
          <NavItem 
            activeIcon="https://ik.imagekit.io/mjoh996/images/images/unity-gold/swap-ug-ac.svg"
            inactiveIcon="https://ik.imagekit.io/mjoh996/images/images/unity-gold/swap-ug-un.svg"
            label="Swap" 
            isActive={activeTab === "swap"} 
            onClick={() => onTabChange("swap")}
          />
          <NavItem 
            activeIcon="https://ik.imagekit.io/mjoh996/images/images/unity-gold/stake-ug-ac.svg"
            inactiveIcon="https://ik.imagekit.io/mjoh996/images/images/unity-gold/stake-ug-un.svg"
            label="Stake" 
            isActive={activeTab === "stake"} 
            onClick={() => onTabChange("stake")}
          />
          <NavItem 
            activeIcon="https://ik.imagekit.io/mjoh996/images/images/unity-gold/wallet-ug-ac.svg"
            inactiveIcon="https://ik.imagekit.io/mjoh996/images/images/unity-gold/wallet-ug-un.svg"
            label="Wallet" 
            isActive={activeTab === "wallet"} 
            onClick={() => onTabChange("wallet")}
          />
          <NavItem 
            activeIcon="https://ik.imagekit.io/mjoh996/images/images/unity-gold/others-ug-ac.svg"
            inactiveIcon="https://ik.imagekit.io/mjoh996/images/images/unity-gold/others-ug-un.svg"
            label="Other" 
            isActive={activeTab === "other"} 
            onClick={() => onTabChange("other")}
          />
        </div>
      </motion.div>
    </div>
  );
};