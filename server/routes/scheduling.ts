import { Router, Request, Response } from "express";
import { acuityService } from "../services/acuity";
import { z } from "zod";

const router = Router();

// Validation schemas
const dateQuerySchema = z.object({
    month: z.string().regex(/^\d{4}-\d{2}$/),
    appointmentTypeID: z.string().transform(Number),
});

const timeQuerySchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    appointmentTypeID: z.string().transform(Number),
    calendarID: z.string().optional().transform(val => val ? Number(val) : undefined),
});

const createAppointmentSchema = z.object({
    datetime: z.string(),
    appointmentTypeID: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    fields: z.array(z.object({
        id: z.number(),
        value: z.string(),
    })).optional(),
});

// Get Appointment Types
router.get("/appointment-types", async (req: Request, res: Response) => {
    try {
        const types = await acuityService.getAppointmentTypes();
        res.json(types);
    } catch (error: any) {
        console.error("Error fetching appointment types:", error);
        res.status(500).json({ message: "Failed to fetch appointment types" });
    }
});

// Get Available Dates
router.get("/availability/dates", async (req: Request, res: Response) => {
    try {
        const { month, appointmentTypeID } = dateQuerySchema.parse(req.query);
        const dates = await acuityService.getAvailableDates(appointmentTypeID, month);
        res.json(dates);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Invalid query parameters", errors: error.errors });
        }
        console.error("Error fetching available dates:", error);
        res.status(500).json({ message: "Failed to fetch available dates" });
    }
});

// Get Available Times
router.get("/availability/times", async (req: Request, res: Response) => {
    try {
        const { date, appointmentTypeID, calendarID } = timeQuerySchema.parse(req.query);
        const times = await acuityService.getAvailableTimes(appointmentTypeID, date, calendarID);
        res.json(times);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Invalid query parameters", errors: error.errors });
        }
        console.error("Error fetching available times:", error);
        res.status(500).json({ message: "Failed to fetch available times" });
    }
});

// Create Appointment
router.post("/appointments", async (req: Request, res: Response) => {
    try {
        const data = createAppointmentSchema.parse(req.body);
        const appointment = await acuityService.createAppointment(data);
        res.status(201).json(appointment);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Validation error", errors: error.errors });
        }
        console.error("Error creating appointment:", error);
        res.status(500).json({ message: "Failed to create appointment" });
    }
});

// Get User Appointments
router.get("/appointments", async (req: Request, res: Response) => {
    try {
        // In a real app, we'd get the email from the authenticated user session
        // For now, we'll accept it as a query param for testing, but verify it matches the logged in user if possible
        const email = req.query.email as string;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const appointments = await acuityService.getUserAppointments(email);
        res.json(appointments);
    } catch (error: any) {
        console.error("Error fetching user appointments:", error);
        res.status(500).json({ message: "Failed to fetch appointments" });
    }
});

// Reschedule Appointment
router.put("/appointments/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { datetime } = req.body;

        if (!datetime) {
            return res.status(400).json({ message: "New datetime is required" });
        }

        const result = await acuityService.rescheduleAppointment(id, datetime);
        res.json(result);
    } catch (error: any) {
        console.error("Error rescheduling appointment:", error);
        res.status(500).json({ message: "Failed to reschedule appointment" });
    }
});

// Cancel Appointment
router.delete("/appointments/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await acuityService.cancelAppointment(id);
        res.json(result);
    } catch (error: any) {
        console.error("Error canceling appointment:", error);
        res.status(500).json({ message: "Failed to cancel appointment" });
    }
});

export default router;
