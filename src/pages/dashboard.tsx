import React from "react";
import { Button, Card, CardBody, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { StatCard } from "../components/stat-card";
import { motion } from "framer-motion";

export const Dashboard: React.FC = () => {
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
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-4 overflow-hidden">
          <CardBody className="p-0">
            <div className="gold-gradient p-4">
              <div className="flex items-center">
                <Avatar
                  src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
                  className="mr-3"
                  size="lg"
                />
                <div>
                  <h2 className="text-black font-semibold text-lg">Welcome, Sarah!</h2>
                  <p className="text-black/80 text-tiny">Gold Member</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-black/80 text-tiny">Current Rank</p>
                  <p className="text-black font-semibold">Executive</p>
                </div>
                <div>
                  <p className="text-black/80 text-tiny">Next Rank</p>
                  <p className="text-black font-semibold">Diamond</p>
                </div>
                <div>
                  <p className="text-black/80 text-tiny">Progress</p>
                  <p className="text-black font-semibold">78%</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-3 mb-6"
      >
        <motion.div variants={itemVariants}>
          <StatCard
            title="Monthly Earnings"
            value="$2,458.50"
            icon="lucide:dollar-sign"
            color="primary"
            trend={{ value: 12.5, isPositive: true }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Team Size"
            value="24 Members"
            icon="lucide:users"
            color="success"
            trend={{ value: 3, isPositive: true }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Personal Sales"
            value="$1,245.00"
            icon="lucide:shopping-cart"
            color="warning"
            trend={{ value: 5.2, isPositive: false }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Team Sales"
            value="$8,721.35"
            icon="lucide:trending-up"
            color="secondary"
            trend={{ value: 8.7, isPositive: true }}
          />
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h3 className="text-medium font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-3 mb-6">
          <Button
            className="flex flex-col h-20 items-center justify-center"
            variant="flat"
          >
            <Icon icon="lucide:user-plus" width={22} />
            <span className="text-tiny mt-1">Add Member</span>
          </Button>
          <Button
            className="flex flex-col h-20 items-center justify-center"
            variant="flat"
          >
            <Icon icon="lucide:shopping-bag" width={22} />
            <span className="text-tiny mt-1">Shop</span>
          </Button>
          <Button
            className="flex flex-col h-20 items-center justify-center"
            variant="flat"
          >
            <Icon icon="lucide:gift" width={22} />
            <span className="text-tiny mt-1">Rewards</span>
          </Button>
          <Button
            className="flex flex-col h-20 items-center justify-center"
            variant="flat"
          >
            <Icon icon="lucide:help-circle" width={22} />
            <span className="text-tiny mt-1">Support</span>
          </Button>
        </div>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <h3 className="text-medium font-semibold mb-3">Recent Activities</h3>
        <Card className="card-shadow mb-4">
          <CardBody className="p-0">
            <div className="p-3 border-b border-divider">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <Icon icon="lucide:user-plus" className="text-primary" width={16} />
                </div>
                <div>
                  <p className="text-small">New team member joined</p>
                  <p className="text-tiny text-foreground-400">John Smith joined your team</p>
                </div>
                <p className="text-tiny text-foreground-400 ml-auto">2h ago</p>
              </div>
            </div>
            <div className="p-3 border-b border-divider">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-success-100 flex items-center justify-center mr-3">
                  <Icon icon="lucide:dollar-sign" className="text-success" width={16} />
                </div>
                <div>
                  <p className="text-small">Commission received</p>
                  <p className="text-tiny text-foreground-400">You received $125.40 commission</p>
                </div>
                <p className="text-tiny text-foreground-400 ml-auto">5h ago</p>
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-warning-100 flex items-center justify-center mr-3">
                  <Icon icon="lucide:shopping-cart" className="text-warning" width={16} />
                </div>
                <div>
                  <p className="text-small">New team sale</p>
                  <p className="text-tiny text-foreground-400">Emma made a sale of $350.00</p>
                </div>
                <p className="text-tiny text-foreground-400 ml-auto">1d ago</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};