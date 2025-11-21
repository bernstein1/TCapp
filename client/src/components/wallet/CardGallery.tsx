import { InsuranceCard, type InsuranceCardData } from "./InsuranceCard";

type CardGalleryProps = {
    cards: InsuranceCardData[];
    onShare: (cardType: string) => void;
    onDownload: (cardType: string) => void;
};

export function CardGallery({ cards, onShare, onDownload }: CardGalleryProps) {
    return (
        <section className="mb-12 md:mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {cards.map((card) => (
                    <InsuranceCard
                        key={card.type}
                        card={card}
                        onShare={() => onShare(card.type)}
                        onDownload={() => onDownload(card.type)}
                    />
                ))}
            </div>
        </section>
    );
}
