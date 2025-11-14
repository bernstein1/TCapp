import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download, RotateCcw } from "lucide-react";
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

  return (
    <div className="perspective-1000">
      <div
        className={cn(
          "relative w-full h-56 transition-transform duration-500 transform-style-3d cursor-pointer",
          isFlipped && "rotate-y-180"
        )}
        onClick={() => setIsFlipped(!isFlipped)}
        data-testid="card-wallet"
      >
        {/* Front of card */}
        <Card
          className={cn(
            "absolute inset-0 backface-hidden bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6",
            "shadow-xl"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-lg mb-1">TouchCare</h3>
                <p className="text-xs opacity-90">{card.planName}</p>
              </div>
              <div className="text-xs opacity-75">
                <div>Effective</div>
                <div className="font-semibold">{card.effectiveDate}</div>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs opacity-75 mb-1">Member Name</div>
                  <div className="font-semibold">{card.memberName}</div>
                </div>
                <div>
                  <div className="text-xs opacity-75 mb-1">Member ID</div>
                  <div className="font-semibold font-mono">{card.memberId}</div>
                </div>
              </div>

              <div>
                <div className="text-xs opacity-75 mb-1">Group Number</div>
                <div className="font-semibold font-mono">{card.groupNumber}</div>
              </div>
            </div>

            <div className="text-xs opacity-75 flex items-center gap-2">
              <RotateCcw className="h-3 w-3" />
              <span>Tap to flip</span>
            </div>
          </div>
        </Card>

        {/* Back of card */}
        <Card
          className={cn(
            "absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6",
            "shadow-xl"
          )}
        >
          <div className="flex flex-col h-full text-sm">
            <h4 className="font-display font-bold text-base mb-4">Important Information</h4>

            <div className="space-y-3 flex-1">
              <div>
                <div className="text-xs opacity-75 mb-1">Customer Service</div>
                <div className="font-semibold">{card.customerServicePhone}</div>
              </div>

              {card.rxBin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs opacity-75 mb-1">RX BIN</div>
                    <div className="font-semibold">{card.rxBin}</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-75 mb-1">RX PCN</div>
                    <div className="font-semibold">{card.rxPcn}</div>
                  </div>
                </div>
              )}

              <div>
                <div className="text-xs opacity-75 mb-1">Submit Claims To</div>
                <div className="text-xs leading-relaxed">{card.claimsAddress}</div>
              </div>
            </div>

            <div className="text-xs opacity-75 flex items-center gap-2">
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
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}
      </style>
    </div>
  );
}
