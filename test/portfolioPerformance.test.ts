// test/portfolio.test.ts
import {
  calculatePortfolioPerformance,
  findLargestHolding,
  calculateAssetAllocation,
  Asset,
  AssetAllocation
} from '../src/portfolio/portfolioPerformance';

// potfolioPerformance tests
describe('calculatePortfolioPerformance', () => {
  test('should calculate profit correctly', () => {
    const result = calculatePortfolioPerformance(10000, 13000);
    expect(result.profitOrLoss).toBe(3000);
    expect(result.percentageChange).toBeCloseTo(30);
    expect(result.performanceSummary).toContain('gained rapidly');
  });

  test('should calculate loss correctly', () => {
    const result = calculatePortfolioPerformance(15000, 12000);
    expect(result.profitOrLoss).toBe(-3000);
    expect(result.percentageChange).toBeCloseTo(-20);
    expect(result.performanceSummary).toContain('loss');
  });

  test('should handle no change correctly', () => {
    const result = calculatePortfolioPerformance(10000, 10000);
    expect(result.profitOrLoss).toBe(0);
    expect(result.percentageChange).toBe(0);
    expect(result.performanceSummary).toContain('moderately');
  });
});

// Largest Holding Tests 
describe('findLargestHolding', () => {
  test('should return the largest asset normally', () => {
    const assets: Asset[] = [
      { name: 'Stocks', value: 5000 },
      { name: 'House', value: 250000 },
      { name: 'Bonds', value: 20000 },
    ];
    const result = findLargestHolding(assets);
    expect(result).toEqual({ name: 'House', value: 250000 });
  });

  test('should return null for an empty array', () => {
    const assets: Asset[] = [];
    const result = findLargestHolding(assets);
    expect(result).toBeNull();
  });

  test('should return the first asset if there is a tie', () => {
    const assets: Asset[] = [
      { name: 'Stocks', value: 10000 },
      { name: 'Bonds', value: 10000 },
      { name: 'Gold', value: 5000 },
    ];
    const result = findLargestHolding(assets);
    expect(result).toEqual({ name: 'Stocks', value: 10000 });
  });
});

//  Asset Allocation Tests 
describe('calculateAssetAllocation', () => {
  test('should calculate percentages for even distribution', () => {
    const assets: Asset[] = [
      { name: 'Stocks', value: 5000 },
      { name: 'Bonds', value: 5000 },
    ];
    const result: AssetAllocation[] = calculateAssetAllocation(assets);
    expect(result).toEqual([
      { name: 'Stocks', percentage: 50 },
      { name: 'Bonds', percentage: 50 },
    ]);
  });

  test('should calculate percentages for uneven distribution', () => {
    const assets: Asset[] = [
      { name: 'Stocks', value: 3000 },
      { name: 'Bonds', value: 7000 },
    ];
    const result: AssetAllocation[] = calculateAssetAllocation(assets);
    expect(result).toEqual([
      { name: 'Stocks', percentage: 30 },
      { name: 'Bonds', percentage: 70 },
    ]);
  });

  test('should return empty array for empty assets', () => {
    const assets: Asset[] = [];
    const result: AssetAllocation[] = calculateAssetAllocation(assets);
    expect(result).toEqual([]);
  });
});
