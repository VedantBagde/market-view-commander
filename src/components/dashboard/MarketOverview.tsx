
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MarketData {
  name: string;
  value: number;
}

interface MarketOverviewProps {
  btcData: MarketData[];
  ethData: MarketData[];
  solData: MarketData[];
}

export function MarketOverview({ btcData, ethData, solData }: MarketOverviewProps) {
  return (
    <Card className="crypto-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="btc" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="btc">BTC</TabsTrigger>
            <TabsTrigger value="eth">ETH</TabsTrigger>
            <TabsTrigger value="sol">SOL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="btc">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={btcData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="btcGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff9500" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ff9500" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#64748b" />
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
                    stroke="#ff9500" 
                    fillOpacity={1} 
                    fill="url(#btcGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="eth">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={ethData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="ethGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#627eea" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#627eea" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#64748b" />
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
                    stroke="#627eea" 
                    fillOpacity={1} 
                    fill="url(#ethGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="sol">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={solData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="solGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ffbd" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00ffbd" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#64748b" />
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
                    stroke="#00ffbd" 
                    fillOpacity={1} 
                    fill="url(#solGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default MarketOverview;
