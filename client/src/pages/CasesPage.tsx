import { useState } from "react";
import { useLocation } from "wouter";
import { CaseCard, type Case } from "@/components/CaseCard";
import { NewCaseModal } from "@/components/NewCaseModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageCircle, Filter } from "lucide-react";

export default function CasesPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);

  //todo: remove mock functionality
  const mockCases: Case[] = [
    {
      id: "1",
      subject: "Coverage question for specialist visit",
      lastMessage: "I can help you with that! Let me look up your coverage details...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: "in_progress",
      unreadCount: 2,
      agentName: "Sarah Johnson",
    },
    {
      id: "2",
      subject: "Claim status inquiry",
      lastMessage: "Your claim has been processed and approved. You should receive payment within 5-7 business days.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: "resolved",
      unreadCount: 0,
      agentName: "Michael Chen",
    },
    {
      id: "3",
      subject: "Provider network question",
      lastMessage: "Waiting for your response...",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: "waiting_on_you",
      unreadCount: 1,
      agentName: "Emily Rodriguez",
    },
    {
      id: "4",
      subject: "Prescription coverage inquiry",
      lastMessage: "I've submitted your request to our pharmacy benefits team.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      status: "open",
      unreadCount: 0,
      agentName: "David Park",
    },
  ];

  const filterByStatus = (status?: string) => {
    if (!status) return mockCases;
    return mockCases.filter(c => c.status === status);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl mb-2" data-testid="text-cases-title">
            Cases
          </h1>
          <p className="text-muted-foreground">
            View and manage your conversations with TouchCare support
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-cases"
            />
          </div>
          <Button variant="outline" data-testid="button-filter-cases">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button
            data-testid="button-new-case"
            onClick={() => setShowNewCaseModal(true)}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </div>

        {/* Case Filters */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 w-full sm:w-auto">
            <TabsTrigger value="all" data-testid="tab-all-cases">All</TabsTrigger>
            <TabsTrigger value="open" data-testid="tab-open">Open</TabsTrigger>
            <TabsTrigger value="in_progress" data-testid="tab-in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="waiting_on_you" data-testid="tab-waiting">Waiting on You</TabsTrigger>
            <TabsTrigger value="resolved" data-testid="tab-resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {mockCases.map((case_) => (
              <CaseCard
                key={case_.id}
                case_={case_}
                onClick={() => setLocation(`/cases/${case_.id}`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="open" className="space-y-3">
            {filterByStatus("open").map((case_) => (
              <CaseCard
                key={case_.id}
                case_={case_}
                onClick={() => setLocation(`/cases/${case_.id}`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="in_progress" className="space-y-3">
            {filterByStatus("in_progress").map((case_) => (
              <CaseCard
                key={case_.id}
                case_={case_}
                onClick={() => setLocation(`/cases/${case_.id}`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="waiting_on_you" className="space-y-3">
            {filterByStatus("waiting_on_you").map((case_) => (
              <CaseCard
                key={case_.id}
                case_={case_}
                onClick={() => setLocation(`/cases/${case_.id}`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-3">
            {filterByStatus("resolved").map((case_) => (
              <CaseCard
                key={case_.id}
                case_={case_}
                onClick={() => setLocation(`/cases/${case_.id}`)}
              />
            ))}
          </TabsContent>
        </Tabs>

        <NewCaseModal open={showNewCaseModal} onClose={() => setShowNewCaseModal(false)} />
      </div>
    </div>
  );
}
