import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, Clock, CheckCircle2, Circle, Lightbulb, Printer } from "lucide-react";
import { guidesData } from "@/data/guide-data";
import { useState, useEffect } from "react";

export default function GuideDetailPage() {
    const params = useParams();
    const [, setLocation] = useLocation();
    const guideId = params.id;

    const guide = guidesData.find((g) => g.id === guideId);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!guide) {
        return (
            <div className="min-h-screen p-4 lg:p-8 flex items-center justify-center">
                <Card className="p-8 text-center">
                    <h2 className="font-display font-bold text-2xl mb-2">Guide Not Found</h2>
                    <p className="text-muted-foreground mb-4">
                        The guide you're looking for doesn't exist or has been moved.
                    </p>
                    <Button onClick={() => setLocation("/resources")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Resources
                    </Button>
                </Card>
            </div>
        );
    }

    const toggleStepCompletion = (stepNumber: number) => {
        setCompletedSteps((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(stepNumber)) {
                newSet.delete(stepNumber);
            } else {
                newSet.add(stepNumber);
            }
            return newSet;
        });
    };

    const progress = (completedSteps.size / guide.steps.length) * 100;

    const difficultyColor = {
        Beginner: "bg-green-500/10 text-green-700 dark:text-green-400",
        Intermediate: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
        Advanced: "bg-red-500/10 text-red-700 dark:text-red-400",
    };

    return (
        <div className="min-h-screen pb-12">
            {/* Header */}
            <div className="bg-gradient-to-br from-chart-2/10 via-primary/10 to-background py-8 lg:py-12 border-b">
                <div className="container max-w-5xl mx-auto px-4">
                    <Button
                        variant="ghost"
                        onClick={() => setLocation("/resources")}
                        className="mb-6 hover-elevate"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Resources
                    </Button>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge variant="default">{guide.category}</Badge>
                        <Badge className={difficultyColor[guide.difficulty]}>
                            {guide.difficulty}
                        </Badge>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {guide.estimatedTime}
                        </span>
                    </div>

                    <h1 className="font-display font-bold text-3xl lg:text-4xl mb-4">
                        {guide.title}
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-3xl">
                        {guide.description}
                    </p>
                </div>
            </div>

            {/* Progress Bar - Sticky */}
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
                <div className="container max-w-5xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Your Progress</span>
                                <span className="text-sm text-muted-foreground">
                                    {completedSteps.size} of {guide.steps.length} steps
                                </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </div>
                        <Button variant="outline" size="sm" onClick={() => window.print()}>
                            <Printer className="h-4 w-4 mr-2" />
                            Print
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container max-w-5xl mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Accordion type="multiple" className="space-y-4">
                            {guide.steps.map((step) => {
                                const isCompleted = completedSteps.has(step.stepNumber);
                                return (
                                    <AccordionItem
                                        key={step.stepNumber}
                                        value={`step-${step.stepNumber}`}
                                        className="border-none"
                                    >
                                        <Card className="overflow-hidden hover-elevate transition-all">
                                            {/* Step Header */}
                                            <div className="flex items-start gap-4 p-6">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleStepCompletion(step.stepNumber);
                                                    }}
                                                    className="shrink-0 mt-1 transition-transform hover:scale-110"
                                                >
                                                    {isCompleted ? (
                                                        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                                                            <CheckCircle2 className="h-5 w-5 text-white" />
                                                        </div>
                                                    ) : (
                                                        <div className="h-8 w-8 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center hover:border-primary transition-colors">
                                                            <Circle className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </button>

                                                <div className="flex-1 min-w-0">
                                                    <AccordionTrigger className="hover:no-underline py-0">
                                                        <div className="flex-1 text-left">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-xs font-medium text-muted-foreground">
                                                                    STEP {step.stepNumber}
                                                                </span>
                                                                {step.estimatedTime && (
                                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                        <Clock className="h-3 w-3" />
                                                                        {step.estimatedTime}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <h3
                                                                className={`font-semibold text-lg ${isCompleted ? "line-through text-muted-foreground" : ""
                                                                    }`}
                                                            >
                                                                {step.title}
                                                            </h3>
                                                        </div>
                                                    </AccordionTrigger>
                                                </div>
                                            </div>

                                            <AccordionContent className="px-6 pb-6 pt-0">
                                                <div className="ml-12 space-y-4">
                                                    <p className="text-foreground/90 leading-relaxed">
                                                        {step.description}
                                                    </p>

                                                    {step.tips && step.tips.length > 0 && (
                                                        <div className="bg-chart-2/10 rounded-lg p-4 mt-4">
                                                            <div className="flex items-start gap-2 mb-3">
                                                                <Lightbulb className="h-5 w-5 text-chart-2 shrink-0 mt-0.5" />
                                                                <h4 className="font-semibold text-sm">Pro Tips</h4>
                                                            </div>
                                                            <ul className="space-y-2 ml-7">
                                                                {step.tips.map((tip, idx) => (
                                                                    <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                                                                        <span className="text-chart-2 mt-1">•</span>
                                                                        <span>{tip}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </AccordionContent>
                                        </Card>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>

                        {/* Completion Card */}
                        {completedSteps.size === guide.steps.length && (
                            <Card className="mt-8 p-8 bg-gradient-to-r from-green-500/10 to-chart-2/10 animate-fade-in">
                                <div className="text-center">
                                    <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="font-display font-bold text-2xl mb-2">
                                        Congratulations!
                                    </h3>
                                    <p className="text-muted-foreground mb-6">
                                        You've completed all steps in this guide. Great job!
                                    </p>
                                    <Button onClick={() => setLocation("/resources")}>
                                        Explore More Resources
                                    </Button>
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Quick Stats */}
                            <Card className="p-6">
                                <h3 className="font-semibold mb-4">Quick Stats</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Total Steps</span>
                                        <span className="font-semibold">{guide.steps.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Completed</span>
                                        <span className="font-semibold text-green-600 dark:text-green-400">
                                            {completedSteps.size}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Remaining</span>
                                        <span className="font-semibold">
                                            {guide.steps.length - completedSteps.size}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t">
                                        <span className="text-sm text-muted-foreground">Est. Time Left</span>
                                        <span className="font-semibold">{guide.estimatedTime}</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Need Help */}
                            <Card className="p-6 bg-gradient-to-br from-primary/5 to-chart-2/5">
                                <h3 className="font-semibold mb-2">Need Help?</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Our Health Assistants are here to walk you through any step.
                                </p>
                                <Button variant="outline" className="w-full">
                                    Contact Support
                                </Button>
                            </Card>

                            {/* More Guides */}
                            <Card className="p-6">
                                <h3 className="font-semibold mb-4">Related Guides</h3>
                                <div className="space-y-3">
                                    {guidesData
                                        .filter((g) => g.id !== guideId && g.category === guide.category)
                                        .slice(0, 2)
                                        .map((relatedGuide) => (
                                            <button
                                                key={relatedGuide.id}
                                                onClick={() => setLocation(`/resources/guides/${relatedGuide.id}`)}
                                                className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors"
                                            >
                                                <p className="font-medium text-sm mb-1 line-clamp-2">
                                                    {relatedGuide.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {relatedGuide.steps.length} steps • {relatedGuide.estimatedTime}
                                                </p>
                                            </button>
                                        ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
