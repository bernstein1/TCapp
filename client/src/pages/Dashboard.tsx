import { useState } from "react";
import { TaskBar, type Task } from "@/components/TaskBar";
import { CaseCard, type Case } from "@/components/CaseCard";
import { NotificationItem, type Notification } from "@/components/NotificationItem";
import { AppointmentCard, type Appointment } from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  MessageCircle, 
  CreditCard, 
  Calendar, 
  FileText,
  ChevronRight
} from "lucide-react";

export default function Dashboard() {
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
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl mb-2" data-testid="text-dashboard-title">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your health benefits
          </p>
        </div>

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
              onTaskClick={(taskId) => console.log('Task clicked:', taskId)}
            />

            {/* Active Cases */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-xl">Active Cases</h2>
                <Button variant="ghost" size="sm" data-testid="button-view-all-cases">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {mockCases.map((case_) => (
                  <CaseCard
                    key={case_.id}
                    case_={case_}
                    onClick={() => console.log('Open case:', case_.id)}
                  />
                ))}
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4"
                data-testid="button-new-case"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Start New Conversation
              </Button>
            </div>

            {/* Notifications */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-xl">Notifications</h2>
                <Button variant="ghost" size="sm" data-testid="button-view-all-notifications">
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
                      onClick={() => console.log('Open notification:', notification.id)}
                    />
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            {/* Upcoming Appointment */}
            <div>
              <h2 className="font-display font-bold text-xl mb-4">Upcoming Appointment</h2>
              <AppointmentCard
                appointment={mockAppointment}
                onReschedule={() => console.log('Reschedule')}
                onCancel={() => console.log('Cancel')}
                onJoin={() => console.log('Join')}
              />
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="font-display font-bold text-xl mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col gap-2"
                  data-testid="button-quick-wallet"
                >
                  <CreditCard className="h-6 w-6" />
                  <span className="text-sm">View ID Card</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col gap-2"
                  data-testid="button-quick-schedule"
                >
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Schedule</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col gap-2"
                  data-testid="button-quick-documents"
                >
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Documents</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col gap-2"
                  data-testid="button-quick-message"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span className="text-sm">Message Us</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
