import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, ExternalLink, BookOpen, Megaphone, Bot, FileText, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { AIAssistantModal } from "@/components/AIAssistantModal";


type Announcement = {
  id: string;
  title: string;
  content: string;
  date: Date;
  priority: "normal" | "important";
};

type Article = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: Date;
  category: string;
  readTime: string;
  image?: string;
};

type Webinar = {
  id: string;
  title: string;
  description: string;
  date: Date;
  duration: string;
  presenter: string;
  registered: boolean;
};

type Guide = {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: number;
  estimatedTime: string;
};

export default function ResourcesPage() {
  const [showAIAgent, setShowAIAgent] = useState(false);
  // Mock data
  const announcements: Announcement[] = [
    {
      id: "1",
      title: "New Telehealth Benefits Available",
      content: "We're excited to announce expanded telehealth coverage for all members. You can now access virtual consultations with no copay for primary care visits.",
      date: new Date(2024, 10, 12),
      priority: "important",
    },
    {
      id: "2",
      title: "Annual Benefits Review Coming Soon",
      content: "Your annual benefits review period starts December 1st. Take time to review your current coverage and make any necessary changes for the upcoming year.",
      date: new Date(2024, 10, 8),
      priority: "normal",
    },
    {
      id: "3",
      title: "Wellness Program Updates",
      content: "Our wellness program has been enhanced with new fitness tracking integrations and incentive rewards. Check your account to see your eligible rewards.",
      date: new Date(2024, 10, 5),
      priority: "normal",
    },
  ];

  const articles: Article[] = [
    {
      id: "1",
      title: "Understanding Your Explanation of Benefits (EOB)",
      excerpt: "Learn how to read and understand your EOB statements, including what each section means and how to identify potential billing errors.",
      author: "Dr. Sarah Johnson",
      date: new Date(2024, 10, 10),
      category: "Claims & Coverage",
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "Preventive Care: Your Health Insurance's Best-Kept Secret",
      excerpt: "Discover the preventive care services covered at no cost to you, including annual checkups, screenings, and vaccinations.",
      author: "Emily Chen, RN",
      date: new Date(2024, 10, 5),
      category: "Wellness",
      readTime: "7 min read",
    },
    {
      id: "3",
      title: "Choosing the Right Specialist: A Member's Guide",
      excerpt: "Navigate the process of finding and selecting the right specialist for your healthcare needs while staying in-network.",
      author: "Michael Rodriguez, Benefits Advisor",
      date: new Date(2024, 9, 28),
      category: "Provider Network",
      readTime: "6 min read",
    },
    {
      id: "4",
      title: "Mental Health Coverage: What You Need to Know",
      excerpt: "Understanding your mental health benefits, including therapy coverage, counseling services, and support resources available to you.",
      author: "Dr. Amanda Lee, PsyD",
      date: new Date(2024, 9, 20),
      category: "Mental Health",
      readTime: "8 min read",
    },
  ];

  const webinars: Webinar[] = [
    {
      id: "1",
      title: "Maximizing Your Health Benefits in 2025",
      description: "Join us for an interactive session where we'll walk through strategies to get the most value from your health insurance plan, including tips for choosing providers, understanding costs, and utilizing preventive care.",
      date: new Date(2024, 11, 15, 14, 0),
      duration: "1 hour",
      presenter: "Jennifer Martinez, Benefits Specialist",
      registered: false,
    },
    {
      id: "2",
      title: "Navigating Prescription Drug Coverage",
      description: "Learn about your pharmacy benefits, including how to find covered medications, use mail-order services, and save money on prescriptions.",
      date: new Date(2024, 11, 20, 13, 0),
      duration: "45 minutes",
      presenter: "Robert Chen, PharmD",
      registered: true,
    },
    {
      id: "3",
      title: "Understanding Deductibles, Copays, and Out-of-Pocket Maximums",
      description: "Demystify common insurance terms and learn how they impact your healthcare costs throughout the year.",
      date: new Date(2025, 0, 10, 15, 0),
      duration: "30 minutes",
      presenter: "Lisa Thompson, Insurance Counselor",
      registered: false,
    },
  ];

  const guides: Guide[] = [
    {
      id: "1",
      title: "How to File a Claim",
      description: "Step-by-step instructions for submitting medical, dental, and vision claims through the TouchCare portal.",
      category: "Claims",
      steps: 5,
      estimatedTime: "10 minutes",
    },
    {
      id: "2",
      title: "Finding In-Network Providers",
      description: "Learn how to search and verify providers in your network to maximize coverage and minimize out-of-pocket costs.",
      category: "Provider Network",
      steps: 4,
      estimatedTime: "8 minutes",
    },
    {
      id: "3",
      title: "Understanding Your Benefits Summary",
      description: "A comprehensive guide to reading and understanding your Summary of Benefits and Coverage (SBC) document.",
      category: "Coverage",
      steps: 6,
      estimatedTime: "12 minutes",
    },
    {
      id: "4",
      title: "Setting Up Direct Deposit for Reimbursements",
      description: "Quick guide to configure direct deposit for faster claim reimbursements and FSA distributions.",
      category: "Account Management",
      steps: 3,
      estimatedTime: "5 minutes",
    },
    {
      id: "5",
      title: "Using Your FSA Card",
      description: "Everything you need to know about using your Flexible Spending Account card for eligible expenses.",
      category: "FSA",
      steps: 4,
      estimatedTime: "7 minutes",
    },
    {
      id: "6",
      title: "Requesting Prior Authorization",
      description: "Step-by-step process for obtaining prior authorization for procedures, medications, or specialist visits.",
      category: "Coverage",
      steps: 7,
      estimatedTime: "15 minutes",
    },
  ];

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl mb-2" data-testid="text-resources-title">
            Resources & Learning
          </h1>
          <p className="text-muted-foreground">
            Stay informed with the latest updates, educational content, and upcoming events
          </p>
        </div>

        {/* AI Agent Feature */}
        <Card className="mb-6 bg-gradient-to-r from-chart-2/10 via-chart-2/5 to-background">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-chart-2/20 flex items-center justify-center shrink-0">
                <Bot className="h-8 w-8 text-chart-2" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl mb-2">TouchCare AI Assistant</h3>
                <p className="text-muted-foreground">
                  Get instant answers to your benefits questions with our AI-powered assistant. Available 24/7 to help you understand your coverage, find providers, and navigate your health benefits.
                </p>
              </div>
              <Button
                size="lg"
                className="w-full lg:w-auto"
                onClick={() => setShowAIAgent(true)}
                data-testid="button-ai-agent"
              >
                <Bot className="mr-2 h-5 w-5" />
                Chat with AI Assistant
              </Button>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="announcements" className="w-full">
          <TabsList className="mb-6 w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="announcements" data-testid="tab-announcements">
              <Megaphone className="h-4 w-4 mr-2" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="guides" data-testid="tab-guides">
              <FileText className="h-4 w-4 mr-2" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="articles" data-testid="tab-articles">
              <BookOpen className="h-4 w-4 mr-2" />
              Blog Articles
            </TabsTrigger>
            <TabsTrigger value="webinars" data-testid="tab-webinars">
              <Calendar className="h-4 w-4 mr-2" />
              Webinars
            </TabsTrigger>
          </TabsList>

          {/* Announcements */}
          <TabsContent value="announcements" className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Megaphone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-lg">{announcement.title}</h3>
                      {announcement.priority === "important" && (
                        <Badge variant="default">Important</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {announcement.content}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(announcement.date, "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Guides */}
          <TabsContent value="guides">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide) => (
                <Card
                  key={guide.id}
                  className="hover-elevate cursor-pointer transition-all"
                  data-testid={`guide-${guide.id}`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{guide.category}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {guide.estimatedTime}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{guide.title}</h3>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {guide.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{guide.steps} steps</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Guide
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Blog Articles */}
          <TabsContent value="articles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden hover-elevate cursor-pointer transition-all"
                  data-testid={`article-${article.id}`}
                >
                  {/* Article image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary/20" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        <p className="font-medium">{article.author}</p>
                        <p>{format(article.date, "MMM d, yyyy")}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Read More
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Webinars */}
          <TabsContent value="webinars" className="space-y-4">
            {webinars.map((webinar) => (
              <Card key={webinar.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    <div className="h-12 w-12 rounded-lg bg-chart-2/10 flex items-center justify-center shrink-0">
                      <Calendar className="h-6 w-6 text-chart-2" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{webinar.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {webinar.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(webinar.date, "MMM d, yyyy 'at' h:mm a")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {webinar.duration}
                        </span>
                      </div>
                      <p className="text-sm mt-2">
                        <span className="text-muted-foreground">Presenter:</span>{" "}
                        <span className="font-medium">{webinar.presenter}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 lg:flex-col lg:items-end">
                    {webinar.registered ? (
                      <>
                        <Badge variant="default" className="bg-green-600">Registered</Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" data-testid={`button-register-${webinar.id}`}>
                        Register Now
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* AI Assistant Modal */}
        <AIAssistantModal
          open={showAIAgent}
          onOpenChange={setShowAIAgent}
          guides={guides}
          articles={articles}
        />
      </div>
    </div>
  );
}
