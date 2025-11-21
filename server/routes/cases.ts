import { Router, Request, Response } from "express";
import { storage } from "../storage";
import { insertCaseSchema, insertCaseMessageSchema } from "@shared/schema";
import { z } from "zod";

const router = Router();

// List all cases for current member
router.get("/", async (req: Request, res: Response) => {
    try {
        const cases = await storage.getCasesByMember(req.memberId!);
        res.json(cases);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get specific case details
router.get("/:id", async (req: Request, res: Response) => {
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
router.post("/", async (req: Request, res: Response) => {
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
router.patch("/:id", async (req: Request, res: Response) => {
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
router.get("/:id/messages", async (req: Request, res: Response) => {
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
router.post("/:id/messages", async (req: Request, res: Response) => {
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

export default router;
