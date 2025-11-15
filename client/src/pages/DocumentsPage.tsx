import { useState } from "react";
import { DocumentCard, type Document } from "@/components/DocumentCard";
import { DocumentViewerModal } from "@/components/DocumentViewerModal";
import { DocumentUploadModal } from "@/components/DocumentUploadModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Search, Upload, Filter, Send, Sparkles } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"documents" | "chat">("documents");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");

  //todo: remove mock functionality
  const mockDocuments: Document[] = [
    {
      id: "1",
      name: "Medical Insurance Card",
      type: "insurance_card",
      uploadDate: new Date(2024, 0, 15),
      size: "245 KB",
      pinned: true,
    },
    {
      id: "2",
      name: "Dental Insurance Card",
      type: "insurance_card",
      uploadDate: new Date(2024, 0, 15),
      size: "198 KB",
      pinned: true,
    },
    {
      id: "3",
      name: "EOB - Dr. Smith Office Visit",
      type: "eob",
      uploadDate: new Date(2024, 10, 1),
      size: "1.2 MB",
      isNew: true,
    },
    {
      id: "4",
      name: "Claim #45678 - Radiology",
      type: "claim",
      uploadDate: new Date(2024, 9, 20),
      size: "856 KB",
    },
    {
      id: "5",
      name: "2024 Benefits Summary",
      type: "policy",
      uploadDate: new Date(2023, 11, 1),
      size: "2.4 MB",
    },
    {
      id: "6",
      name: "Coverage Letter - Specialist",
      type: "letter",
      uploadDate: new Date(2024, 8, 15),
      size: "412 KB",
    },
  ];

  const filterByType = (type?: string) => {
    if (!type) return mockDocuments;
    return mockDocuments.filter(doc => doc.type === type);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(chatInput),
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    if (input.includes("insurance") || input.includes("card")) {
      return "I can help you with your insurance cards! You have both Medical and Dental insurance cards uploaded. Would you like me to help you find specific information on these cards?";
    }
    if (input.includes("claim") || input.includes("eob")) {
      return "I can assist with your claims and EOBs. You have a recent EOB from Dr. Smith's office visit and a radiology claim (#45678). Would you like me to explain any specific charges or details?";
    }
    if (input.includes("upload") || input.includes("document")) {
      return "You can upload documents by clicking the 'Upload' button above. Supported document types include insurance cards, EOBs, claims, policy documents, and letters. What would you like to upload?";
    }
    return "I'm here to help with your documents! I can answer questions about your insurance cards, claims, EOBs, coverage details, and help you find specific documents. What would you like to know?";
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl mb-2" data-testid="text-documents-title">
            Documents
          </h1>
          <p className="text-muted-foreground">
            Access your insurance cards, claims, and important documents
          </p>
        </div>

        {/* Main Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b">
          <Button
            variant={activeTab === "documents" ? "default" : "ghost"}
            onClick={() => setActiveTab("documents")}
            className="rounded-b-none"
          >
            My Documents
          </Button>
          <Button
            variant={activeTab === "chat" ? "default" : "ghost"}
            onClick={() => setActiveTab("chat")}
            className="rounded-b-none"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            AI Assistant
          </Button>
        </div>

        {activeTab === "documents" && (
          <>
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-documents"
                />
              </div>
              <Button variant="outline" data-testid="button-filter">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button
                data-testid="button-upload"
                onClick={() => setShowUploadModal(true)}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>

            {/* Document Categories */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6 w-full sm:w-auto">
                <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
                <TabsTrigger value="insurance_card" data-testid="tab-insurance">Insurance Cards</TabsTrigger>
                <TabsTrigger value="eob" data-testid="tab-eob">EOBs</TabsTrigger>
                <TabsTrigger value="claim" data-testid="tab-claims">Claims</TabsTrigger>
                <TabsTrigger value="policy" data-testid="tab-policies">Policies</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockDocuments.map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      document={doc}
                      onView={() => setSelectedDocument(doc)}
                      onDownload={() => {}}
                      onShare={() => {}}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="insurance_card">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filterByType("insurance_card").map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      document={doc}
                      onView={() => setSelectedDocument(doc)}
                      onDownload={() => {}}
                      onShare={() => {}}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="eob">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filterByType("eob").map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      document={doc}
                      onView={() => setSelectedDocument(doc)}
                      onDownload={() => {}}
                      onShare={() => {}}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="claim">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filterByType("claim").map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      document={doc}
                      onView={() => setSelectedDocument(doc)}
                      onDownload={() => {}}
                      onShare={() => {}}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="policy">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filterByType("policy").map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      document={doc}
                      onView={() => setSelectedDocument(doc)}
                      onDownload={() => {}}
                      onShare={() => {}}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}

        {activeTab === "chat" && (
          <div className="flex flex-col h-[calc(100vh-16rem)]">
            {/* Chat Container */}
            <Card className="flex-1 flex flex-col overflow-hidden">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {chatMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-xl mb-2">
                        Document AI Assistant
                      </h3>
                      <p className="text-muted-foreground max-w-md">
                        Ask me anything about your documents, insurance cards, claims, or coverage. I'm here to help you understand and manage your healthcare documents.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 max-w-2xl">
                      <Button
                        variant="outline"
                        className="justify-start text-left h-auto py-3 px-4"
                        onClick={() => {
                          setChatInput("What insurance cards do I have?");
                          handleSendMessage();
                        }}
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-sm">View my insurance cards</span>
                          <span className="text-xs text-muted-foreground">What insurance cards do I have?</span>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-left h-auto py-3 px-4"
                        onClick={() => {
                          setChatInput("Explain my recent claims");
                          handleSendMessage();
                        }}
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-sm">Explain my claims</span>
                          <span className="text-xs text-muted-foreground">Help me understand recent claims</span>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-left h-auto py-3 px-4"
                        onClick={() => {
                          setChatInput("How do I upload a document?");
                          handleSendMessage();
                        }}
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-sm">Upload documents</span>
                          <span className="text-xs text-muted-foreground">How do I upload a document?</span>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-left h-auto py-3 px-4"
                        onClick={() => {
                          setChatInput("What is an EOB?");
                          handleSendMessage();
                        }}
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-sm">Understanding EOBs</span>
                          <span className="text-xs text-muted-foreground">What is an EOB?</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-4 ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        {message.role === "user" && (
                          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <span className="text-primary-foreground text-sm font-medium">You</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Chat Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about your documents..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        <DocumentViewerModal
          open={!!selectedDocument}
          onClose={() => setSelectedDocument(null)}
          document={selectedDocument}
        />
        <DocumentUploadModal
          open={showUploadModal}
          onClose={() => setShowUploadModal(false)}
        />
      </div>
    </div>
  );
}
