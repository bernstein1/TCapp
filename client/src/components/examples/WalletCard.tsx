import { WalletCard } from "../WalletCard";

export default function WalletCardExample() {
  const card = {
    memberName: "John Doe",
    memberId: "ABC123456789",
    groupNumber: "GRP-98765",
    planName: "Premium Health Plan",
    effectiveDate: "01/01/2024",
    rxBin: "610020",
    rxPcn: "TOUCHCARE",
    customerServicePhone: "1-800-CARE-NOW",
    claimsAddress: "TouchCare Claims, PO Box 12345, New York, NY 10001",
  };

  return (
    <div className="p-8 max-w-lg">
      <WalletCard
        card={card}
        onShare={() => console.log('Share card')}
        onDownload={() => console.log('Download card')}
      />
    </div>
  );
}
