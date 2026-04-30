import React from "react";
import { Icon } from "@iconify/react";
import { Badge, Button } from "@heroui/react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-background border-b border-divider">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center">
          <div className="flex items-center gold-gradient text-black font-bold text-xl px-3 py-1 rounded-medium">
            UGOLD
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            variant="light"
            aria-label="Search"
            className="text-foreground"
          >
            <Icon icon="lucide:search" width={20} />
          </Button>
          
          <Badge content="3" color="primary" shape="circle">
            <Button
              isIconOnly
              variant="light"
              aria-label="Notifications"
              className="text-foreground"
            >
              <Icon icon="lucide:bell" width={20} />
            </Button>
          </Badge>
        </div>
      </div>
    </header>
  );
};