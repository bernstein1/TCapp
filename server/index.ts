import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn('⚠️  Warning: Missing recommended environment variables:');
  missingEnvVars.forEach(varName => {
    console.warn(`  - ${varName}`);
  });
  console.warn('\nApplication will run without database. API calls may fail.');
  console.warn('See .env.example for required configuration.');
}

const app = express();

declare global {
  namespace Express {
    interface Request {
      memberId?: string;
    }
  }
}

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const initialPort = parseInt(process.env.PORT || '5001', 10);
  const host = process.platform === 'darwin' ? 'localhost' : '0.0.0.0';

  const startServer = (port: number) => {
    const serverInstance = server.listen(port, host, () => {
      log(`serving on ${host}:${port}`);
    });

    serverInstance.on('error', (e: any) => {
      if (e.code === 'EADDRINUSE') {
        log(`Port ${port} is in use, trying ${port + 1}...`);
        // server.listen returns a net.Server which we can't easily "close" if it failed to bind,
        // but the error event implies it failed. We just try again.
        // However, we need to be careful not to stack listeners if we were reusing the same object,
        // but here 'server' is the HTTP server created by createServer(app).
        // Calling listen again on the same server instance after an error *might* work or throw.
        // A safer approach for the same instance is tricky.
        // Actually, createServer returns a server that can be listened on multiple times if closed,
        // but here it failed to start.
        // Let's try closing it just in case, then retrying after a small delay.
        server.close();
        setTimeout(() => startServer(port + 1), 1000);
      } else {
        console.error(e);
      }
    });
  };

  startServer(initialPort);
})();
