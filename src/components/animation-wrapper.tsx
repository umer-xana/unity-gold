import React from "react";
import { motion } from "framer-motion";

interface AnimationWrapperProps {
  children: React.ReactNode;
  delay?: number;
  type?: "header" | "content" | "button" | "navbar";
  className?: string;
}

export const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  delay = 0,
  type = "content",
  className = ""
}) => {
  const variants = {
    header: {
      hidden: { y: -50, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 30, 
          delay 
        }
      }
    },
    content: {
      hidden: { y: 20, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 30, 
          delay 
        }
      }
    },
    button: {
      hidden: { y: 30, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 30, 
          delay 
        }
      }
    },
    navbar: {
      hidden: { scale: 0.95, opacity: 0 },
      visible: { 
        scale: 1, 
        opacity: 1,
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 30, 
          delay 
        }
      }
    }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants[type]}
      className={className}
    >
      {children}
    </motion.div>
  );
};