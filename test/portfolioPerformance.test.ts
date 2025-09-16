import { calculatePortfolioPerformance } from '../src/portfolio/portfolioPerformance';

describe('calculatePortfolioPerformance', () => {
    test('should calculate profit correctly', () => {
        const result = calculatePortfolioPerformance(10000, 13000);
        expect(result.profitOrLoss).toBe(3000);
        expect(result.percentageChange).toBeCloseTo(30);
        expect(result.performanceSummary).toContain('gained significantly');
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
