import React from "react";
import { Icon } from "@iconify/react";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, Button } from "@heroui/react";

interface TransferFailedModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onRetry: () => void;
}

export const TransferFailedModal: React.FC<TransferFailedModalProps> = ({
  isOpen,
  onOpenChange,
  onRetry
}) => {
  return (
    <Drawer 
      isOpen={isOpen} 
      onOpenChange={onOpenChange} 
      placement="bottom"
      classNames={{
        wrapper: "w-full max-w-md mx-auto",
        base: "rounded-t-[35px] bg-black/60 backdrop-blur-[20px] max-w-md mx-auto",
        content: "rounded-t-[35px] max-w-md mx-auto",
        backdrop: "!backdrop-opacity-100 bg-black/30 backdrop-blur-[3px]",
      }}
      hideCloseButton={true}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="text-[20px] pt-[40px] pb-[24px] font-semibold leading-[24px] flex justify-center border-b-0">
              <h2 className="text-[20px] leading-[24px] font-semibold text-[#EBC17B]">Transfer Failed</h2>
              <Button 
                isIconOnly 
                variant="light" 
                className="absolute right-4 top-3" 
                onPress={onClose}
              > 
                <img
              src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/cross-icon-ug-img.png"
              alt="cross-ic"
              className="w-[24px] h-[24px]"
              />
               
              </Button>
            </DrawerHeader>
            <DrawerBody className="text-center gap-0 pb-6 py-0 pb-[32px]">
              <p className="text-center text-[14px] font-medium leading-[17px] mb-[44px] max-w-[292px] mx-auto text-[#C9C9C9]">
                The transaction could not be completed.<br />
                No funds were deducted.
              </p>
              
              {/* Failed X icon */}
              <div className="flex justify-center mb-[64px]">
                <div className="w-[74px] h-[74px] rounded-full flex items-center justify-center">
                  <img
            src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/ug-fail.svg"
            alt="verify-ic"
            className="w-[74px] h-[74px]" 
          />
                 
                </div>
              </div>
              
              <Button
                fullWidth
                className="gold-gradient rounded-full h-[64px] text-[18px] font-semibold text-white"
                onPress={() => {
                  onRetry();
                  onClose();
                }}
              >
                Retry
              </Button>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};