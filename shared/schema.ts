import { pgTable, text, integer, timestamp, boolean, json, uuid, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const caseStatusEnum = pgEnum("case_status", ["open", "in_progress", "waiting_on_you", "resolved"]);
export const appointmentFormatEnum = pgEnum("appointment_format", ["phone", "video"]);
export const documentTypeEnum = pgEnum("document_type", ["insurance_card", "eob", "claim", "policy", "letter", "receipt"]);
export const notificationTypeEnum = pgEnum("notification_type", ["case_update", "appointment", "document", "security", "tip"]);
export const serviceTypeEnum = pgEnum("service_type", ["partner", "internal"]);
export const accessMethodEnum = pgEnum("access_method", ["call", "message", "both"]);

// Members table
export const members = pgTable("members", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  dateOfBirth: text("date_of_birth"),
  memberId: text("member_id").notNull().unique(),
  groupNumber: text("group_number").notNull(),
  planName: text("plan_name").notNull(),
  effectiveDate: text("effective_date").notNull(),
  rxBin: text("rx_bin"),
  rxPcn: text("rx_pcn"),
  customerServicePhone: text("customer_service_phone").notNull(),
  claimsAddress: text("claims_address").notNull(),
  preferences: json("preferences").$type<{
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    caseNotifications?: boolean;
    appointmentNotifications?: boolean;
    language?: string;
    timezone?: string;
  }>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMemberSchema = createInsertSchema(members).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Member = typeof members.$inferSelect;

// Dependents table
export const dependents = pgTable("dependents", {
  id: uuid("id").defaultRandom().primaryKey(),
  memberId: uuid("member_id").notNull().references(() => members.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  relationship: text("relationship").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDependentSchema = createInsertSchema(dependents).omit({
  id: true,
  createdAt: true,
});
export type InsertDependent = z.infer<typeof insertDependentSchema>;
export type Dependent = typeof dependents.$inferSelect;

// Cases table
export const cases = pgTable("cases", {
  id: uuid("id").defaultRandom().primaryKey(),
  memberId: uuid("member_id").notNull().references(() => members.id),
  caseNumber: text("case_number").default("").notNull(), // Added default to avoid issues if not provided in seed (though seed doesn't provide it, maybe it's generated?) Seed doesn't provide caseNumber. I'll make it optional or default.
  subject: text("subject").notNull(), // Renamed from title
  description: text("description"), // Made optional as seed doesn't seem to have it? Seed doesn't have description.
  status: caseStatusEnum("status").default("open").notNull(),
  category: text("category").default("general").notNull(), // Seed doesn't provide category.
  agentName: text("agent_name"),
  unreadCount: integer("unread_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCaseSchema = createInsertSchema(cases).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertCase = z.infer<typeof insertCaseSchema>;
export type Case = typeof cases.$inferSelect;

// Case Messages table
export const caseMessages = pgTable("case_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  caseId: uuid("case_id").notNull().references(() => cases.id),
  senderId: uuid("sender_id").notNull().references(() => members.id),
  senderType: text("sender_type").notNull(), // "member" or "agent"
  message: text("message").notNull(), // Renamed from content? Seed uses message.
  delivered: boolean("delivered").default(false),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCaseMessageSchema = createInsertSchema(caseMessages).omit({
  id: true,
  createdAt: true,
});
export type InsertCaseMessage = z.infer<typeof insertCaseMessageSchema>;
export type CaseMessage = typeof caseMessages.$inferSelect;

// Documents table
export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  memberId: uuid("member_id").notNull().references(() => members.id),
  name: text("name").notNull(), // Renamed from title
  type: documentTypeEnum("type").notNull(),
  fileUrl: text("file_url").notNull(), // Renamed from url
  fileSize: text("file_size").notNull(), // Renamed from size
  pinned: boolean("pinned").default(false),
  isNew: boolean("is_new").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(), // Renamed from uploadDate
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
});
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

// Appointments table
export const appointments = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  memberId: uuid("member_id").notNull().references(() => members.id),
  type: text("type").notNull(), // Renamed from title
  dateTime: timestamp("date_time").notNull(), // Renamed from date
  duration: integer("duration").notNull(), // in minutes
  format: appointmentFormatEnum("format").notNull(),
  consultantName: text("consultant_name"), // Renamed from providerName
  phoneNumber: text("phone_number"),
  joinUrl: text("join_url"),
  status: text("status").default("scheduled"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
});
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

// Notifications table
export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  memberId: uuid("member_id").notNull().references(() => members.id),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: notificationTypeEnum("type").notNull(),
  read: boolean("read").default(false).notNull(),
  actionUrl: text("action_url"), // Renamed from link
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;

// Services table (for marketplace/partners)
export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").default("general").notNull(), // Seed doesn't provide category? Wait, seed doesn't provide category. I'll make it default.
  type: serviceTypeEnum("type").notNull(),
  logoUrl: text("logo_url"),
  actionUrl: text("action_url"),
  accessMethod: text("access_method"), // Seed uses accessMethod
  phoneNumber: text("phone_number"),
  hours: text("hours"),
  active: boolean("active").default(true),
  isPopular: boolean("is_popular").default(false),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Tasks table
export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  memberId: uuid("member_id").notNull().references(() => members.id),
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").default(false).notNull(),
  required: boolean("required").default(false),
  order: integer("order").default(0),
  dueDate: timestamp("due_date"),
  actionUrl: text("action_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
});
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

// Brand Config (for white-labeling)
export const brandConfigs = pgTable("brand_configs", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull().unique(),
  companyName: text("company_name").notNull(),
  primaryColor: text("primary_color").notNull(),
  secondaryColor: text("secondary_color").notNull(),
  logoUrl: text("logo_url").notNull(),
  faviconUrl: text("favicon_url"),
  supportEmail: text("support_email").notNull(),
  supportPhone: text("support_phone").notNull(),
  active: boolean("active").default(true),
});

export const insertBrandConfigSchema = createInsertSchema(brandConfigs).omit({
  id: true,
});
export type InsertBrandConfig = z.infer<typeof insertBrandConfigSchema>;
export type BrandConfig = typeof brandConfigs.$inferSelect;

// Calculator Types
export type FilingStatus = "single" | "marriedJoint" | "marriedSeparate" | "headOfHousehold";

export interface HSAInputs {
  accountType?: string;
  hsaMotivation?: string;
  coverage: 'individual' | 'family';
  age: number;
  employeeContribution: number;
  contribution?: number;
  hdhpMonthlyPremium: number;
  altPlanMonthlyPremium: number;
  employerSeed: number;
  targetReserve: number;
  annualIncome: number;
  filingStatus: FilingStatus;
  spouseHasHSA: boolean;
  spouseHSAContribution: number;
  spouseEmployerHSAContribution?: number;
  enrolledInMedicare?: boolean;
  anticipatedMedicalExpenses: number;
  anticipatedDentalExpenses: number;
  anticipatedVisionExpenses: number;
  planDeductibleIndividual: number;
  planDeductibleFamily: number;
  monthlyContributionBudget: number;
  taxBracket?: number;
  income?: number;
}

export interface HSAResults {
  annualContributionLimit: number;
  catchUpContribution: number;
  employeeContribution: number;
  employerContribution: number;
  totalContribution: number;
  taxSavings: number;
  annualPremiumSavings: number;
  netCashflowAdvantage: number;
  projectedReserve: number;
  reserveShortfall: number;
  marginalRate: number;
  totalAnticipatedExpenses: number;
  deductibleCoverageRatio?: number;
  monthlyBudgetFeasible?: boolean;
  spousalLimitWarning?: string;
  warnings?: string[];
  actualContribution: number;
  contributionLimit: number;
  effectiveCost: number;
  taxableIncome?: number;
}

export interface FSAInputs {
  healthElection: number;
  expectedEligibleExpenses: number;
  planCarryover: number;
  gracePeriodMonths: number;
  includeDependentCare: boolean;
  dependentCareElection: number;
  expectedDependentCareExpenses: number;
  annualIncome: number;
  filingStatus: FilingStatus;
  payFrequency: string;
  includeLimitedPurposeFSA: boolean;
  lpfsaElection: number;
  lpfsaExpectedExpenses: number;
  taxBracket?: number;
  visionExpenses?: number;
  priorYearQualifiedMedicalExpenses?: number;
  plannedMedicalProcedures?: number;
  otherQualifiedExpenses?: number;
  dentalOrthodonticExpenses?: number;
  monthlyContributionBudget?: number;
}

export interface FSAResults {
  cappedHealthElection: number;
  expectedUtilization: number;
  carryoverProtected: number;
  forfeitureRisk: number;
  taxSavings: number;
  netBenefit: number;
  dependentCareTaxSavings: number;
  dependentCareForfeitureRisk: number;
  marginalRate: number;
  perPaycheckDeduction?: number;
  numberOfPaychecks?: number;
  lpfsaTaxSavings?: number;
  lpfsaForfeitureRisk?: number;
  lpfsaNetBenefit?: number;
}

export interface CommuterInputs {
  transitCost: number;
  parkingCost: number;
  annualIncome: number;
  filingStatus: FilingStatus;
  taxBracket?: number;
}

export interface CommuterResults {
  transitSavings: number;
  parkingSavings: number;
  totalSavings: number;
  annualTransit: number;
  annualParking: number;
  annualTotal: number;
  marginalRate: number;
}

export interface LifeInsuranceInputs {
  totalDebt: number;
  income: number;
  mortgageBalance: number;
  educationCosts: number;
  incomeYears: number;
  currentInsurance: number;
  currentAssets: number;
  childrenUnder18: number;
  monthlyLivingExpenses: number;
}

export interface LifeInsuranceResults {
  dimeTotal: number;
  additionalNeeded: number;
  incomeReplacement: number;
  adjustedNeed?: number;
  livingExpensesComponent?: number;
  childEducationMultiplier?: number;
}
