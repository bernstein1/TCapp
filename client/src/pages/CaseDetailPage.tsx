import { useState, useRef, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Message = {
  id: string;
  senderId: string;
  senderType: "member" | "agent";
  message: string;
  timestamp: Date;
};

type CaseStatus = "open" | "in_progress" | "waiting_on_you" | "resolved";

const statusConfig: Record<CaseStatus, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-secondary text-secondary-foreground" },
  in_progress: { label: "In Progress", className: "bg-chart-2 text-white" },
  waiting_on_you: { label: "Waiting on You", className: "bg-primary text-primary-foreground" },
  resolved: { label: "Resolved", className: "bg-green-600 text-white" },
};

export default function CaseDetailPage() {
  const [, params] = useRoute("/cases/:id");
  const [, setLocation] = useLocation();
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock case data
  const caseData = {
    id: params?.id || "1",
    subject: "Coverage question for specialist visit",
    status: "in_progress" as CaseStatus,
    agentName: "Sarah Johnson",
    agentAvatar: undefined,
  };

  // Mock messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "member",
      senderType: "member",
      message: "Hi, I have a question about my coverage for a specialist visit. Is a referral required?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: "2",
      senderId: "agent",
      senderType: "agent",
      message: "Hello! I'd be happy to help you with that. Let me look up your coverage details.",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: "3",
      senderId: "agent",
      senderType: "agent",
      message: "Based on your plan, you do not need a referral for in-network specialists. However, pre-authorization may be required for certain procedures.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "4",
      senderId: "member",
      senderType: "member",
      message: "Great, thank you! What about out-of-network specialists?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: "5",
      senderId: "agent",
      senderType: "agent",
      message: "For out-of-network specialists, your plan covers 60% after you meet your out-of-network deductible of $2,000. Would you like me to help you find an in-network specialist?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  ]);

  const agentInitials = caseData.agentName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "member",
      senderType: "member",
      message: messageInput,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");

    // Simulate agent response after a delay
    setTimeout(() => {
      const agentResponse: Message = {
        id: `msg-${Date.now()}-agent`,
        senderId: "agent",
        senderType: "agent",
        message: "Thanks for your message! I'm reviewing your question and will respond shortly.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentResponse]);
    }, 2000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const config = statusConfig[caseData.status];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/cases")}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="font-display font-bold text-xl mb-1" data-testid="text-case-subject">
                {caseData.subject}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Case #{caseData.id}</span>
                <span>•</span>
                <Badge variant="secondary" className={config.className}>
                  {config.label}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={caseData.agentAvatar} alt={caseData.agentName} />
              <AvatarFallback>{agentInitials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{caseData.agentName}</p>
              <p className="text-xs text-muted-foreground">Support Agent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.senderType === "member" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="h-8 w-8 shrink-0">
                {message.senderType === "agent" ? (
                  <>
                    <AvatarImage src={caseData.agentAvatar} alt={caseData.agentName} />
                    <AvatarFallback>{agentInitials}</AvatarFallback>
                  </>
                ) : (
                  <AvatarFallback>JD</AvatarFallback>
                )}
              </Avatar>

              <div
                className={`flex flex-col ${
                  message.senderType === "member" ? "items-end" : "items-start"
                } flex-1`}
              >
                <Card
                  className={`p-3 max-w-[70%] ${
                    message.senderType === "member"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                </Card>
                <span className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              data-testid="button-attach"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1"
              data-testid="input-message"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              data-testid="button-send"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
