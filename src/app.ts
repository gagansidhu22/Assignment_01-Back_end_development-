import express, { Express, Request, Response } from "express";
import { uptime } from "process";
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});    
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
export default app;