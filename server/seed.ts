import { storage } from "./storage";

export async function seedDatabase() {
  try {
    console.log("🌱 Seeding database with test data...");

    // Create test member
    const testMember = await storage.createMember({
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      phone: "(555) 123-4567",
      dateOfBirth: "1985-01-15",
      memberId: "ABC123456789",
      groupNumber: "GRP-98765",
      planName: "Premium Health Plan",
      effectiveDate: "01/01/2024",
      rxBin: "610020",
      rxPcn: "TOUCHCARE",
      customerServicePhone: "1-800-CARE-NOW",
      claimsAddress: "TouchCare Claims, PO Box 12345, New York, NY 10001",
      preferences: {
        emailNotifications: true,
        smsNotifications: true,
        caseNotifications: true,
        appointmentNotifications: true,
        language: "English (US)",
        timezone: "Eastern Time (ET)",
      },
    });

    console.log("✅ Created test member:", testMember.id);

    // Create dependents
    await storage.createDependent({
      memberId: testMember.id,
      firstName: "Jane",
      lastName: "Doe",
      relationship: "Spouse",
      dateOfBirth: "1987-03-20",
    });

    await storage.createDependent({
      memberId: testMember.id,
      firstName: "Emily",
      lastName: "Doe",
      relationship: "Child",
      dateOfBirth: "2010-07-15",
    });

    console.log("✅ Created dependents");

    // Create cases
    const case1 = await storage.createCase({
      memberId: testMember.id,
      subject: "Coverage question for specialist visit",
      status: "in_progress",
      agentName: "Sarah Johnson",
      unreadCount: 2,
    });

    const case2 = await storage.createCase({
      memberId: testMember.id,
      subject: "Claim status inquiry",
      status: "resolved",
      agentName: "Michael Chen",
      unreadCount: 0,
    });

    const case3 = await storage.createCase({
      memberId: testMember.id,
      subject: "Provider network question",
      status: "waiting_on_you",
      agentName: "Emily Rodriguez",
      unreadCount: 1,
    });

    console.log("✅ Created cases");

    // Create case messages
    await storage.createCaseMessage({
      caseId: case1.id,
      senderId: testMember.id,
      senderType: "member",
      message: "Hello, I have a question about specialist coverage.",
      delivered: true,
      read: true,
    });

    await storage.createCaseMessage({
      caseId: case1.id,
      senderId: testMember.id,
      senderType: "agent",
      message: "I can help you with that! Let me look up your coverage details...",
      delivered: true,
      read: false,
    });

    console.log("✅ Created case messages");

    // Create documents
    await storage.createDocument({
      memberId: testMember.id,
      name: "Medical Insurance Card",
      type: "insurance_card",
      fileUrl: "/documents/medical-insurance-card.pdf",
      fileSize: "245 KB",
      pinned: true,
      isNew: false,
    });

    await storage.createDocument({
      memberId: testMember.id,
      name: "Dental Insurance Card",
      type: "insurance_card",
      fileUrl: "/documents/dental-insurance-card.pdf",
      fileSize: "198 KB",
      pinned: true,
      isNew: false,
    });

    await storage.createDocument({
      memberId: testMember.id,
      name: "EOB - Dr. Smith Office Visit",
      type: "eob",
      fileUrl: "/documents/eob-dr-smith.pdf",
      fileSize: "1.2 MB",
      pinned: false,
      isNew: true,
    });

    await storage.createDocument({
      memberId: testMember.id,
      name: "Claim #45678 - Radiology",
      type: "claim",
      fileUrl: "/documents/claim-45678.pdf",
      fileSize: "856 KB",
      pinned: false,
      isNew: false,
    });

    console.log("✅ Created documents");

    // Create appointments
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14, 0, 0, 0);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(10, 30, 0, 0);

    await storage.createAppointment({
      memberId: testMember.id,
      type: "Benefits Consultation",
      dateTime: tomorrow,
      duration: 30,
      consultantName: "Dr. Emily Martinez",
      format: "video",
      joinUrl: "https://meet.touchcare.com/abc123",
      status: "scheduled",
    });

    await storage.createAppointment({
      memberId: testMember.id,
      type: "Claim Review",
      dateTime: nextWeek,
      duration: 45,
      consultantName: "James Wilson",
      format: "phone",
      phoneNumber: "1-800-CARE-NOW",
      status: "scheduled",
    });

    console.log("✅ Created appointments");

    // Create notifications
    await storage.createNotification({
      memberId: testMember.id,
      type: "case_update",
      title: "New message in your case",
      message: "Sarah has responded to your coverage question.",
      read: false,
      actionUrl: `/cases/${case1.id}`,
    });

    await storage.createNotification({
      memberId: testMember.id,
      type: "document",
      title: "New document uploaded",
      message: "Your EOB is now available to view.",
      read: true,
    });

    await storage.createNotification({
      memberId: testMember.id,
      type: "appointment",
      title: "Appointment reminder",
      message: "Your consultation with Dr. Martinez is tomorrow at 2:00 PM.",
      read: false,
    });

    console.log("✅ Created notifications");

    // Create services
    await storage.createService({
      name: "Mental Health Support",
      description: "Connect with licensed therapists and counselors for mental health support, stress management, and emotional wellness. Available 24/7 for immediate assistance.",
      type: "partner",
      accessMethod: "both",
      phoneNumber: "1-800-MENTAL-1",
      hours: "Available 24/7",
      active: true,
    });

    await storage.createService({
      name: "Prescription Assistance",
      description: "Get help finding affordable medications, locating pharmacies in your network, and understanding your prescription benefits.",
      type: "internal",
      accessMethod: "message",
      hours: "Mon-Fri, 9AM-5PM EST",
      active: true,
    });

    await storage.createService({
      name: "Wellness Coaching",
      description: "Work with certified wellness coaches to set and achieve your health goals, from nutrition to fitness and lifestyle improvements.",
      type: "partner",
      accessMethod: "both",
      phoneNumber: "1-800-WELLNESS",
      hours: "Mon-Fri, 8AM-8PM EST",
      active: true,
    });

    console.log("✅ Created services");

    // Create tasks
    await storage.createTask({
      memberId: testMember.id,
      title: "Add dependent information",
      description: "Add details about your family members",
      completed: false,
      required: true,
      order: 1,
    });

    await storage.createTask({
      memberId: testMember.id,
      title: "Upload insurance card",
      description: "Take a photo of your insurance card",
      completed: true,
      required: true,
      order: 2,
    });

    await storage.createTask({
      memberId: testMember.id,
      title: "Verify phone number",
      description: "Confirm your contact information",
      completed: false,
      required: false,
      order: 3,
    });

    console.log("✅ Created tasks");
    console.log("🎉 Database seeding completed successfully!");
    console.log(`Test member ID: ${testMember.id}`);
    console.log("Use this ID in server/routes.ts for mock authentication");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}
