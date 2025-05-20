
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface PortfolioValueProps {
  totalValue: string;
  change: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
}

export function PortfolioValue({ totalValue, change }: PortfolioValueProps) {
  return (
    <Card className="crypto-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Portfolio Value</CardTitle>
        <CardDescription>Total balance across all assets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">${totalValue}</div>
        <div className="flex items-center mt-2">
          <span 
            className={`flex items-center ${
              change.isPositive ? "text-crypto-green" : "text-crypto-red"
            }`}
          >
            {change.isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="ml-1">${change.value} ({change.percentage})</span>
          </span>
          <span className="text-xs text-muted-foreground ml-2">24h</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default PortfolioValue;
