import { useState, useRef, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, FileText, BookOpen, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { format } from "date-fns";

type Guide = {
    id: string;
    title: string;
    description: string;
    category: string;
    steps: number;
    estimatedTime: string;
};

type Article = {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: Date;
    category: string;
    readTime: string;
};

type Source = {
    id: string;
    type: "guide" | "article";
    title: string;
    excerpt?: string;
    category: string;
    metadata?: string;
};

type ChatMessage = {
    id: string;
    role: "user" | "assistant";
    content: string;
    sources?: Source[];
    timestamp: Date;
};

type AIAssistantModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    guides: Guide[];
    articles: Article[];
};

export function AIAssistantModal({
    open,
    onOpenChange,
    guides,
    articles,
}: AIAssistantModalProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const findRelevantSources = (query: string): Source[] => {
        const keywords = query.toLowerCase();
        const relevant: Source[] = [];

        // Match guides
        guides.forEach((guide) => {
            const matchScore = calculateMatchScore(
                keywords,
                guide.title.toLowerCase(),
                guide.description.toLowerCase(),
                guide.category.toLowerCase()
            );

            if (matchScore > 0) {
                relevant.push({
                    id: guide.id,
                    type: "guide",
                    title: guide.title,
                    excerpt: guide.description,
                    category: guide.category,
                    metadata: `${guide.steps} steps • ${guide.estimatedTime}`,
                });
            }
        });

        // Match articles
        articles.forEach((article) => {
            const matchScore = calculateMatchScore(
                keywords,
                article.title.toLowerCase(),
                article.excerpt.toLowerCase(),
                article.category.toLowerCase()
            );

            if (matchScore > 0) {
                relevant.push({
                    id: article.id,
                    type: "article",
                    title: article.title,
                    excerpt: article.excerpt,
                    category: article.category,
                    metadata: `${article.readTime} • ${format(article.date, "MMM d, yyyy")}`,
                });
            }
        });

        // Sort by relevance and return top 3
        return relevant.slice(0, 3);
    };

    const calculateMatchScore = (
        query: string,
        ...fields: string[]
    ): number => {
        let score = 0;
        const queryWords = query.split(" ").filter((w) => w.length > 2);

        queryWords.forEach((word) => {
            fields.forEach((field) => {
                if (field.includes(word)) {
                    score += 1;
                }
            });
        });

        return score;
    };

    const generateResponse = (query: string, sources: Source[]): string => {
        const keywords = query.toLowerCase();

        // Keyword-based responses
        if (keywords.includes("claim") || keywords.includes("file")) {
            return "To file a claim, you'll need to gather your medical bills and receipts, then submit them through the TouchCare portal. The process typically takes 5-10 minutes and involves uploading your documentation and providing basic information about the service received.";
        }

        if (keywords.includes("provider") || keywords.includes("network")) {
            return "Finding an in-network provider is easy! You can use our provider search tool to find doctors, specialists, and facilities that are covered by your plan. Staying in-network helps you maximize your coverage and minimize out-of-pocket costs.";
        }

        if (keywords.includes("benefit") || keywords.includes("coverage")) {
            return "Your benefits summary contains important information about your coverage, including deductibles, copays, and covered services. Understanding these details helps you make informed healthcare decisions and avoid unexpected costs.";
        }

        if (keywords.includes("fsa") || keywords.includes("spending")) {
            return "Your Flexible Spending Account (FSA) card can be used for eligible medical expenses like prescriptions, copays, and certain over-the-counter items. Make sure to save your receipts for documentation purposes.";
        }

        if (keywords.includes("authorization") || keywords.includes("prior")) {
            return "Prior authorization is required for certain procedures, medications, or specialist visits. You can request authorization through the portal by providing details about the recommended treatment. The process typically takes 2-3 business days.";
        }

        if (keywords.includes("eob") || keywords.includes("explanation")) {
            return "An Explanation of Benefits (EOB) is a statement from your insurance company that shows what services were provided, what was covered, and what you may owe. It's important to review your EOBs carefully to ensure accuracy.";
        }

        if (keywords.includes("preventive") || keywords.includes("wellness")) {
            return "Preventive care services like annual checkups, screenings, and vaccinations are typically covered at no cost to you. Taking advantage of these services helps you stay healthy and catch potential issues early.";
        }

        if (keywords.includes("specialist") || keywords.includes("referral")) {
            return "When choosing a specialist, it's important to verify they're in your network and understand any referral requirements. Your primary care physician can help coordinate specialist care and ensure continuity of treatment.";
        }

        if (keywords.includes("mental health") || keywords.includes("therapy")) {
            return "Mental health services including therapy and counseling are covered under your plan. You can find in-network mental health providers through our provider directory, and many offer telehealth options for added convenience.";
        }

        // Default response
        if (sources.length > 0) {
            return `I found ${sources.length} helpful resource${sources.length > 1 ? "s" : ""} that can answer your question. These guides and articles provide detailed information to help you understand your benefits and navigate your healthcare.`;
        }

        return "I'm here to help you understand your health benefits! I can answer questions about filing claims, finding providers, understanding your coverage, using your FSA, and much more. What would you like to know?";
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Simulate AI processing
        setTimeout(() => {
            const sources = findRelevantSources(input);
            const response = generateResponse(input, sources);

            const aiMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response,
                sources: sources.length > 0 ? sources : undefined,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0" aria-label="AI Assistant Chat">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-display font-bold">
                                TouchCare AI Assistant
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground">
                                Ask questions about your benefits and resources
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                {/* Chat Messages */}
                <div
                    className="flex-1 overflow-y-auto px-6 py-4 space-y-6"
                    role="log"
                    aria-live="polite"
                    aria-atomic="false"
                >
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <Sparkles className="h-8 w-8 text-primary" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="font-display font-semibold text-xl mb-2">
                                    How can I help you today?
                                </h3>
                                <p className="text-muted-foreground max-w-md">
                                    Ask me anything about filing claims, finding providers, understanding your benefits, or using your FSA.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 max-w-2xl w-full">
                                <Button
                                    variant="outline"
                                    className="text-left justify-start h-auto py-3 px-4"
                                    onClick={() => {
                                        setInput("How do I file a claim?");
                                        setTimeout(() => {
                                            const form = document.querySelector('form[aria-label="Send message"]') as HTMLFormElement;
                                            form?.requestSubmit();
                                        }, 100);
                                    }}
                                >
                                    <FileText className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                                    <span className="text-sm">How do I file a claim?</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-left justify-start h-auto py-3 px-4"
                                    onClick={() => {
                                        setInput("How do I find in-network providers?");
                                        setTimeout(() => {
                                            const form = document.querySelector('form[aria-label="Send message"]') as HTMLFormElement;
                                            form?.requestSubmit();
                                        }, 100);
                                    }}
                                >
                                    <CheckCircle2 className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                                    <span className="text-sm">Find in-network providers</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-left justify-start h-auto py-3 px-4"
                                    onClick={() => {
                                        setInput("What is an EOB?");
                                        setTimeout(() => {
                                            const form = document.querySelector('form[aria-label="Send message"]') as HTMLFormElement;
                                            form?.requestSubmit();
                                        }, 100);
                                    }}
                                >
                                    <BookOpen className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                                    <span className="text-sm">What is an EOB?</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-left justify-start h-auto py-3 px-4"
                                    onClick={() => {
                                        setInput("How do I use my FSA card?");
                                        setTimeout(() => {
                                            const form = document.querySelector('form[aria-label="Send message"]') as HTMLFormElement;
                                            form?.requestSubmit();
                                        }, 100);
                                    }}
                                >
                                    <FileText className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                                    <span className="text-sm">Using my FSA card</span>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    {message.role === "assistant" && (
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                                        </div>
                                    )}
                                    <div
                                        className={`flex flex-col max-w-[80%] ${message.role === "user" ? "items-end" : "items-start"
                                            }`}
                                    >
                                        <div
                                            className={`rounded-2xl px-4 py-3 ${message.role === "user"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                                }`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                        </div>

                                        {/* Source Citations */}
                                        {message.sources && message.sources.length > 0 && (
                                            <div className="mt-3 space-y-2 w-full">
                                                <p className="text-xs text-muted-foreground px-1">
                                                    {message.sources.length} source{message.sources.length > 1 ? "s" : ""} found:
                                                </p>
                                                {message.sources.map((source) => (
                                                    <Card
                                                        key={source.id}
                                                        className="p-3 bg-card border-l-4 border-l-primary hover-elevate transition-all cursor-pointer"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                                {source.type === "guide" ? (
                                                                    <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
                                                                ) : (
                                                                    <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-semibold text-sm mb-1 line-clamp-1">
                                                                    {source.title}
                                                                </h4>
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Badge variant="secondary" className="text-xs">
                                                                        {source.category}
                                                                    </Badge>
                                                                    {source.metadata && (
                                                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                            <Clock className="h-3 w-3" aria-hidden="true" />
                                                                            {source.metadata}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                {source.excerpt && (
                                                                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                                                        {source.excerpt}
                                                                    </p>
                                                                )}
                                                                <Button
                                                                    variant="link"
                                                                    size="sm"
                                                                    className="h-auto p-0 text-xs"
                                                                    onClick={() => {
                                                                        // Future: Navigate to guide/article detail
                                                                        console.log(`View ${source.type}:`, source.id);
                                                                    }}
                                                                >
                                                                    View {source.type === "guide" ? "Guide" : "Article"} →
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                ))}
                                            </div>
                                        )}

                                        <span className="text-xs text-muted-foreground mt-1 px-1">
                                            {format(message.timestamp, "h:mm a")}
                                        </span>
                                    </div>
                                    {message.role === "user" && (
                                        <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-1">
                                            <span className="text-xs font-semibold text-secondary">You</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3 justify-start">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                        <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                                    </div>
                                    <div className="bg-muted rounded-2xl px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                                            <span className="text-sm text-muted-foreground">AI is thinking...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* Input Area */}
                <div className="border-t px-6 py-4">
                    <form onSubmit={handleSend} className="flex gap-2" aria-label="Send message">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question about your benefits..."
                            disabled={isLoading}
                            className="flex-1"
                            aria-label="Type your question"
                        />
                        <Button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            aria-label="Send message"
                        >
                            <Send className="h-4 w-4" aria-hidden="true" />
                        </Button>
                    </form>
                    <p className="text-xs text-muted-foreground mt-2">
                        AI responses are based on available guides and articles. For personalized assistance, please contact support.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
