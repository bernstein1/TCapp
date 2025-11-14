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
  memberId: uuid("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  relationship: text("relationship").notNull(),
  dateOfBirth: text("date_of_birth"),
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
  memberId: uuid("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  subject: text("subject").notNull(),
  status: caseStatusEnum("status").notNull().default("open"),
  agentName: text("agent_name").notNull(),
  agentAvatar: text("agent_avatar"),
  unreadCount: integer("unread_count").notNull().default(0),
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

// Case messages table
export const caseMessages = pgTable("case_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  caseId: uuid("case_id").references(() => cases.id, { onDelete: "cascade" }).notNull(),
  senderId: uuid("sender_id").references(() => members.id).notNull(),
  senderType: text("sender_type").notNull(),
  message: text("message").notNull(),
  delivered: boolean("delivered").notNull().default(false),
  read: boolean("read").notNull().default(false),
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
  memberId: uuid("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  type: documentTypeEnum("type").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: text("file_size"),
  pinned: boolean("pinned").notNull().default(false),
  isNew: boolean("is_new").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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
  memberId: uuid("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  type: text("type").notNull(),
  dateTime: timestamp("date_time").notNull(),
  duration: integer("duration").notNull(),
  consultantName: text("consultant_name").notNull(),
  format: appointmentFormatEnum("format").notNull(),
  joinUrl: text("join_url"),
  phoneNumber: text("phone_number"),
  status: text("status").notNull().default("scheduled"),
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
  memberId: uuid("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  type: notificationTypeEnum("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  actionUrl: text("action_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;

// Services table
export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: serviceTypeEnum("type").notNull(),
  accessMethod: accessMethodEnum("access_method").notNull(),
  phoneNumber: text("phone_number"),
  hours: text("hours"),
  logo: text("logo"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
});
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Tasks table
export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  memberId: uuid("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  completed: boolean("completed").notNull().default(false),
  required: boolean("required").notNull().default(false),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
});
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

// Brand configurations table (for white-label support)
export const brandConfigs = pgTable("brand_configs", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  colors: json("colors").$type<{
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    foreground?: string;
  }>().notNull(),
  logo: text("logo"),
  fonts: json("fonts").$type<{
    display?: string;
    body?: string;
  }>(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBrandConfigSchema = createInsertSchema(brandConfigs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertBrandConfig = z.infer<typeof insertBrandConfigSchema>;
export type BrandConfig = typeof brandConfigs.$inferSelect;
