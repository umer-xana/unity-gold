import React from "react";
import { Button, Card, CardBody, Avatar, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export const Profile: React.FC = () => {
  return (
    <div className="p-4 pb-20">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center mb-6"
      >
        <div className="relative mb-2">
          <Avatar
            src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
            className="w-24 h-24"
            isBordered
            color="primary"
          />
          <Button
            isIconOnly
            size="sm"
            className="absolute bottom-0 right-0 rounded-full"
            color="primary"
          >
            <Icon icon="lucide:camera" width={16} />
          </Button>
        </div>
        <h2 className="text-xl font-semibold">Sarah Johnson</h2>
        <p className="text-foreground-400 text-small">Gold Member</p>
        <div className="flex items-center mt-1">
          <Icon icon="lucide:map-pin" width={14} className="text-foreground-400 mr-1" />
          <span className="text-foreground-400 text-tiny">New York, USA</span>
        </div>
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            color="primary"
            startContent={<Icon icon="lucide:edit" width={16} />}
          >
            Edit Profile
          </Button>
          <Button
            size="sm"
            variant="flat"
            startContent={<Icon icon="lucide:settings" width={16} />}
          >
            Settings
          </Button>
        </div>
      </motion.div>

      {/* Membership Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="mb-4">
          <CardBody className="p-4">
            <h3 className="text-medium font-semibold mb-3">Membership Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-foreground-400">Member ID</p>
                <p className="font-semibold">UG78542196</p>
              </div>
              <div className="flex justify-between">
                <p className="text-foreground-400">Rank</p>
                <p className="font-semibold">Executive</p>
              </div>
              <div className="flex justify-between">
                <p className="text-foreground-400">Join Date</p>
                <p className="font-semibold">Jan 15, 2023</p>
              </div>
              <div className="flex justify-between">
                <p className="text-foreground-400">Sponsor</p>
                <p className="font-semibold">Robert Williams</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Account Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="mb-4">
          <CardBody className="p-4">
            <h3 className="text-medium font-semibold mb-3">Account Settings</h3>
            
            <div className="space-y-4">
              <Button
                variant="flat"
                className="w-full justify-start"
                startContent={<Icon icon="lucide:user" width={18} />}
                endContent={<Icon icon="lucide:chevron-right" width={16} />}
              >
                Personal Information
              </Button>
              
              <Button
                variant="flat"
                className="w-full justify-start"
                startContent={<Icon icon="lucide:credit-card" width={18} />}
                endContent={<Icon icon="lucide:chevron-right" width={16} />}
              >
                Payment Methods
              </Button>
              
              <Button
                variant="flat"
                className="w-full justify-start"
                startContent={<Icon icon="lucide:shield" width={18} />}
                endContent={<Icon icon="lucide:chevron-right" width={16} />}
              >
                Security
              </Button>
              
              <Button
                variant="flat"
                className="w-full justify-start"
                startContent={<Icon icon="lucide:bell" width={18} />}
                endContent={<Icon icon="lucide:chevron-right" width={16} />}
              >
                Notifications
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="mb-4">
          <CardBody className="p-4">
            <h3 className="text-medium font-semibold mb-3">Support</h3>
            
            <div className="space-y-4">
              <Button
                variant="flat"
                className="w-full justify-start"
                startContent={<Icon icon="lucide:help-circle" width={18} />}
                endContent={<Icon icon="lucide:chevron-right" width={16} />}
              >
                Help Center
              </Button>
              
              <Button
                variant="flat"
                className="w-full justify-start"
                startContent={<Icon icon="lucide:message-circle" width={18} />}
                endContent={<Icon icon="lucide:chevron-right" width={16} />}
              >
                Contact Support
              </Button>
              
              <Button
                variant="flat"
                className="w-full justify-start"
                startContent={<Icon icon="lucide:file-text" width={18} />}
                endContent={<Icon icon="lucide:chevron-right" width={16} />}
              >
                Terms & Conditions
              </Button>
              
              <Button
                variant="flat"
                className="w-full justify-start"
                startContent={<Icon icon="lucide:shield" width={18} />}
                endContent={<Icon icon="lucide:chevron-right" width={16} />}
              >
                Privacy Policy
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Button
          color="danger"
          variant="flat"
          className="w-full"
          startContent={<Icon icon="lucide:log-out" width={18} />}
        >
          Logout
        </Button>
      </motion.div>
    </div>
  );
};