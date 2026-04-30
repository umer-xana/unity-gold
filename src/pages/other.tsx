import React from "react";
import { Icon } from "@iconify/react";
import { BottomNavigation } from "../components/bottom-navigation";
import { CurrencyToggle } from "../components/currency-toggle";
import { InviteModal } from "../components/invite-modal";
import { LogoutModal } from "../components/logout-modal";
import { AnimationWrapper } from "../components/animation-wrapper";
import { motion } from "framer-motion";

interface MenuItemProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onClick }) => {
  return (
    <div 
      className="flex items-center justify-between py-[13px] px-5 bg-black/50 rounded-[22px] border-[0.5px] border-[#EBC17B]  mb-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <img
  src={icon}
  alt={label}
  className="w-[24px] h-[24px] mr-4"
 />

        <span className="text-xl ugold-text font-semibold">{label}</span>
      </div>
      <Icon icon="lucide:chevron-right" className="text-[#EBC17B]" width={18} />
    </div>
  );
};

interface OtherProps {
  onNavigate: (page: string) => void;
}

export const Other: React.FC<OtherProps> = ({ onNavigate }) => {
  const [showInviteModal, setShowInviteModal] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const handleMenuItemClick = (item: string) => {
    switch (item) {
      case "Profile":
        onNavigate("profile");
        break;
      case "History":
        onNavigate("history");
        break;
      case "Invite":
        setShowInviteModal(true);
        break;
      case "Language":
        onNavigate("language");
        break;
      case "Username":
        onNavigate("username");
        break;
      case "Log out":
        setShowLogoutModal(true);
        break;
      default:
        break;
    }
  };

  const menuItems = [
  {
    icon: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/History-other.svg",
    label: "History"
  },
  {
    icon: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/invite-other.svg",
    label: "Invite"
  },
  {
    icon: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/language-other.svg",
    label: "Language"
  }
];


  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div 
        className="relative mx-auto max-w-md min-h-screen overflow-hidden pb-0"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/mjoh996/images/images/unity-gold/envato-labs-image-edit 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 px-4 py-6 flex flex-col h-[100dvh] overflow-y-auto hide-scrollbar pb-[97px]">
          {/* Header */}
          <AnimationWrapper type="header">
            <div className="flex justify-center items-center mb-[22px]">
              <h1 className="text-center font-inter text-[20px] font-semibold leading-[24px] tracking-[-0.2px] text-[#EBC17B] ">Other</h1>
            </div>
          </AnimationWrapper>
          
          {/* Profile Section - Updated to username */}
          <AnimationWrapper delay={0.1}>
            <div className="mb-[54px]">
              <div 
                className="flex items-center justify-between py-3 px-4 bg-black/50 rounded-[22px] border-[0.5px] border-inner border-[#EBC17B] cursor-pointer"
                onClick={() => handleMenuItemClick("Profile")}
              >
                <div className="flex items-center">
                  <img 
                    src="https://img.heroui.chat/image/avatar?w=100&h=100&u=1" 
                    alt="Profile" 
                    className="w-14 h-14 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-xl text-[#EBC17B] font-semibold">username</h3>
                    <p className="text-sm text-[#c9c9c9] font-medium">john mail or username</p>
                  </div>
                </div>
                <Icon icon="lucide:chevron-right" className="text-[#EBC17B]" width={20} />
              </div>
            </div>
          </AnimationWrapper>
          
          {/* Menu Items - Updated to rounded-[30px] */}
          <AnimationWrapper delay={0.2}>
            <div className="space-y-4">
              {menuItems.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30, 
                    delay: 0.2 + (index * 0.1) 
                  }}
                  className="flex items-center justify-between py-[15px] pl-5 pr-3 bg-black/50 rounded-[30px] shadow-[inset_0_0_0_0.5px_#EBC17B] cursor-pointer"
                  onClick={() => handleMenuItemClick(item.label)}
                >
                  <div className="flex items-center">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-[24px] h-[24px] mr-4"
                    />
                    <span className="text-[15px] ugold-text font-semibold">{item.label}</span>
                  </div>
                  <Icon icon="lucide:chevron-right" className="text-[#EBC17B]" width={18} />
                </motion.div>
              ))}
            </div>
          </AnimationWrapper>
          
          {/* Separate Logout Button */}
          <div className="mt-auto mb-6">
          <AnimationWrapper type="button" delay={0.3 + (menuItems.length * 0.1)}>
            
              <div 
                className="flex items-center justify-between py-[15px] pl-5 pr-3 bg-black/50 rounded-[30px] shadow-[inset_0_0_0_0.5px_#EBC17B] cursor-pointer"
                onClick={() => handleMenuItemClick("Log out")}
              >
                <div className="flex items-center">
                  <img
                    src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/logout-other.svg"
                    alt="Log out"
                    className="w-[24px] h-[24px] mr-4"
                  />
                  <span className="text-[15px] ugold-text font-semibold">Log out</span>
                </div>
                <Icon icon="lucide:chevron-right" className="text-[#EBC17B]" width={18} />
              </div>
            
            
          </AnimationWrapper>
            </div>
        </div>
        
        {/* Modals */}
        {showInviteModal && <InviteModal onClose={() => setShowInviteModal(false)} />}
        {showLogoutModal && <LogoutModal 
          onClose={() => setShowLogoutModal(false)} 
          onLogout={() => console.log("Logout")} 
        />}
        
        {/* Bottom Navigation */}
        <AnimationWrapper type="navbar" delay={0.5}>
          <BottomNavigation activeTab="other" onTabChange={onNavigate} />
        </AnimationWrapper>
      </div>
    </div>
  );
};