
// This file would contain all API calls to our backend
// For now we'll use mock data, but this would be replaced with actual API calls

import { 
  mockMarketData, 
  mockAssets, 
  mockPortfolioValue, 
  mockGainers, 
  mockLosers,
  mockRecentActivity,
  mockAssetAllocation,
  mockTradingChartData,
  mockAvailableCoins
} from './mockData';

// Dashboard Data
export const fetchPortfolioValue = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPortfolioValue;
};

export const fetchTopMovers = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 700));
  return {
    gainers: mockGainers,
    losers: mockLosers,
  };
};

export const fetchMarketData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockMarketData;
};

export const fetchRecentActivity = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockRecentActivity;
};

// Trading Data
export const fetchAvailableCoins = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockAvailableCoins;
};

export const fetchCoinData = async (coinId: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const coin = mockAvailableCoins.find(c => c.id === coinId);
  
  if (!coin) {
    throw new Error('Coin not found');
  }
  
  return {
    symbol: `${coin.symbol}/USD`,
    currentPrice: (Math.random() * 100 + 1000).toFixed(2),
    priceChange: {
      value: (Math.random() * 100).toFixed(2),
      percentage: (Math.random() * 5).toFixed(2),
      isPositive: Math.random() > 0.5,
    },
    chartData: mockTradingChartData,
  };
};

export const fetchCoinBalance = async (coinId: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 400));
  const coin = mockAvailableCoins.find(c => c.id === coinId);
  
  if (!coin) {
    throw new Error('Coin not found');
  }
  
  return {
    usd: (Math.random() * 10000 + 1000).toFixed(2),
    coin: (Math.random() * 10).toFixed(4),
  };
};

export const submitOrder = async (order: any) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log('Order submitted:', order);
  return { success: true, orderId: `ord-${Math.random().toString(36).substr(2, 9)}` };
};

// Portfolio Data
export const fetchAssets = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 900));
  return mockAssets;
};

export const fetchAssetAllocation = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 700));
  return mockAssetAllocation;
};

// Auth
export const login = async (credentials: { email: string, password: string }) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (credentials.email && credentials.password) {
    return { success: true, user: { id: '123', email: credentials.email } };
  }
  throw new Error('Invalid credentials');
};

export const signup = async (userData: { email: string, password: string }) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1200));
  if (userData.email && userData.password) {
    return { success: true, user: { id: '123', email: userData.email } };
  }
  throw new Error('Error creating user');
};

export const logout = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};
