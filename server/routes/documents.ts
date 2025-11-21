import { Router, Request, Response } from "express";
import { storage } from "../storage";
import { insertDocumentSchema } from "@shared/schema";
import { z } from "zod";

const router = Router();

// List member's documents
router.get("/", async (req: Request, res: Response) => {
    try {
        const documents = await storage.getDocumentsByMember(req.memberId!);
        res.json(documents);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get document details
router.get("/:id", async (req: Request, res: Response) => {
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
router.post("/", async (req: Request, res: Response) => {
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
router.patch("/:id", async (req: Request, res: Response) => {
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
router.delete("/:id", async (req: Request, res: Response) => {
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

export default router;
