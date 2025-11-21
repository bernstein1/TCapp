import { Router, Request, Response } from "express";
import { storage } from "../storage";

const router = Router();

// List member's notifications
router.get("/", async (req: Request, res: Response) => {
    try {
        const notifications = await storage.getNotificationsByMember(req.memberId!);
        res.json(notifications);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Mark notification as read
router.patch("/:id/read", async (req: Request, res: Response) => {
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

export default router;
