import { Router, Request, Response } from "express";
import { storage } from "../storage";

// Mock auth middleware - hardcoded test member for development
const MOCK_MEMBER_ID = "912da39b-1f75-4adc-90b9-06b77bc454c4";

const router = Router();

// Get current authenticated user
router.get("/user", async (req: Request, res: Response) => {
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

export default router;
