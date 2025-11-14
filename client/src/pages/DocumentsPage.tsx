import { useState } from "react";
import { DocumentCard, type Document } from "@/components/DocumentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Upload, Filter } from "lucide-react";

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

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
          <Button data-testid="button-upload">
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
                  onView={() => console.log('View:', doc.id)}
                  onDownload={() => console.log('Download:', doc.id)}
                  onShare={() => console.log('Share:', doc.id)}
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
                  onView={() => console.log('View:', doc.id)}
                  onDownload={() => console.log('Download:', doc.id)}
                  onShare={() => console.log('Share:', doc.id)}
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
                  onView={() => console.log('View:', doc.id)}
                  onDownload={() => console.log('Download:', doc.id)}
                  onShare={() => console.log('Share:', doc.id)}
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
                  onView={() => console.log('View:', doc.id)}
                  onDownload={() => console.log('Download:', doc.id)}
                  onShare={() => console.log('Share:', doc.id)}
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
                  onView={() => console.log('View:', doc.id)}
                  onDownload={() => console.log('Download:', doc.id)}
                  onShare={() => console.log('Share:', doc.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
