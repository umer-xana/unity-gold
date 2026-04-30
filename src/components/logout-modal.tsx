import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

interface LogoutModalProps {
  onClose: () => void;
  onLogout: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ onClose, onLogout }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" 
        onClick={onClose}
      ></motion.div>
      
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-[#000]/10 backdrop-blur-[20px] w-full max-w-md rounded-t-[20px] px-6 pt-[40px] pb-8 z-10"
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 h-6 w-6"
          onClick={onClose}
        >
          <img
              src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/cross-icon-ug-img.png"
              alt="cross-ic"
              className="w-[24px] h-[24px]"
              />
        </button>
        
        {/* Modal content */}
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-[20px] leading-[24px] font-semibold text-[#EBC17B] mb-[20px] text-center"
        >
          Logout
        </motion.h2>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[18px] text-[#c9c9c9] text-center font-medium mb-[60px] leading-[22px]"
        >
          Are you sure you want to logout?
        </motion.p>
        
        {/* Red circular icon */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20, 
            delay: 0.3 
          }}
          className="flex justify-center h-[76px] mb-[62px]"
        >
          <div className="w-[76px] h-[76px] rounded-full flex items-center justify-center">
            <img
              src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/logouticon-ugg.svg"
              alt="logout-big"
              className="w-[76px] h-[76px]"
              />
          </div>
        </motion.div>
        
        {/* Single red logout button */}
        <motion.button 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#FF0800] text-lg text-white font-semibold py-4.5 px-4 rounded-full flex items-center justify-center"
          onClick={onLogout}
        >
          <img
              src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/logout-modal.svg"
              alt="log-out-ic"
              className="w-[24px] h-[24px] mr-2"
              />
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
};