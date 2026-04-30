import React from "react";
import { Icon } from "@iconify/react";
import { Toast, ToastProps } from "@heroui/react";

interface CustomToastProps extends Partial<ToastProps> {
  message: string;
}

export const CustomToast: React.FC<CustomToastProps> = ({ message, ...props }) => {
  return (
    <Toast 
      classNames={{
        base: "bg-black/70 backdrop-blur-md border border-[#EBC17B]/30 text-[#EBC17B]",
      }}
      startContent={<Icon icon="lucide:check-circle" width={20} />}
      {...props}
    >
      {message}
    </Toast>
  );
};