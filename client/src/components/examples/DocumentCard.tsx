import { DocumentCard } from "../DocumentCard";

export default function DocumentCardExample() {
  const documents = [
    {
      id: "1",
      name: "Medical Insurance Card",
      type: "insurance_card" as const,
      uploadDate: new Date(2024, 0, 15),
      size: "245 KB",
      pinned: true,
      isNew: false,
    },
    {
      id: "2",
      name: "EOB - Dr. Smith Visit",
      type: "eob" as const,
      uploadDate: new Date(2024, 10, 1),
      size: "1.2 MB",
      isNew: true,
    },
  ];

  return (
    <div className="p-8 max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onView={() => console.log('View document:', doc.id)}
          onDownload={() => console.log('Download document:', doc.id)}
          onShare={() => console.log('Share document:', doc.id)}
        />
      ))}
    </div>
  );
}
