
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import TradingChart from "@/components/trade/TradingChart";
import OrderForm from "@/components/trade/OrderForm";
import CoinSelector from "@/components/trade/CoinSelector";
import OrderConfirmationDialog from "@/components/trade/OrderConfirmationDialog";
import { 
  fetchAvailableCoins, 
  fetchCoinData, 
  fetchCoinBalance,
  submitOrder
} from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const Trade: React.FC = () => {
  const { toast } = useToast();
  
  const [selectedCoin, setSelectedCoin] = useState("btc");
  const [pendingOrder, setPendingOrder] = useState<any>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { data: availableCoins, isLoading: isLoadingCoins } = useQuery({
    queryKey: ['availableCoins'],
    queryFn: fetchAvailableCoins,
  });

  const { data: coinData, isLoading: isLoadingCoinData } = useQuery({
    queryKey: ['coinData', selectedCoin],
    queryFn: () => fetchCoinData(selectedCoin),
    enabled: !!selectedCoin,
  });

  const { data: balanceData, isLoading: isLoadingBalance } = useQuery({
    queryKey: ['coinBalance', selectedCoin],
    queryFn: () => fetchCoinBalance(selectedCoin),
    enabled: !!selectedCoin,
  });

  const handleCoinSelect = (coinId: string) => {
    setSelectedCoin(coinId);
  };

  const handleOrderSubmit = (order: any) => {
    setPendingOrder(order);
    setShowConfirmation(true);
  };

  const confirmOrder = async () => {
    try {
      const result = await submitOrder(pendingOrder);
      setShowConfirmation(false);
      
      // Show success notification
      toast({
        title: "Order Submitted Successfully",
        description: `Your ${pendingOrder.type} order for ${pendingOrder.amount} ${pendingOrder.symbol} has been placed.`,
      });
      
      setPendingOrder(null);
    } catch (error) {
      console.error("Order submission error:", error);
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
      });
    }
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setPendingOrder(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Trade</h1>
      </div>

      <div className="mb-4">
        {isLoadingCoins ? (
          <Skeleton className="h-10 w-[200px]" />
        ) : (
          availableCoins && (
            <CoinSelector 
              coins={availableCoins} 
              selectedCoin={selectedCoin} 
              onSelect={handleCoinSelect} 
            />
          )
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {isLoadingCoinData ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            coinData && (
              <TradingChart 
                data={coinData.chartData}
                symbol={coinData.symbol}
                currentPrice={coinData.currentPrice}
                priceChange={coinData.priceChange}
              />
            )
          )}
        </div>

        <div>
          {isLoadingBalance || isLoadingCoinData ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            balanceData && coinData && (
              <OrderForm 
                coinSymbol={coinData.symbol.split('/')[0]}
                currentPrice={coinData.currentPrice}
                availableBalance={balanceData}
                onOrderSubmit={handleOrderSubmit}
              />
            )
          )}
        </div>
      </div>

      {/* Order Confirmation Dialog */}
      <OrderConfirmationDialog
        isOpen={showConfirmation}
        onClose={closeConfirmation}
        onConfirm={confirmOrder}
        order={pendingOrder}
      />
    </div>
  );
};

export default Trade;
