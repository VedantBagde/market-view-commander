
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChartData {
  timestamp: string;
  price: number;
}

interface TradingChartProps {
  data: ChartData[];
  symbol: string;
  currentPrice: string;
  priceChange: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
}

export function TradingChart({ data, symbol, currentPrice, priceChange }: TradingChartProps) {
  const chartData = data.map(item => ({
    time: item.timestamp,
    value: item.price
  }));

  return (
    <Card className="crypto-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{symbol}</h2>
            <div className="flex items-center mt-1">
              <span className="text-xl font-bold mr-2">${currentPrice}</span>
              <span 
                className={`text-sm ${
                  priceChange.isPositive ? "text-crypto-green" : "text-crypto-red"
                }`}
              >
                {priceChange.isPositive ? "+" : ""}{priceChange.percentage}
              </span>
            </div>
          </div>
          <Tabs defaultValue="1h">
            <TabsList>
              <TabsTrigger value="1h">1H</TabsTrigger>
              <TabsTrigger value="24h">24H</TabsTrigger>
              <TabsTrigger value="1w">1W</TabsTrigger>
              <TabsTrigger value="1m">1M</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={priceChange.isPositive ? "#0ecb81" : "#f6465d"} 
                    stopOpacity={0.3} 
                  />
                  <stop 
                    offset="95%" 
                    stopColor={priceChange.isPositive ? "#0ecb81" : "#f6465d"} 
                    stopOpacity={0} 
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#64748b" />
              <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1e293b", 
                  border: "1px solid #334155",
                  borderRadius: "8px"
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={priceChange.isPositive ? "#0ecb81" : "#f6465d"} 
                fillOpacity={1} 
                fill="url(#gradientArea)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default TradingChart;
