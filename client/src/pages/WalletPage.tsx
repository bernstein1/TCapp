import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { WalletHeader } from "@/components/wallet/WalletHeader";
import { CardGallery } from "@/components/wallet/CardGallery";
import { CoverageSummary } from "@/components/wallet/CoverageSummary";
import { FamilyMembers } from "@/components/wallet/FamilyMembers";
import { PersonalInformation } from "@/components/wallet/PersonalInformation";
import { EmergencyContacts } from "@/components/wallet/EmergencyContacts";
import { MedicalInformation } from "@/components/medical/MedicalInformation";
import type { InsuranceCardData } from "@/components/wallet/InsuranceCard";

type Member = {
  id: string;
  name: string;
  relationship: string;
  initials: string;
};

export default function WalletPage() {
  const [selectedMemberId, setSelectedMemberId] = useState("primary");
  const [, setLocation] = useLocation();

  const members: Member[] = [
    { id: "primary", name: "John Doe", relationship: "You", initials: "JD" },
    { id: "spouse", name: "Jane Doe", relationship: "Spouse", initials: "JD" },
    { id: "child", name: "Emily Doe", relationship: "Child", initials: "ED" },
  ];

  const currentMember = members.find((m) => m.id === selectedMemberId) || members[0];

  // Mock card data
  const cards: InsuranceCardData[] = [
    {
      type: "medical",
      memberName: currentMember.name,
      memberId: "ABC123456789",
      groupNumber: "GRP-98765",
      planName: "Premium Health Plan",
      effectiveDate: "01/01/2024",
      rxBin: "610020",
      rxPcn: "TOUCHCARE",
      customerServicePhone: "1-800-CARE-NOW",
      claimsAddress: "TouchCare Claims, PO Box 12345, New York, NY 10001",
    },
    {
      type: "dental",
      memberName: currentMember.name,
      memberId: "DEN987654321",
      groupNumber: "GRP-98765",
      planName: "Dental Plus",
      effectiveDate: "01/01/2024",
      customerServicePhone: "1-800-DENTAL",
      claimsAddress: "TouchCare Dental, PO Box 54321, New York, NY 10002",
    },
    {
      type: "vision",
      memberName: currentMember.name,
      memberId: "VIS456789123",
      groupNumber: "GRP-98765",
      planName: "Vision Care Plus",
      effectiveDate: "01/01/2024",
      customerServicePhone: "1-800-VISION",
      claimsAddress: "TouchCare Vision, PO Box 67890, New York, NY 10003",
    },
    {
      type: "fsa",
      memberName: currentMember.name,
      memberId: "FSA789456123",
      groupNumber: "GRP-98765",
      planName: "Flexible Spending Account",
      effectiveDate: "01/01/2024",
      customerServicePhone: "1-800-FSA-HELP",
      claimsAddress: "TouchCare FSA, PO Box 11111, New York, NY 10004",
    },
  ];

  const handleShare = (cardType: string) => {
    if (navigator.share) {
      navigator
        .share({
          title: `${cardType} Insurance Card`,
          text: "My TouchCare insurance card",
        })
        .catch(() => { });
    } else {
      alert(`Sharing ${cardType} card...`);
    }
  };

  const handleDownload = (cardType: string) => {
    alert(`Downloading ${cardType} card as PDF...`);
  };

  const handleDownloadAll = () => {
    alert("Downloading all cards as PDF...");
  };

  const handleEditProfile = () => {
    setLocation("/settings");
  };

  const handleAddDependent = () => {
    setLocation("/settings");
  };

  const handleManageContacts = () => {
    setLocation("/settings");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const motionProps = prefersReducedMotion
    ? {}
    : {
      variants: containerVariants,
      initial: "hidden",
      animate: "visible",
    };

  return (
    <motion.div
      className="min-h-screen p-4 md:p-6 lg:p-8"
      {...motionProps}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div variants={prefersReducedMotion ? {} : itemVariants}>
          <WalletHeader
            currentMember={currentMember}
            members={members}
            onMemberChange={setSelectedMemberId}
            onDownloadAll={handleDownloadAll}
          />
        </motion.div>

        {/* Insurance Cards - Full Width */}
        <motion.div variants={prefersReducedMotion ? {} : itemVariants}>
          <CardGallery
            cards={cards}
            onShare={handleShare}
            onDownload={handleDownload}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content - Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Personal & Family Grid - Now First */}
            <motion.div
              variants={prefersReducedMotion ? {} : itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <PersonalInformation onEditProfile={handleEditProfile} />
              <FamilyMembers onAddDependent={handleAddDependent} />
            </motion.div>

            {/* Medical Information Dashboard - Now Second */}
            <motion.div variants={prefersReducedMotion ? {} : itemVariants}>
              <div className="bg-card rounded-xl border shadow-sm p-6">
                <MedicalInformation />
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Right Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Coverage Summary - Sticky on desktop */}
            <motion.div
              variants={prefersReducedMotion ? {} : itemVariants}
              className="lg:sticky lg:top-6"
            >
              <div className="space-y-6">
                <CoverageSummary />
                <EmergencyContacts onManageContacts={handleManageContacts} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
