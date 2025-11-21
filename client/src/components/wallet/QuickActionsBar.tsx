import { Button } from "@/components/ui/button";
import { Smartphone, QrCode } from "lucide-react";

type QuickActionsBarProps = {
    onAddToAppleWallet: () => void;
    onAddToGooglePay: () => void;
    onPrintAll: () => void;
};

export function QuickActionsBar({
    onAddToAppleWallet,
    onAddToGooglePay,
    onPrintAll,
}: QuickActionsBarProps) {
    return (
        <div className="mb-12 md:mb-16">
            <div className="flex flex-wrap gap-3 justify-center">
                <Button
                    variant="outline"
                    className="gap-2 h-11"
                    onClick={onAddToAppleWallet}
                    data-testid="add-to-apple-wallet"
                >
                    <Smartphone className="h-4 w-4" />
                    <span>Add to Apple Wallet</span>
                </Button>
                <Button
                    variant="outline"
                    className="gap-2 h-11"
                    onClick={onAddToGooglePay}
                    data-testid="add-to-google-pay"
                >
                    <QrCode className="h-4 w-4" />
                    <span>Add to Google Pay</span>
                </Button>
                <Button
                    variant="outline"
                    className="gap-2 h-11"
                    onClick={onPrintAll}
                    data-testid="print-all"
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                        />
                    </svg>
                    <span>Print All Cards</span>
                </Button>
            </div>
        </div>
    );
}
