import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, ExternalLink, BookOpen, Megaphone, Bot, FileText, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { useLocation } from "wouter";
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
  const [, setLocation] = useLocation();
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
      title: "Same Pill, Different Price: How to Find the Best Deal on Your Medications",
      excerpt: "Stop overpaying for prescriptions. Compare costs across pharmacies, explore mail-order options, and learn when discount programs beat your insurance price.",
      author: "TouchCare Team",
      date: new Date(2025, 10, 3),
      category: "Prescription Savings",
      readTime: "8 min read",
    },
    {
      id: "2",
      title: "The 5 Most Expensive Medicare Mistakes (and How to Avoid Them)",
      excerpt: "Medicare mistakes can be expensive and permanent. Discover the 5 most common errors people make with enrollment, plan selection, and coverage decisions.",
      author: "TouchCare Team",
      date: new Date(2025, 9, 1),
      category: "Medicare & Benefits",
      readTime: "7 min read",
    },
    {
      id: "3",
      title: "Science-Backed Ways to Take the Edge Off Stress",
      excerpt: "Discover science-backed stress relief techniques like breathwork, cold exposure, and movement—plus how TouchCare can guide you to covered wellness options.",
      author: "TouchCare Team",
      date: new Date(2025, 8, 2),
      category: "Wellness",
      readTime: "6 min read",
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
      description: "Step-by-step instructions for submitting medical, dental, and vision claims. Upload your bill, and we'll coordinate with providers to ensure accuracy and handle any discrepancies.",
      category: "Claims",
      steps: 5,
      estimatedTime: "10 minutes",
    },
    {
      id: "2",
      title: "Finding In-Network Providers",
      description: "We assess every provider based on location, cost, specialty type, and gender preference. Our Health Assistants carefully match you with in-network providers and can even schedule appointments for you.",
      category: "Provider Network",
      steps: 4,
      estimatedTime: "8 minutes",
    },
    {
      id: "3",
      title: "Understanding Your Benefits Summary",
      description: "Schedule a confidential deep-dive consultation to review your health plan, ask detailed questions, and understand your medical, dental, vision, FSA, HSA, and HRA benefits.",
      category: "Coverage",
      steps: 6,
      estimatedTime: "12 minutes",
    },
    {
      id: "4",
      title: "Getting Cost Transparency Before Procedures",
      description: "Learn your precise costs before any test or procedure. We provide clear side-by-side comparisons to help you find high-quality, low-cost options and avoid overpaying.",
      category: "Cost Savings",
      steps: 3,
      estimatedTime: "5 minutes",
    },
    {
      id: "5",
      title: "RxCare: Saving Money on Prescriptions",
      description: "Understand your pharmaceutical benefits and discover the lowest-cost prescription options. We'll explore mail-order services, discount programs, and creative ways to save money.",
      category: "Prescriptions",
      steps: 4,
      estimatedTime: "7 minutes",
    },
    {
      id: "6",
      title: "Open Enrollment: Making the Right Choice",
      description: "Get personalized support during open enrollment. We'll help you understand plan options, estimate costs, and select benefits that match your unique healthcare needs.",
      category: "Benefits Selection",
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
                  onClick={() => setLocation(`/resources/guides/${guide.id}`)}
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
                      <Button variant="ghost" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        setLocation(`/resources/guides/${guide.id}`);
                      }}>
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
                  onClick={() => setLocation(`/resources/articles/${article.id}`)}
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
                      <Button variant="ghost" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        setLocation(`/resources/articles/${article.id}`);
                      }}>
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
