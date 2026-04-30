import React from "react";
import { Input, Button, Card, CardBody, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { TeamMemberCard } from "../components/team-member-card";
import { motion } from "framer-motion";

export const Network: React.FC = () => {
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
      {/* Network Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-4">
          <CardBody className="p-4">
            <h2 className="text-lg font-semibold mb-3">Your Network</h2>
            <div className="flex justify-between mb-4">
              <div className="text-center">
                <p className="text-foreground-400 text-tiny">Total Members</p>
                <p className="text-lg font-semibold">24</p>
              </div>
              <div className="text-center">
                <p className="text-foreground-400 text-tiny">Active Members</p>
                <p className="text-lg font-semibold">18</p>
              </div>
              <div className="text-center">
                <p className="text-foreground-400 text-tiny">Levels</p>
                <p className="text-lg font-semibold">3</p>
              </div>
            </div>
            
            {/* Network Visualization */}
            <div className="flex flex-col items-center mb-3">
              <Avatar
                src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
                className="mb-2 border-2 border-primary"
                size="lg"
              />
              <p className="text-small font-semibold">You</p>
              
              <div className="w-px h-6 bg-divider my-2"></div>
              
              <div className="flex justify-center w-full">
                <div className="flex space-x-4">
                  <div className="flex flex-col items-center">
                    <Avatar
                      src="https://img.heroui.chat/image/avatar?w=200&h=200&u=2"
                      className="border-2 border-success"
                      size="md"
                    />
                    <p className="text-tiny mt-1">Level 1</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Avatar
                      src="https://img.heroui.chat/image/avatar?w=200&h=200&u=3"
                      className="border-2 border-success"
                      size="md"
                    />
                    <p className="text-tiny mt-1">Level 1</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Avatar
                      src="https://img.heroui.chat/image/avatar?w=200&h=200&u=4"
                      className="border-2 border-success"
                      size="md"
                    />
                    <p className="text-tiny mt-1">Level 1</p>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Search and Filter */}
      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="Search members..."
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

      {/* Team Members List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-4"
      >
        <h3 className="text-medium font-semibold mb-3">Team Members</h3>
        
        <motion.div variants={itemVariants}>
          <TeamMemberCard
            name="Emma Johnson"
            level="Gold Partner"
            joinDate="Jan 15, 2023"
            sales="$3,245"
            avatarSrc="https://img.heroui.chat/image/avatar?w=200&h=200&u=5"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <TeamMemberCard
            name="Michael Chen"
            level="Silver Partner"
            joinDate="Mar 22, 2023"
            sales="$1,850"
            avatarSrc="https://img.heroui.chat/image/avatar?w=200&h=200&u=6"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <TeamMemberCard
            name="Sophia Rodriguez"
            level="Bronze Partner"
            joinDate="May 10, 2023"
            sales="$950"
            avatarSrc="https://img.heroui.chat/image/avatar?w=200&h=200&u=7"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <TeamMemberCard
            name="David Kim"
            level="Bronze Partner"
            joinDate="Jun 5, 2023"
            sales="$780"
            avatarSrc="https://img.heroui.chat/image/avatar?w=200&h=200&u=8"
          />
        </motion.div>
      </motion.div>

      {/* Add Member Button */}
      <div className="fixed bottom-20 right-4">
        <Button
          color="primary"
          className="rounded-full shadow-lg"
          startContent={<Icon icon="lucide:user-plus" width={18} />}
        >
          Add Member
        </Button>
      </div>
    </div>
  );
};