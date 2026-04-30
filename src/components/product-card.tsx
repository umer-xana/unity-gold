import React from "react";
import { Card, CardBody, Button, Badge } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface ProductCardProps {
  name: string;
  price: string;
  commission: string;
  imageSrc: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  commission,
  imageSrc,
  isNew = false,
  isBestseller = false,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      <Card className="card-shadow overflow-visible">
        <CardBody className="p-0 overflow-visible">
          <div className="relative">
            <img
              src={imageSrc}
              alt={name}
              className="w-full h-40 object-cover rounded-t-medium"
            />
            {isNew && (
              <Badge
                content="NEW"
                color="primary"
                className="absolute top-2 left-2"
              />
            )}
            {isBestseller && (
              <Badge
                content="BESTSELLER"
                color="warning"
                className="absolute top-2 left-2"
              />
            )}
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-medium">{name}</h3>
            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="text-foreground-900 font-semibold">{price}</p>
                <p className="text-tiny text-foreground-400">
                  Commission: {commission}
                </p>
              </div>
              <Button
                isIconOnly
                color="primary"
                aria-label="Add to cart"
                size="sm"
                className="rounded-full"
              >
                <Icon icon="lucide:plus" width={16} />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};