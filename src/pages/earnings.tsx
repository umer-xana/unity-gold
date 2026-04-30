import React from "react";
import { Card, CardBody, Button, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { CommissionChart } from "../components/commission-chart";
import { motion } from "framer-motion";

export const Earnings: React.FC = () => {
  const [selected, setSelected] = React.useState("weekly");

  const weeklyData = [
    { name: "Mon", amount: 120 },
    { name: "Tue", amount: 180 },
    { name: "Wed", amount: 150 },
    { name: "Thu", amount: 220 },
    { name: "Fri", amount: 280 },
    { name: "Sat", amount: 250 },
    { name: "Sun", amount: 170 },
  ];

  const monthlyData = [
    { name: "Week 1", amount: 950 },
    { name: "Week 2", amount: 1200 },
    { name: "Week 3", amount: 850 },
    { name: "Week 4", amount: 1450 },
  ];

  const yearlyData = [
    { name: "Jan", amount: 2500 },
    { name: "Feb", amount: 3200 },
    { name: "Mar", amount: 2800 },
    { name: "Apr", amount: 3500 },
    { name: "May", amount: 4200 },
    { name: "Jun", amount: 3800 },
    { name: "Jul", amount: 4500 },
    { name: "Aug", amount: 5200 },
    { name: "Sep", amount: 4800 },
    { name: "Oct", amount: 5500 },
    { name: "Nov", amount: 6200 },
    { name: "Dec", amount: 5800 },
  ];

  return (
    <div className="p-4 pb-20">
      {/* Earnings Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-4">
          <CardBody className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Total Earnings</h2>
              <Button
                variant="light"
                size="sm"
                endContent={<Icon icon="lucide:chevron-right" width={16} />}
              >
                View Details
              </Button>
            </div>
            <div className="flex items-baseline">
              <h1 className="text-3xl font-bold">$12,458.50</h1>
              <div className="ml-3 flex items-center text-success">
                <Icon icon="lucide:trending-up" width={16} />
                <span className="text-tiny ml-1">+8.2%</span>
              </div>
            </div>
            <p className="text-foreground-400 text-tiny mt-1">
              Lifetime earnings
            </p>
          </CardBody>
        </Card>
      </motion.div>

      {/* Commission Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mb-4"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-medium font-semibold">Commission History</h3>
          <Tabs
            selectedKey={selected}
            onSelectionChange={setSelected as any}
            size="sm"
            variant="light"
            className="max-w-[200px]"
          >
            <Tab key="weekly" title="Week" />
            <Tab key="monthly" title="Month" />
            <Tab key="yearly" title="Year" />
          </Tabs>
        </div>

        {selected === "weekly" && (
          <CommissionChart data={weeklyData} title="Weekly Commission" />
        )}
        {selected === "monthly" && (
          <CommissionChart data={monthlyData} title="Monthly Commission" />
        )}
        {selected === "yearly" && (
          <CommissionChart data={yearlyData} title="Yearly Commission" />
        )}
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-medium font-semibold">Recent Transactions</h3>
          <Button
            variant="light"
            size="sm"
            endContent={<Icon icon="lucide:chevron-right" width={16} />}
          >
            View All
          </Button>
        </div>

        <Card className="card-shadow mb-4">
          <CardBody className="p-0">
            <div className="p-3 border-b border-divider">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center mr-3">
                  <Icon icon="lucide:arrow-down-left" className="text-success" width={18} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold">Direct Commission</p>
                    <p className="font-semibold text-success">+$125.40</p>
                  </div>
                  <div className="flex justify-between text-tiny text-foreground-400">
                    <p>From: Emma Johnson</p>
                    <p>Today, 10:45 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 border-b border-divider">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center mr-3">
                  <Icon icon="lucide:arrow-down-left" className="text-success" width={18} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold">Level 2 Bonus</p>
                    <p className="font-semibold text-success">+$78.25</p>
                  </div>
                  <div className="flex justify-between text-tiny text-foreground-400">
                    <p>From: Michael Chen</p>
                    <p>Yesterday, 3:20 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center mr-3">
                  <Icon icon="lucide:arrow-down-left" className="text-success" width={18} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold">Team Performance Bonus</p>
                    <p className="font-semibold text-success">+$215.75</p>
                  </div>
                  <div className="flex justify-between text-tiny text-foreground-400">
                    <p>Monthly Bonus</p>
                    <p>May 1, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Withdraw Button */}
      <div className="fixed bottom-20 right-4">
        <Button
          color="primary"
          className="rounded-full shadow-lg"
          startContent={<Icon icon="lucide:credit-card" width={18} />}
        >
          Withdraw Funds
        </Button>
      </div>
    </div>
  );
};