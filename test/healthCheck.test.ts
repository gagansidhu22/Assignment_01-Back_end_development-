import request, { Response } from "supertest";
import app from "../src/app";

describe("GET /api/v1/health", () => {
    it("should return server health status", async () => {
        const response: Response = await request(app).get("/api/v1/health");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK");
        expect(response.body).toHaveProperty("uptime");
        expect(response.body).toHaveProperty("timestamp");
        expect(response.body).toHaveProperty("version");
    });

    it("should return uptime as a number greater than 0", async () => {
        const response: Response = await request(app).get("/api/v1/health");
        expect(typeof response.body.uptime).toBe("number");
        expect(response.body.uptime).toBeGreaterThan(0);
    });

    it("should return a valid ISO timestamp", async () => {
        const response: Response = await request(app).get("/api/v1/health");
        const timestamp = response.body.timestamp;
        const date = new Date(timestamp);
        expect(date.toISOString()).toBe(timestamp); // confirms it's a valid ISO string
    });

});
