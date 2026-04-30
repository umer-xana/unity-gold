import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      <Card className="card-shadow">
        <CardBody className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-foreground-400 text-tiny">{title}</p>
              <h3 className="text-lg font-semibold mt-1">{value}</h3>
              
              {trend && (
                <div className="flex items-center mt-1">
                  <Icon
                    icon={
                      trend.isPositive
                        ? "lucide:trending-up"
                        : "lucide:trending-down"
                    }
                    className={
                      trend.isPositive ? "text-success" : "text-danger"
                    }
                    width={14}
                  />
                  <span
                    className={`text-tiny ml-1 ${
                      trend.isPositive ? "text-success" : "text-danger"
                    }`}
                  >
                    {trend.isPositive ? "+" : ""}
                    {trend.value}%
                  </span>
                </div>
              )}
            </div>
            
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-${color}-100`}
            >
              <Icon
                icon={icon}
                className={`text-${color}-500`}
                width={20}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};