
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
}

interface PortfolioTableProps {
  assets: Asset[];
}

export function PortfolioTable({ assets }: PortfolioTableProps) {
  return (
    <Card className="crypto-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Your Portfolio</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Average Buy</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>P/L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => {
                const value = asset.quantity * asset.currentPrice;
                const costBasis = asset.quantity * asset.buyPrice;
                const pnl = value - costBasis;
                const pnlPercentage = (pnl / costBasis) * 100;
                const isProfitable = pnl >= 0;

                return (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{asset.name}</span>
                        <span className="text-muted-foreground text-xs">{asset.symbol}</span>
                      </div>
                    </TableCell>
                    <TableCell>{asset.quantity.toFixed(6)}</TableCell>
                    <TableCell>${asset.buyPrice.toFixed(2)}</TableCell>
                    <TableCell>${asset.currentPrice.toFixed(2)}</TableCell>
                    <TableCell>${value.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className={isProfitable ? "text-crypto-green" : "text-crypto-red"}>
                          <span className="inline-flex items-center">
                            {isProfitable ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                            ${Math.abs(pnl).toFixed(2)}
                          </span>
                        </span>
                        <span className={`text-xs ${isProfitable ? "text-crypto-green" : "text-crypto-red"}`}>
                          {isProfitable ? "+" : ""}{pnlPercentage.toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default PortfolioTable;
