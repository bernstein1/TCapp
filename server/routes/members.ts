import { Router, Request, Response } from "express";
import { storage } from "../storage";
import { insertMemberSchema, insertDependentSchema } from "@shared/schema";
import { z } from "zod";

const router = Router();

// Get member info
router.get("/profile", async (req: Request, res: Response) => {
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
router.patch("/profile", async (req: Request, res: Response) => {
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
router.get("/dependents", async (req: Request, res: Response) => {
    try {
        const dependents = await storage.getDependentsByMember(req.memberId!);
        res.json(dependents);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Add dependent
router.post("/dependents", async (req: Request, res: Response) => {
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
router.patch("/dependents/:id", async (req: Request, res: Response) => {
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
router.delete("/dependents/:id", async (req: Request, res: Response) => {
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

export default router;
