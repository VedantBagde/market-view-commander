
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  value: number;
  color: string;
  percentage: number;
}

interface AssetAllocationProps {
  assets: Asset[];
}

const COLORS = ['#8b5cf6', '#0891b2', '#0ea5e9', '#22c55e', '#f97316', '#f43f5e'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

export function AssetAllocation({ assets }: AssetAllocationProps) {
  const pieData = assets.map(asset => ({
    name: asset.symbol,
    value: asset.value,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-800 p-3 border border-slate-700 rounded-md shadow-md">
          <p className="font-medium">{assets.find(a => a.symbol === data.name)?.name}</p>
          <p className="text-sm">${data.value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="crypto-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {assets.map((asset, index) => (
            <div key={asset.id} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }} 
              />
              <div className="flex flex-col">
                <span className="text-sm">{asset.symbol}</span>
                <span className="text-xs text-muted-foreground">{asset.percentage.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default AssetAllocation;
