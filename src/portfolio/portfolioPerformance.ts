export interface PortfolioPerformance {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}

export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number
): PortfolioPerformance {
  const profitOrLoss = currentValue - initialInvestment;
  const percentageChange =
    initialInvestment === 0 ? 0 : (profitOrLoss / initialInvestment) * 100;

  const performanceSummary =
    percentageChange > 20
      ? "gained rapidly"
      : percentageChange > 10
      ? "gained moderately"
      : percentageChange > 0
      ? "gained slightly"
      : percentageChange === 0
      ? "changed moderately"
      : percentageChange >= -10
      ? "lost slightly"
      : percentageChange >= -20
      ? "loss"
      : "lost rapidly";

  return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange,
    performanceSummary,
  };
}

export interface Asset {
  name: string;   // e.g., "Stocks", "House", "Bonds"
  value: number;  // Current value in dollars
}

export function findLargestHolding(assets: Asset[]): Asset | null {
  if (assets.length === 0) return null;

  return assets.reduce((largest, current) =>
    current.value > largest.value ? current : largest
  );
}

export interface AssetAllocation {
  name: string;
  percentage: number; // Rounded to 2 decimals
}

export function calculateAssetAllocation(assets: Asset[]): AssetAllocation[] {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return assets.map(asset => ({
    name: asset.name,
    percentage:
      totalValue === 0
        ? 0
        : parseFloat(((asset.value / totalValue) * 100).toFixed(2)),
  }));
}