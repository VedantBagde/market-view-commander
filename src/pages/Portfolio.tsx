
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import PortfolioTable from "@/components/portfolio/PortfolioTable";
import AssetAllocation from "@/components/portfolio/AssetAllocation";
import { fetchAssets, fetchAssetAllocation } from "@/services/api";

const Portfolio: React.FC = () => {
  const { data: assets, isLoading: isLoadingAssets } = useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
  });

  const { data: allocation, isLoading: isLoadingAllocation } = useQuery({
    queryKey: ['assetAllocation'],
    queryFn: fetchAssetAllocation,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Portfolio</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {isLoadingAssets ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            assets && <PortfolioTable assets={assets} />
          )}
        </div>

        <div>
          {isLoadingAllocation ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            allocation && <AssetAllocation assets={allocation} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
