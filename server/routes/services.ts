import { Router, Request, Response } from "express";
import { storage } from "../storage";

const router = Router();

// List available services
router.get("/", async (req: Request, res: Response) => {
    try {
        const services = await storage.getServices();
        res.json(services);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
