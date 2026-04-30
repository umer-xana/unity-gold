import React from "react";
import { Card, CardBody, Avatar, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface TeamMemberCardProps {
  name: string;
  level: string;
  joinDate: string;
  sales: string;
  avatarSrc: string;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  level,
  joinDate,
  sales,
  avatarSrc,
}) => {
  return (
    <Card className="card-shadow mb-3">
      <CardBody className="p-4">
        <div className="flex items-center">
          <Avatar
            src={avatarSrc}
            className="mr-3"
            size="lg"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{name}</h4>
                <p className="text-foreground-400 text-tiny">{level}</p>
              </div>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                aria-label="More options"
              >
                <Icon icon="lucide:more-vertical" width={16} />
              </Button>
            </div>
            <div className="flex justify-between mt-2 text-tiny text-foreground-500">
              <div className="flex items-center">
                <Icon icon="lucide:calendar" width={14} className="mr-1" />
                <span>Joined: {joinDate}</span>
              </div>
              <div className="flex items-center">
                <Icon icon="lucide:shopping-cart" width={14} className="mr-1" />
                <span>Sales: {sales}</span>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};