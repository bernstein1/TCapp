import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download, RotateCcw, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type InsuranceCard = {
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

type WalletCardProps = {
  card: InsuranceCard;
  onShare?: () => void;
  onDownload?: () => void;
};

export function WalletCard({ card, onShare, onDownload }: WalletCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyMemberId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(card.memberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="perspective-1500 group">
      <div
        className={cn(
          "relative w-full h-56 transition-all duration-700 transform-style-3d cursor-pointer",
          "hover:scale-105 active:scale-95",
          "motion-reduce:hover:scale-100 motion-reduce:active:scale-100 motion-reduce:transition-none",
          isFlipped && "rotate-y-180"
        )}
        onClick={() => setIsFlipped(!isFlipped)}
        data-testid="card-wallet"
      >
        {/* Front of card */}
        <Card
          className={cn(
            "absolute inset-0 backface-hidden overflow-hidden p-6",
            "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800",
            "shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.5)]",
            "transition-shadow duration-500 motion-reduce:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
            "text-white",
            "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none",
            "after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)] after:pointer-events-none",
            "hover:before:from-white/30 before:transition-all before:duration-500"
          )}
        >
          <div className="flex flex-col h-full relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-xl mb-1 text-white drop-shadow-sm">TouchCare</h3>
                <p className="text-xs text-white/90">{card.planName}</p>
              </div>
              <div className="text-xs text-white/80">
                <div>Effective</div>
                <div className="font-semibold text-white">{card.effectiveDate}</div>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-white/70 mb-1">Member Name</div>
                  <div className="font-semibold text-white">{card.memberName}</div>
                </div>
                <div>
                  <div className="text-xs text-white/70 mb-1">Member ID</div>
                  <div className="font-semibold font-mono text-white">{card.memberId}</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-white/70 mb-1">Group Number</div>
                <div className="font-semibold font-mono text-white">{card.groupNumber}</div>
              </div>
            </div>

            <div className="text-xs text-white/70 flex items-center gap-2">
              <RotateCcw className="h-3 w-3" />
              <span>Tap to flip</span>
            </div>
          </div>
        </Card>

        {/* Back of card */}
        <Card
          className={cn(
            "absolute inset-0 backface-hidden rotate-y-180 overflow-hidden p-6",
            "bg-gradient-to-br from-blue-700 via-indigo-800 to-blue-900",
            "shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.5)]",
            "transition-shadow duration-500 motion-reduce:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
            "text-white",
            "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/15 before:to-transparent before:pointer-events-none",
            "after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_50%)] after:pointer-events-none",
            "hover:before:from-white/25 before:transition-all before:duration-500"
          )}
        >
          <div className="flex flex-col h-full text-sm relative z-10">
            <h4 className="font-display font-bold text-lg mb-4 text-white drop-shadow-sm">Important Information</h4>

            <div className="space-y-3 flex-1">
              <div>
                <div className="text-xs text-white/70 mb-1">Customer Service</div>
                <div className="font-semibold text-white">{card.customerServicePhone}</div>
              </div>

              {card.rxBin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-white/70 mb-1">RX BIN</div>
                    <div className="font-semibold text-white">{card.rxBin}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/70 mb-1">RX PCN</div>
                    <div className="font-semibold text-white">{card.rxPcn}</div>
                  </div>
                </div>
              )}

              <div>
                <div className="text-xs text-white/70 mb-1">Submit Claims To</div>
                <div className="text-xs leading-relaxed text-white/90">{card.claimsAddress}</div>
              </div>
            </div>

            <div className="text-xs text-white/70 flex items-center gap-2">
              <RotateCcw className="h-3 w-3" />
              <span>Tap to flip</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleCopyMemberId}
          data-testid="button-copy-member-id"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Member ID
            </>
          )}
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onShare?.();
          }}
          data-testid="button-share-card"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onDownload?.();
          }}
          data-testid="button-download-card"
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>

      <style>
        {`
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

          /* Smooth hardware-accelerated animations */
          .perspective-1500 > div {
            will-change: transform;
          }

          /* Motion reduce support for 3D transforms */
          @media (prefers-reduced-motion: reduce) {
            .perspective-1500 {
              perspective: none;
            }
            .transform-style-3d {
              transform-style: flat;
            }
            .rotate-y-180 {
              transform: none;
              opacity: 0;
              pointer-events: none;
            }
            .rotate-y-180 ~ .rotate-y-180 {
              opacity: 1;
              pointer-events: auto;
            }
          }
        `}
      </style>
    </div>
  );
}
