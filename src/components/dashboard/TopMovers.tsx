
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown } from "lucide-react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
}

interface TopMoversProps {
  gainers: Coin[];
  losers: Coin[];
}

export function TopMovers({ gainers, losers }: TopMoversProps) {
  return (
    <Card className="crypto-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Top Movers</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="gainers">Gainers</TabsTrigger>
            <TabsTrigger value="losers">Losers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gainers" className="space-y-4">
            {gainers.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 font-medium">{coin.symbol}</div>
                  <div className="text-sm text-muted-foreground">{coin.name}</div>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">${coin.price}</div>
                  <div className="flex items-center text-crypto-green">
                    <ArrowUp size={16} />
                    <span>{coin.change}%</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="losers" className="space-y-4">
            {losers.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 font-medium">{coin.symbol}</div>
                  <div className="text-sm text-muted-foreground">{coin.name}</div>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">${coin.price}</div>
                  <div className="flex items-center text-crypto-red">
                    <ArrowDown size={16} />
                    <span>{coin.change}%</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default TopMovers;
