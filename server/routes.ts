import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import authRouter from "./routes/auth";
import casesRouter from "./routes/cases";
import documentsRouter from "./routes/documents";
import appointmentsRouter from "./routes/appointments";
import membersRouter from "./routes/members";
import notificationsRouter from "./routes/notifications";
import servicesRouter from "./routes/services";
import schedulingRouter from "./routes/scheduling";
import tasksRouter from "./routes/tasks";

export async function registerRoutes(app: Express): Promise<Server> {
    // Mock auth middleware
    app.use((req, res, next) => {
        // Hardcoded test member for development
        req.memberId = "912da39b-1f75-4adc-90b9-06b77bc454c4";
        next();
    });

    // Register modular routes
    app.use("/api/auth", authRouter);
    app.use("/api/cases", casesRouter);
    app.use("/api/documents", documentsRouter);
    app.use("/api/appointments", appointmentsRouter);
    app.use("/api/scheduling", schedulingRouter);
    app.use("/api/member", membersRouter);
    app.use("/api/notifications", notificationsRouter);
    app.use("/api/services", servicesRouter);
    app.use("/api/tasks", tasksRouter);

    const httpServer = createServer(app);

    return httpServer;
}
