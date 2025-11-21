import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import authRouter from "./routes/auth";
import casesRouter from "./routes/cases";
import documentsRouter from "./routes/documents";
import appointmentsRouter from "./routes/appointments";
import membersRouter from "./routes/members";
import notificationsRouter from "./routes/notifications";
import servicesRouter from "./routes/services";
import tasksRouter from "./routes/tasks";

// Mock auth middleware - hardcoded test member for development
const MOCK_MEMBER_ID = "912da39b-1f75-4adc-90b9-06b77bc454c4";

// Extend Express Request to include member
declare global {
  namespace Express {
    interface Request {
      memberId?: string;
    }
  }
}

// Mock auth middleware
async function authMiddleware(req: Request, res: Response, next: Function) {
  // In development, use hardcoded member ID
  req.memberId = MOCK_MEMBER_ID;
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Apply auth middleware to all /api routes except /api/auth
  app.use("/api", (req, res, next) => {
    const logMessage = `[Middleware] Path: ${req.path}, OriginalUrl: ${req.originalUrl}\n`;
    try {
      // Dynamic import or require fs to avoid top-level import issues if any
      const fs = require('fs');
      fs.appendFileSync('server.log', logMessage);
    } catch (e) {
      console.error("Failed to write to log file", e);
    }

    if (req.path.startsWith("/auth")) {
      try { require('fs').appendFileSync('server.log', "[Middleware] Skipping auth for /auth path\n"); } catch (e) { }
      return next();
    }
    try { require('fs').appendFileSync('server.log', "[Middleware] Applying authMiddleware\n"); } catch (e) { }
    return authMiddleware(req, res, next);
  });

  // Register modular routes
  app.use("/api/auth", authRouter);
  app.use("/api/cases", casesRouter);
  app.use("/api/documents", documentsRouter);
  app.use("/api/appointments", appointmentsRouter);
  app.use("/api/member", membersRouter);
  app.use("/api/notifications", notificationsRouter);
  app.use("/api/services", servicesRouter);
  app.use("/api/tasks", tasksRouter);

  const httpServer = createServer(app);

  return httpServer;
}
