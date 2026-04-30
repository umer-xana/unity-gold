import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

interface InviteModalProps {
  onClose: () => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({ onClose }) => {
  const inviteCode = "0xwjewewq876sg";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    // Could add a toast notification here
  };
  
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
        className="relative bg-[#000]/10 backdrop-blur-[20px] w-full max-w-md rounded-t-[20px] px-6 pt-[40px] pb-[74px] z-10"
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
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
          className="text-[20px] leading-[24px] font-semibold text-[#EBC17B] mb-[50px] text-center"
        >
          Refer a Friend
        </motion.h2>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-[44px]"
        >
          <p className="text-[#EBC17B] mb-[12px] text-xs font-normal leading-[15px]">Invite Link</p>
          <div className="flex overflow-hidden rounded-full">
            <div className="bg-white text-lg text-[#787878] font-semibold py-4 px-5 flex-1 truncate">
              {inviteCode}
            </div>
            <button 
              className="bg-[#D09635] text-[18px] h-[64px] text-white font-semibold py-3 px-5 flex items-center"
              onClick={handleCopy}
            >
              <img
  src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/copy-ug.svg"
  alt="Copy-ic"
  className="w-[20px] h-[20px] mr-1.5"
/>
              COPY
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-0"
        >
          <p className="text-sm leading-[16px] text-medium mb-4 text-[#EBC17B]">Share invite link via</p>
          <div className="flex justify-center space-x-8">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center"
            >
              <img
              src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/whatsapp-img.svg"
              alt="whatsapp-ic"
              className="w-[44px] h-[44px]"
              />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center"
            >
              <img
              src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/google-img.svg"
              alt="google-ic"
              className="w-[44px] h-[44px]"
              />
              
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center"
            >
              <img
              src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/mail-img.svg"
              alt="mail-ic"
              className="w-[44px] h-[44px]"
              />
              
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};