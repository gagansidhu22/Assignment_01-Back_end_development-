import express, { Express, Request, Response } from "express";
import {
  calculatePortfolioPerformance,
  findLargestHolding,
  calculateAssetAllocation,
  Asset
} from "./portfolio/portfolioPerformance";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});    

// Health End Point
interface HealthResponse {
status: string;
uptime: number;
timestamp: string;
version: string;
}
app.get("/api/v1/health", (req: Request, res: Response) => {
    const health: HealthResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };
    res.json(health);
});

app.get("/api/v1/info", (req: Request, res: Response) => {
    const info = {
        name: "MyApp",
        environment: process.env.NODE_ENV || "development",
        port: Number(process.env.PORT) || 3000,
        timestamp: new Date().toISOString(),
    };
    res.json(info);
});
// Portiofolio Check Point
const sampleAssets: Asset[] = [
  { name: "Stocks", value: 5000 },
  { name: "Bonds", value: 3000 },
  { name: "Real Estate", value: 20000 },
];

const initialInvestment = 25000;
const currentValue = sampleAssets.reduce((sum, asset) => sum + asset.value, 0);

app.get("/api/v1/portfolio/performance", (req: Request, res: Response) => {
  const performance = calculatePortfolioPerformance(initialInvestment, currentValue);
  res.json(performance);
});

// Largest holding check point

app.get("/api/v1/portfolio/largest-holding", (req: Request, res: Response) => {
  const largest = findLargestHolding(sampleAssets);
  res.json(largest);
});

// Asset Allocation
app.get("/api/v1/portfolio/allocation", (req: Request, res: Response) => {
  const allocation = calculateAssetAllocation(sampleAssets);
  res.json(allocation);
});

export default app;