import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { TaskBar, type Task } from "@/components/TaskBar";
import { CaseCard, type Case } from "@/components/CaseCard";
import { NotificationItem, type Notification } from "@/components/NotificationItem";
import { AppointmentCard, type Appointment } from "@/components/AppointmentCard";
import { NewCaseModal } from "@/components/NewCaseModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MessageCircle,
  Calendar,
  FileText,
  ChevronRight
} from "lucide-react";

// Check if user prefers reduced motion
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animation variants for staggered entry
const containerVariants = {
  hidden: { opacity: prefersReducedMotion ? 1 : 0 },
  visible: {
    opacity: 1,
    transition: prefersReducedMotion ? {} : {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: prefersReducedMotion ? {} : {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);

  //todo: remove mock functionality
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Add dependent information",
      description: "Add details about your family members",
      completed: false,
      required: true,
    },
    {
      id: "2",
      title: "Upload insurance card",
      description: "Take a photo of your insurance card",
      completed: true,
      required: true,
    },
    {
      id: "3",
      title: "Verify phone number",
      description: "Confirm your contact information",
      completed: false,
      required: false,
    },
    {
      id: "4",
      title: "Create your first case",
      description: "Start a conversation with our support team",
      completed: false,
      required: false,
    },
  ]);

  const mockCases: Case[] = [
    {
      id: "1",
      subject: "Coverage question for specialist",
      lastMessage: "I can help you with that! Let me look up your coverage...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: "in_progress",
      unreadCount: 2,
      agentName: "Sarah Johnson",
    },
    {
      id: "2",
      subject: "Claim status inquiry",
      lastMessage: "Your claim has been processed and approved.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: "resolved",
      unreadCount: 0,
      agentName: "Michael Chen",
    },
  ];

  const mockNotifications: Notification[] = [
    {
      id: "1",
      type: "case_update",
      title: "New message in your case",
      message: "Sarah has responded to your coverage question.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      read: false,
    },
    {
      id: "2",
      type: "document",
      title: "New document uploaded",
      message: "Your EOB is now available to view.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      read: true,
    },
  ];

  const mockAppointment: Appointment = {
    id: "1",
    type: "Benefits Consultation",
    dateTime: new Date(Date.now() + 1000 * 60 * 60 * 24),
    duration: 30,
    consultantName: "Dr. Emily Martinez",
    format: "video",
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero/Welcome Banner */}
        <Card className="mb-6 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="font-display font-bold text-3xl lg:text-4xl mb-2" data-testid="text-dashboard-title">
                  Welcome back,{" "}
                  <span
                    className="cursor-pointer hover:text-primary transition-colors underline decoration-primary/30 hover:decoration-primary"
                    onClick={() => setLocation("/settings")}
                    data-testid="link-user-name"
                  >
                    John
                  </span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Here's what's happening with your health benefits
                </p>
              </div>
              <Button
                size="lg"
                className="w-full lg:w-auto"
                data-testid="button-hero-new-case"
                onClick={() => setShowNewCaseModal(true)}
              >
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                New Case
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions - Center Top */}
        <motion.div
          className="mb-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h2 className="font-display font-bold text-xl mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2 w-full"
                data-testid="button-quick-schedule"
                onClick={() => setLocation("/schedule")}
              >
                <Calendar className="h-8 w-8" aria-hidden="true" />
                <span className="text-sm">Schedule</span>
              </Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2 w-full"
                data-testid="button-quick-documents"
                onClick={() => setLocation("/documents")}
              >
                <FileText className="h-8 w-8" aria-hidden="true" />
                <span className="text-sm">Documents</span>
              </Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2 w-full"
                data-testid="button-quick-message"
                onClick={() => setShowNewCaseModal(true)}
              >
                <MessageCircle className="h-8 w-8" aria-hidden="true" />
                <span className="text-sm">Message Us</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Task Bar */}
            <TaskBar
              tasks={tasks}
              onTaskToggle={(taskId) => {
                setTasks(tasks.map(t =>
                  t.id === taskId ? { ...t, completed: !t.completed } : t
                ));
              }}
              onTaskClick={(taskId) => {
                const task = tasks.find(t => t.id === taskId);
                if (task?.title.includes("dependent")) setLocation("/settings");
                if (task?.title.includes("insurance card")) setLocation("/documents");
                if (task?.title.includes("phone")) setLocation("/settings");
                if (task?.title.includes("first case")) setShowNewCaseModal(true);
              }}
            />

            {/* Active Cases */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-xl">Active Cases</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  data-testid="button-view-all-cases"
                  onClick={() => setLocation("/cases")}
                >
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <motion.div
                className="space-y-3"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {mockCases.map((case_) => (
                  <motion.div key={case_.id} variants={itemVariants}>
                    <CaseCard
                      case_={case_}
                      onClick={() => setLocation(`/cases/${case_.id}`)}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <Button
                variant="outline"
                className="w-full mt-4"
                data-testid="button-new-case"
                onClick={() => setShowNewCaseModal(true)}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Start New Conversation
              </Button>
            </div>
          </div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Notifications - Moved to Right Side */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-xl">Notifications</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  data-testid="button-view-all-notifications"
                  onClick={() => setLocation("/settings")}
                >
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <Card>
                <div className="divide-y">
                  {mockNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onClick={() => {
                        if (notification.type === "case_update") setLocation("/cases");
                        if (notification.type === "document") setLocation("/documents");
                      }}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Upcoming Appointment */}
            <motion.div variants={itemVariants}>
              <h2 className="font-display font-bold text-xl mb-4">Upcoming Appointment</h2>
              <AppointmentCard
                appointment={mockAppointment}
                onReschedule={() => setLocation("/schedule")}
                onCancel={() => setLocation("/schedule")}
                onJoin={() => setLocation("/schedule")}
                onAddToCalendar={() => {
                  // In a real app, this would generate an .ics file or use a calendar API
                  alert("Adding appointment to calendar...");
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <NewCaseModal open={showNewCaseModal} onClose={() => setShowNewCaseModal(false)} />
    </div>
  );
}
