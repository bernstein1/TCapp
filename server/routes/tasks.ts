import { Router, Request, Response } from "express";
import { storage } from "../storage";
import { insertTaskSchema } from "@shared/schema";
import { z } from "zod";

const router = Router();

// List member's onboarding tasks
router.get("/", async (req: Request, res: Response) => {
    try {
        const tasks = await storage.getTasksByMember(req.memberId!);
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Update task completion
router.patch("/:id", async (req: Request, res: Response) => {
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

export default router;
