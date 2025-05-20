
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface OrderFormProps {
  coinSymbol: string;
  currentPrice: string;
  availableBalance: {
    usd: string;
    coin: string;
  };
  onOrderSubmit: (order: any) => void;
}

export function OrderForm({ coinSymbol, currentPrice, availableBalance, onOrderSubmit }: OrderFormProps) {
  const { toast } = useToast();
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState(currentPrice);

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyAmount || parseFloat(buyAmount) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount to buy"
      });
      return;
    }

    const order = {
      type: "buy",
      orderType,
      symbol: coinSymbol,
      amount: buyAmount,
      price: orderType === "market" ? currentPrice : limitPrice,
      total: orderType === "market" 
        ? (parseFloat(buyAmount) * parseFloat(currentPrice)).toFixed(2)
        : (parseFloat(buyAmount) * parseFloat(limitPrice)).toFixed(2)
    };

    onOrderSubmit(order);
    setBuyAmount("");
  };

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellAmount || parseFloat(sellAmount) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount to sell"
      });
      return;
    }

    const order = {
      type: "sell",
      orderType,
      symbol: coinSymbol,
      amount: sellAmount,
      price: orderType === "market" ? currentPrice : limitPrice,
      total: orderType === "market" 
        ? (parseFloat(sellAmount) * parseFloat(currentPrice)).toFixed(2)
        : (parseFloat(sellAmount) * parseFloat(limitPrice)).toFixed(2)
    };

    onOrderSubmit(order);
    setSellAmount("");
  };

  // Calculate total for buy form
  const buyTotal = buyAmount 
    ? (parseFloat(buyAmount) * (orderType === "market" ? parseFloat(currentPrice) : parseFloat(limitPrice))).toFixed(2) 
    : "0.00";

  // Calculate total for sell form
  const sellTotal = sellAmount 
    ? (parseFloat(sellAmount) * (orderType === "market" ? parseFloat(currentPrice) : parseFloat(limitPrice))).toFixed(2) 
    : "0.00";

  return (
    <Card className="crypto-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Place Order</CardTitle>
        <CardDescription>Current price: ${currentPrice}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select 
            value={orderType} 
            onValueChange={(value) => setOrderType(value as "market" | "limit")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Order Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="market">Market Order</SelectItem>
              <SelectItem value="limit">Limit Order</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="buy" className="bg-crypto-green/10 data-[state=active]:bg-crypto-green">Buy</TabsTrigger>
            <TabsTrigger value="sell" className="bg-crypto-red/10 data-[state=active]:bg-crypto-red">Sell</TabsTrigger>
          </TabsList>
          
          {/* Buy Form */}
          <TabsContent value="buy">
            <form onSubmit={handleBuySubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="buy-amount">Amount ({coinSymbol})</Label>
                  <span className="text-xs text-muted-foreground">
                    Available: ${availableBalance.usd}
                  </span>
                </div>
                <Input
                  id="buy-amount"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="bg-background"
                />
              </div>

              {orderType === "limit" && (
                <div className="space-y-2">
                  <Label htmlFor="limit-price">Price (USD)</Label>
                  <Input
                    id="limit-price"
                    type="number"
                    placeholder={currentPrice}
                    min="0"
                    step="0.01"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                    className="bg-background"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Total (USD)</Label>
                <div className="p-2 border rounded-md bg-background/50">
                  ${buyTotal}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-crypto-green hover:bg-crypto-green/90"
              >
                Buy {coinSymbol}
              </Button>
            </form>
          </TabsContent>
          
          {/* Sell Form */}
          <TabsContent value="sell">
            <form onSubmit={handleSellSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="sell-amount">Amount ({coinSymbol})</Label>
                  <span className="text-xs text-muted-foreground">
                    Available: {availableBalance.coin} {coinSymbol}
                  </span>
                </div>
                <Input
                  id="sell-amount"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  className="bg-background"
                />
              </div>

              {orderType === "limit" && (
                <div className="space-y-2">
                  <Label htmlFor="limit-price-sell">Price (USD)</Label>
                  <Input
                    id="limit-price-sell"
                    type="number"
                    placeholder={currentPrice}
                    min="0"
                    step="0.01"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                    className="bg-background"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Total (USD)</Label>
                <div className="p-2 border rounded-md bg-background/50">
                  ${sellTotal}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-crypto-red hover:bg-crypto-red/90"
              >
                Sell {coinSymbol}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default OrderForm;
