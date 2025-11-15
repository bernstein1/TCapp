import { CaseCard } from "../CaseCard";

export default function CaseCardExample() {
  const exampleCase = {
    id: "1",
    subject: "Question about coverage for specialist visit",
    lastMessage: "I can help you with that! Let me look up your coverage details...",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: "in_progress" as const,
    unreadCount: 2,
    agentName: "Sarah Johnson",
    agentAvatar: undefined,
  };

  return (
    <div className="p-8 max-w-2xl">
      <CaseCard
        case_={exampleCase}
        onClick={() => {}}
      />
    </div>
  );
}
