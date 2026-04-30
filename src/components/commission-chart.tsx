import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardBody } from "@heroui/react";

interface CommissionData {
  name: string;
  amount: number;
}

interface CommissionChartProps {
  data: CommissionData[];
  title: string;
}

export const CommissionChart: React.FC<CommissionChartProps> = ({
  data,
  title,
}) => {
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  return (
    <Card className="card-shadow w-full">
      <CardBody className="p-4">
        <h3 className="text-medium font-semibold mb-4">{title}</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value) => [`${formatCurrency(value as number)}`, "Commission"]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#D4AF37"
                fillOpacity={1}
                fill="url(#colorCommission)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
};