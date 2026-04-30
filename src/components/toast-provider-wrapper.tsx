import React from "react";
import { ToastProvider } from "@heroui/react";

interface ToastProviderWrapperProps {
  children: React.ReactNode;
}

export const ToastProviderWrapper: React.FC<ToastProviderWrapperProps> = ({ children }) => {
  return (
    <ToastProvider 
      placement="top-center"
      toastOffset={20}
      maxVisibleToasts={3}
    >
      {children}
    </ToastProvider>
  );
};