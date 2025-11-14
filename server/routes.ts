import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertCaseSchema,
  insertCaseMessageSchema,
  insertDocumentSchema,
  insertAppointmentSchema,
  insertDependentSchema,
  insertMemberSchema,
  insertTaskSchema,
  type Member,
} from "@shared/schema";
import { z } from "zod";

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
    if (req.path.startsWith("/auth")) {
      return next();
    }
    return authMiddleware(req, res, next);
  });

  // ============================================================================
  // AUTH ROUTES
  // ============================================================================

  // Get current authenticated user
  app.get("/api/auth/user", async (req: Request, res: Response) => {
    try {
      const member = await storage.getMember(MOCK_MEMBER_ID);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.json(member);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ============================================================================
  // CASES ROUTES
  // ============================================================================

  // List all cases for current member
  app.get("/api/cases", async (req: Request, res: Response) => {
    try {
      const cases = await storage.getCasesByMember(req.memberId!);
      res.json(cases);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get specific case details
  app.get("/api/cases/:id", async (req: Request, res: Response) => {
    try {
      const case_ = await storage.getCase(req.params.id);
      if (!case_) {
        return res.status(404).json({ message: "Case not found" });
      }
      // Verify the case belongs to the current member
      if (case_.memberId !== req.memberId) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      res.json(case_);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create new case
  app.post("/api/cases", async (req: Request, res: Response) => {
    try {
      const validatedData = insertCaseSchema.parse({
        ...req.body,
        memberId: req.memberId,
      });
      const newCase = await storage.createCase(validatedData);
      res.status(201).json(newCase);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });

  // Update case status
  app.patch("/api/cases/:id", async (req: Request, res: Response) => {
    try {
      const case_ = await storage.getCase(req.params.id);
      if (!case_) {
        return res.status(404).json({ message: "Case not found" });
      }
      if (case_.memberId !== req.memberId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const updateSchema = insertCaseSchema.partial();
      const validatedData = updateSchema.parse(req.body);
      const updatedCase = await storage.updateCase(req.params.id, validatedData);
      res.json(updatedCase);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });

  // Get case messages
  app.get("/api/cases/:id/messages", async (req: Request, res: Response) => {
    try {
      const case_ = await storage.getCase(req.params.id);
      if (!case_) {
        return res.status(404).json({ message: "Case not found" });
      }
      if (case_.memberId !== req.memberId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const messages = await storage.getCaseMessages(req.params.id);
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Send message in case
  app.post("/api/cases/:id/messages", async (req: Request, res: Response) => {
    try {
      const case_ = await storage.getCase(req.params.id);
      if (!case_) {
        return res.status(404).json({ message: "Case not found" });
      }
      if (case_.memberId !== req.memberId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const validatedData = insertCaseMessageSchema.parse({
        ...req.body,
        caseId: req.params.id,
        senderId: req.memberId,
      });
      const newMessage = await storage.createCaseMessage(validatedData);
      res.status(201).json(newMessage);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });

  // ============================================================================
  // DOCUMENTS ROUTES
  // ============================================================================

  // List member's documents
  app.get("/api/documents", async (req: Request, res: Response) => {
    try {
      const documents = await storage.getDocumentsByMember(req.memberId!);
      res.json(documents);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get document details
  app.get("/api/documents/:id", async (req: Request, res: Response) => {
    try {
      const document = await storage.getDocument(req.params.id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      if (document.memberId !== req.memberId) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      res.json(document);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Upload new document
  app.post("/api/documents", async (req: Request, res: Response) => {
    try {
      const validatedData = insertDocumentSchema.parse({
        ...req.body,
        memberId: req.memberId,
      });
      const newDocument = await storage.createDocument(validatedData);
      res.status(201).json(newDocument);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });

  // Update document (pin, mark as read)
  app.patch("/api/documents/:id", async (req: Request, res: Response) => {
    try {
      const document = await storage.getDocument(req.params.id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      if (document.memberId !== req.memberId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const updateSchema = insertDocumentSchema.partial();
      const validatedData = updateSchema.parse(req.body);
      const updatedDocument = await storage.updateDocument(req.params.id, validatedData);
      res.json(updatedDocument);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });

  // Delete document
  app.delete("/api/documents/:id", async (req: Request, res: Response) => {
    try {
      const document = await storage.getDocument(req.params.id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      if (document.memberId !== req.memberId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      await storage.deleteDocument(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ============================================================================
  // APPOINTMENTS ROUTES
  // ============================================================================

  // List member's appointments
  app.get("/api/appointments", async (req: Request, res: Response) => {
    try {
      const appointments = await storage.getAppointmentsByMember(req.memberId!);
      res.json(appointments);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get appointment details
  app.get("/api/appointments/:id", async (req: Request, res: Response) => {
    try {
      const appointment = await storage.getAppointment(req.params.id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      if (appointment.memberId !== req.memberId) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      res.json(appointment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create appointment
  app.post("/api/appointments", async (req: Request, res: Response) => {
    try {
      const validatedData = insertAppointmentSchema.parse({
        ...req.body,
        memberId: req.memberId,
      });
      const newAppointment = await storage.createAppointment(validatedData);
      res.status(201).json(newAppointment);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });

  // Update appointment
  app.patch("/api/appointments/:id", async (req: Request, res: Response) => {
    try {
      const appointment = await storage.getAppointment(req.params.id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      if (appointment.memberId !== req.memberId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const updateSchema = insertAppointmentSchema.partial();
      const validatedData = updateSchema.parse(req.body);
      const updatedAppointment = await storage.updateAppointment(req.params.id, validatedData);
      res.json(updatedAppointment);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });

  // Cancel appointment
  app.delete("/api/appointments/:id", async (req: Request, res: Response) => {
    try {
      const appointment = await storage.getAppointment(req.params.id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      if (appointment.memberId !== req.memberId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      await storage.deleteAppointment(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ============================================================================
  // NOTIFICATIONS ROUTES
  // ============================================================================

  // List member's notifications
  app.get("/api/notifications", async (req: Request, res: Response) => {
    try {
      const notifications = await storage.getNotificationsByMember(req.memberId!);
      res.json(notifications);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Mark notification as read
  app.patch("/api/notifications/:id/read", async (req: Request, res: Response) => {
    try {
      const notification = await storage.getNotification(req.params.id);
      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }
      if (notification.memberId !== req.memberId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      await storage.markNotificationAsRead(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ============================================================================
  // MEMBER PROFILE ROUTES
  // ============================================================================

  // Get member info
  app.get("/api/member/profile", async (req: Request, res: Response) => {
    try {
      const member = await storage.getMember(req.memberId!);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.json(member);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update member info
  app.patch("/api/member/profile", async (req: Request, res: Response) => {
    try {
      const updateSchema = insertMemberSchema.partial();
      const validatedData = updateSchema.parse(req.body);
      const updatedMember = await storage.updateMember(req.memberId!, validatedData);
      res.json(updatedMember);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });

  // List dependents
  app.get("/api/member/dependents", async (req: Request, res: Response) => {
    try {
      const dependents = await storage.getDependentsByMember(req.memberId!);
      res.json(dependents);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Add dependent
  app.post("/api/member/dependents", async (req: Request, res: Response) => {
    try {
      const validatedData = insertDependentSchema.parse({
        ...req.body,
        memberId: req.memberId,
      });
      const newDependent = await storage.createDependent(validatedData);
      res.status(201).json(newDependent);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });

  // Update dependent
  app.patch("/api/member/dependents/:id", async (req: Request, res: Response) => {
    try {
      const dependent = await storage.getDependent(req.params.id);
      if (!dependent) {
        return res.status(404).json({ message: "Dependent not found" });
      }
      if (dependent.memberId !== req.memberId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const updateSchema = insertDependentSchema.partial();
      const validatedData = updateSchema.parse(req.body);
      const updatedDependent = await storage.updateDependent(req.params.id, validatedData);
      res.json(updatedDependent);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });

  // Remove dependent
  app.delete("/api/member/dependents/:id", async (req: Request, res: Response) => {
    try {
      const dependent = await storage.getDependent(req.params.id);
      if (!dependent) {
        return res.status(404).json({ message: "Dependent not found" });
      }
      if (dependent.memberId !== req.memberId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      await storage.deleteDependent(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ============================================================================
  // SERVICES ROUTES
  // ============================================================================

  // List available services
  app.get("/api/services", async (req: Request, res: Response) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ============================================================================
  // TASKS ROUTES
  // ============================================================================

  // List member's onboarding tasks
  app.get("/api/tasks", async (req: Request, res: Response) => {
    try {
      const tasks = await storage.getTasksByMember(req.memberId!);
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update task completion
  app.patch("/api/tasks/:id", async (req: Request, res: Response) => {
    try {
      const tasks = await storage.getTasksByMember(req.memberId!);
      const task = tasks.find(t => t.id === req.params.id);
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      const updateSchema = insertTaskSchema.partial();
      const validatedData = updateSchema.parse(req.body);
      const updatedTask = await storage.updateTask(req.params.id, validatedData);
      res.json(updatedTask);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
