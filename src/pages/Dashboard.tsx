
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import PortfolioValue from "@/components/dashboard/PortfolioValue";
import TopMovers from "@/components/dashboard/TopMovers";
import MarketOverview from "@/components/dashboard/MarketOverview";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { 
  fetchPortfolioValue, 
  fetchTopMovers, 
  fetchMarketData, 
  fetchRecentActivity 
} from "@/services/api";

const Dashboard: React.FC = () => {
  const { data: portfolioData, isLoading: isLoadingPortfolio } = useQuery({
    queryKey: ['portfolioValue'],
    queryFn: fetchPortfolioValue,
  });

  const { data: moversData, isLoading: isLoadingMovers } = useQuery({
    queryKey: ['topMovers'],
    queryFn: fetchTopMovers,
  });

  const { data: marketData, isLoading: isLoadingMarket } = useQuery({
    queryKey: ['marketData'],
    queryFn: fetchMarketData,
  });

  const { data: activityData, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['recentActivity'],
    queryFn: fetchRecentActivity,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoadingPortfolio ? (
          <Skeleton className="h-[200px] w-full" />
        ) : (
          portfolioData && <PortfolioValue {...portfolioData} />
        )}

        {isLoadingMovers ? (
          <Skeleton className="h-[200px] w-full" />
        ) : (
          moversData && <TopMovers gainers={moversData.gainers} losers={moversData.losers} />
        )}

        {isLoadingActivity ? (
          <Skeleton className="h-[200px] w-full" />
        ) : (
          activityData && <RecentActivity activities={activityData} />
        )}
      </div>

      <div className="mt-6">
        {isLoadingMarket ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          marketData && (
            <MarketOverview 
              btcData={marketData.btcData}
              ethData={marketData.ethData}
              solData={marketData.solData}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
