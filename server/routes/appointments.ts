import { Router, Request, Response } from "express";
import { storage } from "../storage";
import { insertAppointmentSchema } from "@shared/schema";
import { z } from "zod";

const router = Router();

// List member's appointments
router.get("/", async (req: Request, res: Response) => {
    try {
        const appointments = await storage.getAppointmentsByMember(req.memberId!);
        res.json(appointments);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get appointment details
router.get("/:id", async (req: Request, res: Response) => {
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
router.post("/", async (req: Request, res: Response) => {
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
router.patch("/:id", async (req: Request, res: Response) => {
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
router.delete("/:id", async (req: Request, res: Response) => {
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

export default router;
