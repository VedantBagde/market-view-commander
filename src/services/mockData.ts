
// Mock data for development

// Dashboard data
export const mockPortfolioValue = {
  totalValue: "58,245.32",
  change: {
    value: "2,156.23",
    percentage: "3.85%",
    isPositive: true,
  }
};

export const mockGainers = [
  { id: "sol", name: "Solana", symbol: "SOL", price: "145.32", change: "8.24", isPositive: true },
  { id: "avax", name: "Avalanche", symbol: "AVAX", price: "42.18", change: "7.61", isPositive: true },
  { id: "atom", name: "Cosmos", symbol: "ATOM", price: "12.93", change: "6.54", isPositive: true },
  { id: "dot", name: "Polkadot", symbol: "DOT", price: "7.82", change: "5.36", isPositive: true },
];

export const mockLosers = [
  { id: "doge", name: "Dogecoin", symbol: "DOGE", price: "0.1345", change: "4.62", isPositive: false },
  { id: "link", name: "Chainlink", symbol: "LINK", price: "15.67", change: "3.82", isPositive: false },
  { id: "uni", name: "Uniswap", symbol: "UNI", price: "9.42", change: "3.24", isPositive: false },
  { id: "xlm", name: "Stellar", symbol: "XLM", price: "0.1123", change: "2.75", isPositive: false },
];

// Generate mock chart data
const generateChartData = (days: number, startPrice: number, volatility: number) => {
  const data = [];
  let currentPrice = startPrice;
  
  for (let i = 0; i < days; i++) {
    // Add some randomness to the price
    const change = (Math.random() - 0.5) * volatility;
    currentPrice = Math.max(0.01, currentPrice + change);
    
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    data.push({
      name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: currentPrice
    });
  }
  
  return data;
};

export const mockMarketData = {
  btcData: generateChartData(30, 45000, 1500),
  ethData: generateChartData(30, 3500, 120),
  solData: generateChartData(30, 140, 10),
};

export const mockRecentActivity = [
  { 
    id: "act-1", 
    type: "buy", 
    symbol: "BTC", 
    amount: "0.05 BTC", 
    price: "2,350.25", 
    timestamp: "Today, 10:24 AM" 
  },
  { 
    id: "act-2", 
    type: "sell", 
    symbol: "ETH", 
    amount: "1.25 ETH", 
    price: "4,125.75", 
    timestamp: "Yesterday, 3:52 PM" 
  },
  { 
    id: "act-3", 
    type: "buy", 
    symbol: "SOL", 
    amount: "10 SOL", 
    price: "1,435.60", 
    timestamp: "Apr 18, 9:15 AM" 
  },
];

// Portfolio data
export const mockAssets = [
  { 
    id: "btc", 
    name: "Bitcoin", 
    symbol: "BTC", 
    quantity: 0.85, 
    buyPrice: 42000, 
    currentPrice: 47250 
  },
  { 
    id: "eth", 
    name: "Ethereum", 
    symbol: "ETH", 
    quantity: 12.5, 
    buyPrice: 2800, 
    currentPrice: 3150 
  },
  { 
    id: "sol", 
    name: "Solana", 
    symbol: "SOL", 
    quantity: 120, 
    buyPrice: 120, 
    currentPrice: 145 
  },
  { 
    id: "bnb", 
    name: "Binance Coin", 
    symbol: "BNB", 
    quantity: 25, 
    buyPrice: 310, 
    currentPrice: 295 
  },
  { 
    id: "ada", 
    name: "Cardano", 
    symbol: "ADA", 
    quantity: 2500, 
    buyPrice: 1.2, 
    currentPrice: 1.35 
  },
];

export const mockAssetAllocation = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", value: 40162.5, color: "#F7931A", percentage: 42.6 },
  { id: "eth", name: "Ethereum", symbol: "ETH", value: 39375, color: "#627EEA", percentage: 41.7 },
  { id: "sol", name: "Solana", symbol: "SOL", value: 17400, color: "#00FFA3", percentage: 18.4 },
  { id: "bnb", name: "Binance Coin", symbol: "BNB", value: 7375, color: "#F3BA2F", percentage: 7.8 },
  { id: "ada", name: "Cardano", symbol: "ADA", value: 3375, color: "#0033AD", percentage: 3.6 },
];

// Trading data
export const mockTradingChartData = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12;
  const amPm = i < 12 ? 'AM' : 'PM';
  return {
    timestamp: `${hour}${amPm}`,
    price: 1000 + Math.random() * 200
  };
});

export const mockAvailableCoins = [
  { id: "btc", name: "Bitcoin", symbol: "BTC" },
  { id: "eth", name: "Ethereum", symbol: "ETH" },
  { id: "sol", name: "Solana", symbol: "SOL" },
  { id: "bnb", name: "Binance Coin", symbol: "BNB" },
  { id: "ada", name: "Cardano", symbol: "ADA" },
  { id: "xrp", name: "Ripple", symbol: "XRP" },
  { id: "dot", name: "Polkadot", symbol: "DOT" },
  { id: "doge", name: "Dogecoin", symbol: "DOGE" },
  { id: "avax", name: "Avalanche", symbol: "AVAX" },
  { id: "link", name: "Chainlink", symbol: "LINK" },
];
