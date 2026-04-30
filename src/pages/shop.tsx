import React from "react";
import { Input, Button, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ProductCard } from "../components/product-card";
import { motion } from "framer-motion";

export const Shop: React.FC = () => {
  const [selected, setSelected] = React.useState("all");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-4 pb-20">
      {/* Search */}
      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="Search products..."
          startContent={<Icon icon="lucide:search" className="text-foreground-400" width={16} />}
          className="flex-1"
        />
        <Button
          isIconOnly
          variant="flat"
          aria-label="Filter"
        >
          <Icon icon="lucide:filter" width={18} />
        </Button>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <Tabs
          selectedKey={selected}
          onSelectionChange={setSelected as any}
          variant="light"
          size="sm"
          className="w-full"
        >
          <Tab key="all" title="All" />
          <Tab key="popular" title="Popular" />
          <Tab key="new" title="New" />
          <Tab key="bestseller" title="Bestseller" />
        </Tabs>
      </div>

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-3 mb-4"
      >
        <motion.div variants={itemVariants}>
          <ProductCard
            name="UGOLD Premium Package"
            price="$499.99"
            commission="$100.00"
            imageSrc="https://img.heroui.chat/image/ai?w=400&h=300&u=1"
            isNew={true}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ProductCard
            name="Gold Investment Kit"
            price="$299.99"
            commission="$60.00"
            imageSrc="https://img.heroui.chat/image/ai?w=400&h=300&u=2"
            isBestseller={true}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ProductCard
            name="Starter Business Pack"
            price="$149.99"
            commission="$30.00"
            imageSrc="https://img.heroui.chat/image/ai?w=400&h=300&u=3"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ProductCard
            name="Digital Marketing Tools"
            price="$89.99"
            commission="$18.00"
            imageSrc="https://img.heroui.chat/image/ai?w=400&h=300&u=4"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ProductCard
            name="Team Building Course"
            price="$129.99"
            commission="$26.00"
            imageSrc="https://img.heroui.chat/image/ai?w=400&h=300&u=5"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ProductCard
            name="Leadership Training"
            price="$199.99"
            commission="$40.00"
            imageSrc="https://img.heroui.chat/image/ai?w=400&h=300&u=6"
            isNew={true}
          />
        </motion.div>
      </motion.div>

      {/* Cart Button */}
      <div className="fixed bottom-20 right-4">
        <Button
          color="primary"
          className="rounded-full shadow-lg"
          startContent={<Icon icon="lucide:shopping-cart" width={18} />}
        >
          View Cart (3)
        </Button>
      </div>
    </div>
  );
};