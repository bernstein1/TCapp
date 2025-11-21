import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Download, Copy, Check, RotateCcw, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export type InsuranceCardData = {
    type: "medical" | "dental" | "vision" | "fsa";
    memberName: string;
    memberId: string;
    groupNumber: string;
    planName: string;
    effectiveDate: string;
    rxBin?: string;
    rxPcn?: string;
    customerServicePhone: string;
    claimsAddress: string;
};

type InsuranceCardProps = {
    card: InsuranceCardData;
    onShare?: () => void;
    onDownload?: () => void;
};

const cardStyles = {
    medical: {
        gradient: "from-blue-500 via-blue-600 to-indigo-700",
        glow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]",
        label: "Medical",
    },
    dental: {
        gradient: "from-teal-500 via-cyan-600 to-blue-600",
        glow: "group-hover:shadow-[0_0_40px_rgba(20,184,166,0.3)]",
        label: "Dental",
    },
    vision: {
        gradient: "from-purple-500 via-violet-600 to-indigo-600",
        glow: "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]",
        label: "Vision",
    },
    fsa: {
        gradient: "from-emerald-500 via-green-600 to-teal-600",
        glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]",
        label: "FSA",
    },
};

export function InsuranceCard({ card, onShare, onDownload }: InsuranceCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const style = cardStyles[card.type];

    const handleCopyMemberId = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(card.memberId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className="group relative"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            {/* Card Type Badge */}
            <Badge
                variant="secondary"
                className="absolute -top-2 left-4 z-20 bg-background/95 backdrop-blur-sm shadow-sm"
            >
                {style.label}
            </Badge>

            <div className="perspective-1500">
                <div
                    className={cn(
                        "relative w-full h-64 transition-all duration-700 transform-style-3d",
                        "motion-reduce:transition-none",
                        isFlipped && "rotate-y-180"
                    )}
                >
                    {/* Front of card */}
                    <Card
                        className={cn(
                            "absolute inset-0 backface-hidden overflow-hidden",
                            "bg-gradient-to-br",
                            style.gradient,
                            "shadow-xl transition-all duration-500",
                            style.glow,
                            "motion-reduce:shadow-lg",
                            "text-white cursor-pointer",
                            "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none",
                            "hover:scale-[1.02] active:scale-[0.98]",
                            "motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
                        )}
                        onClick={handleFlip}
                    >
                        <div className="p-6 h-full flex flex-col relative z-10">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="font-display font-bold text-2xl mb-1 text-white drop-shadow-md">
                                        TouchCare
                                    </h3>
                                    <p className="text-sm text-white/90 font-medium">{card.planName}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-white/80">Effective</div>
                                    <div className="font-semibold text-sm">{card.effectiveDate}</div>
                                </div>
                            </div>

                            {/* Main Info */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <div className="text-xs text-white/70 mb-1 uppercase tracking-wide">
                                        Member Name
                                    </div>
                                    <div className="font-bold text-lg">{card.memberName}</div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-white/70 mb-1 uppercase tracking-wide">
                                            Member ID
                                        </div>
                                        <div className="font-mono font-bold text-base">{card.memberId}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/70 mb-1 uppercase tracking-wide">
                                            Group #
                                        </div>
                                        <div className="font-mono font-bold text-base">{card.groupNumber}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between text-xs text-white/70">
                                <div className="flex items-center gap-1.5">
                                    <RotateCcw className="h-3 w-3" />
                                    <span>Tap to flip</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Phone className="h-3 w-3" />
                                    <span>{card.customerServicePhone}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Back of card */}
                    <Card
                        className={cn(
                            "absolute inset-0 backface-hidden rotate-y-180 overflow-hidden",
                            "bg-gradient-to-br",
                            style.gradient,
                            "shadow-xl",
                            "text-white cursor-pointer",
                            "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/15 before:to-transparent before:pointer-events-none"
                        )}
                        onClick={handleFlip}
                    >
                        <div className="p-6 h-full flex flex-col relative z-10">
                            <h4 className="font-display font-bold text-xl mb-4 text-white drop-shadow-md">
                                Card Details
                            </h4>

                            <div className="space-y-4 flex-1 text-sm">
                                <div>
                                    <div className="text-xs text-white/70 mb-1 uppercase tracking-wide">
                                        Customer Service
                                    </div>
                                    <div className="font-semibold text-base">{card.customerServicePhone}</div>
                                </div>

                                {card.rxBin && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs text-white/70 mb-1 uppercase tracking-wide">
                                                RX BIN
                                            </div>
                                            <div className="font-mono font-semibold">{card.rxBin}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-white/70 mb-1 uppercase tracking-wide">
                                                RX PCN
                                            </div>
                                            <div className="font-mono font-semibold">{card.rxPcn}</div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <div className="text-xs text-white/70 mb-1 uppercase tracking-wide">
                                        Submit Claims To
                                    </div>
                                    <div className="text-xs leading-relaxed text-white/90">
                                        {card.claimsAddress}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-white/70">
                                <RotateCcw className="h-3 w-3" />
                                <span>Tap to flip</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Floating Actions */}
            <div
                className={cn(
                    "absolute -bottom-3 left-1/2 -translate-x-1/2 z-30",
                    "flex gap-2 transition-all duration-300",
                    showActions
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none",
                    "motion-reduce:opacity-100 motion-reduce:translate-y-0"
                )}
            >
                <Button
                    size="sm"
                    className="h-8 shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    onClick={handleCopyMemberId}
                >
                    {copied ? (
                        <>
                            <Check className="h-3 w-3 mr-1.5" />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy className="h-3 w-3 mr-1.5" />
                            Copy ID
                        </>
                    )}
                </Button>
                <Button
                    size="sm"
                    className="h-8 shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    onClick={(e) => {
                        e.stopPropagation();
                        onShare?.();
                    }}
                >
                    <Share2 className="h-3 w-3 mr-1.5" />
                    Share
                </Button>
                <Button
                    size="sm"
                    className="h-8 shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDownload?.();
                    }}
                >
                    <Download className="h-3 w-3 mr-1.5" />
                    Download
                </Button>
            </div>

            <style>{`
        .perspective-1500 {
          perspective: 1500px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        @media (prefers-reduced-motion: reduce) {
          .perspective-1500 {
            perspective: none;
          }
          .rotate-y-180 {
            transform: none;
            opacity: 0;
            pointer-events: none;
          }
        }
      `}</style>
        </div>
    );
}
