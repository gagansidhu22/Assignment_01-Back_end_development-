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

app.get("/api/v1/info", (req: Request, res: Response) => {
    const info = {
        name: "MyApp",
        environment: process.env.NODE_ENV || "development",
        port: Number(process.env.PORT) || 3000,
        timestamp: new Date().toISOString(),
    };
    res.json(info);
});

export default app;