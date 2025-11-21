import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import { articlesData } from "@/data/article-data";
import { format } from "date-fns";
import { useEffect } from "react";

export default function ArticleDetailPage() {
    const params = useParams();
    const [, setLocation] = useLocation();
    const articleId = params.id;

    const article = articlesData.find((a) => a.id === articleId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!article) {
        return (
            <div className="min-h-screen p-4 lg:p-8 flex items-center justify-center">
                <Card className="p-8 text-center">
                    <h2 className="font-display font-bold text-2xl mb-2">Article Not Found</h2>
                    <p className="text-muted-foreground mb-4">
                        The article you're looking for doesn't exist or has been moved.
                    </p>
                    <Button onClick={() => setLocation("/resources")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Resources
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary/10 via-chart-2/10 to-background py-12 lg:py-20">
                <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
                <div className="container max-w-4xl mx-auto px-4 relative z-10">
                    <Button
                        variant="ghost"
                        onClick={() => setLocation("/resources")}
                        className="mb-6 hover-elevate"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Resources
                    </Button>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge variant="default" className="text-sm">
                            {article.category}
                        </Badge>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {article.readTime}
                        </span>
                    </div>

                    <h1 className="font-display font-bold text-4xl lg:text-5xl mb-6 leading-tight">
                        {article.title}
                    </h1>

                    <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                        {article.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">{article.author}</p>
                                <p className="text-muted-foreground">
                                    {format(article.date, "MMMM d, yyyy")}
                                </p>
                            </div>
                        </div>

                        <Button variant="outline" size="sm" className="ml-auto">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share Article
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container max-w-4xl mx-auto px-4 py-12 lg:py-16">
                <article className="prose prose-lg dark:prose-invert max-w-none">
                    {article.content.sections.map((section, index) => (
                        <div key={index} className="mb-12 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                            <h2 className="font-display font-bold text-3xl mb-6 text-foreground">
                                {section.heading}
                            </h2>
                            {section.content.map((paragraph, pIndex) => (
                                <p key={pIndex} className="mb-4 text-lg leading-relaxed text-foreground/90">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    ))}
                </article>

                {/* Call to Action */}
                <Card className="mt-16 p-8 bg-gradient-to-r from-primary/5 via-chart-2/5 to-primary/5">
                    <div className="text-center">
                        <h3 className="font-display font-bold text-2xl mb-3">
                            Need Help Understanding Your Benefits?
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            TouchCare's expert team is here to help you navigate your healthcare benefits,
                            find savings opportunities, and make informed decisions about your coverage.
                        </p>
                        <Button size="lg">Contact Your Health Assistant</Button>
                    </div>
                </Card>

                {/* Related Articles */}
                <div className="mt-16">
                    <h3 className="font-display font-bold text-2xl mb-6">More Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {articlesData
                            .filter((a) => a.id !== articleId)
                            .slice(0, 2)
                            .map((relatedArticle) => (
                                <Card
                                    key={relatedArticle.id}
                                    className="p-6 hover-elevate cursor-pointer transition-all"
                                    onClick={() => setLocation(`/resources/articles/${relatedArticle.id}`)}
                                >
                                    <Badge variant="secondary" className="mb-3">
                                        {relatedArticle.category}
                                    </Badge>
                                    <h4 className="font-semibold text-lg mb-2 line-clamp-2">
                                        {relatedArticle.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                        {relatedArticle.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {format(relatedArticle.date, "MMM d, yyyy")}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {relatedArticle.readTime}
                                        </span>
                                    </div>
                                </Card>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
