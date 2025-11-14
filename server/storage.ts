import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import type {
  Member,
  InsertMember,
  Dependent,
  InsertDependent,
  Case,
  InsertCase,
  CaseMessage,
  InsertCaseMessage,
  Document,
  InsertDocument,
  Appointment,
  InsertAppointment,
  Notification,
  InsertNotification,
  Service,
  InsertService,
  Task,
  InsertTask,
  BrandConfig,
  InsertBrandConfig,
} from "@shared/schema";
import {
  members,
  dependents,
  cases,
  caseMessages,
  documents,
  appointments,
  notifications,
  services,
  tasks,
  brandConfigs,
} from "@shared/schema";

export interface IStorage {
  // Member operations
  getMember(id: string): Promise<Member | undefined>;
  getMemberByEmail(email: string): Promise<Member | undefined>;
  createMember(member: InsertMember): Promise<Member>;
  updateMember(id: string, member: Partial<InsertMember>): Promise<Member | undefined>;

  // Dependent operations
  getDependent(id: string): Promise<Dependent | undefined>;
  getDependentsByMember(memberId: string): Promise<Dependent[]>;
  createDependent(dependent: InsertDependent): Promise<Dependent>;
  updateDependent(id: string, dependent: Partial<InsertDependent>): Promise<Dependent | undefined>;
  deleteDependent(id: string): Promise<void>;

  // Case operations
  getCase(id: string): Promise<Case | undefined>;
  getCasesByMember(memberId: string): Promise<Case[]>;
  createCase(case_: InsertCase): Promise<Case>;
  updateCase(id: string, case_: Partial<InsertCase>): Promise<Case | undefined>;

  // Case message operations
  getCaseMessages(caseId: string): Promise<CaseMessage[]>;
  createCaseMessage(message: InsertCaseMessage): Promise<CaseMessage>;
  markMessageAsRead(id: string): Promise<void>;

  // Document operations
  getDocument(id: string): Promise<Document | undefined>;
  getDocumentsByMember(memberId: string): Promise<Document[]>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocument(id: string, document: Partial<InsertDocument>): Promise<Document | undefined>;
  deleteDocument(id: string): Promise<void>;

  // Appointment operations
  getAppointment(id: string): Promise<Appointment | undefined>;
  getAppointmentsByMember(memberId: string): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: string, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined>;
  deleteAppointment(id: string): Promise<void>;

  // Notification operations
  getNotification(id: string): Promise<Notification | undefined>;
  getNotificationsByMember(memberId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: string): Promise<void>;

  // Service operations
  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined>;

  // Task operations
  getTasksByMember(memberId: string): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, task: Partial<InsertTask>): Promise<Task | undefined>;

  // Brand config operations
  getBrandConfig(code: string): Promise<BrandConfig | undefined>;
  createBrandConfig(config: InsertBrandConfig): Promise<BrandConfig>;
}

export class PgStorage implements IStorage {
  // Member operations
  async getMember(id: string): Promise<Member | undefined> {
    const result = await db.select().from(members).where(eq(members.id, id)).limit(1);
    return result[0];
  }

  async getMemberByEmail(email: string): Promise<Member | undefined> {
    const result = await db.select().from(members).where(eq(members.email, email)).limit(1);
    return result[0];
  }

  async createMember(member: InsertMember): Promise<Member> {
    const result = await db.insert(members).values([member]).returning();
    return result[0];
  }

  async updateMember(id: string, member: Partial<InsertMember>): Promise<Member | undefined> {
    const result = await db
      .update(members)
      .set({ ...member, updatedAt: new Date() })
      .where(eq(members.id, id))
      .returning();
    return result[0];
  }

  // Dependent operations
  async getDependent(id: string): Promise<Dependent | undefined> {
    const result = await db.select().from(dependents).where(eq(dependents.id, id)).limit(1);
    return result[0];
  }

  async getDependentsByMember(memberId: string): Promise<Dependent[]> {
    return await db.select().from(dependents).where(eq(dependents.memberId, memberId));
  }

  async createDependent(dependent: InsertDependent): Promise<Dependent> {
    const result = await db.insert(dependents).values([dependent]).returning();
    return result[0];
  }

  async updateDependent(id: string, dependent: Partial<InsertDependent>): Promise<Dependent | undefined> {
    const result = await db
      .update(dependents)
      .set(dependent)
      .where(eq(dependents.id, id))
      .returning();
    return result[0];
  }

  async deleteDependent(id: string): Promise<void> {
    await db.delete(dependents).where(eq(dependents.id, id));
  }

  // Case operations
  async getCase(id: string): Promise<Case | undefined> {
    const result = await db.select().from(cases).where(eq(cases.id, id)).limit(1);
    return result[0];
  }

  async getCasesByMember(memberId: string): Promise<Case[]> {
    return await db
      .select()
      .from(cases)
      .where(eq(cases.memberId, memberId))
      .orderBy(desc(cases.updatedAt));
  }

  async createCase(case_: InsertCase): Promise<Case> {
    const result = await db.insert(cases).values([case_]).returning();
    return result[0];
  }

  async updateCase(id: string, case_: Partial<InsertCase>): Promise<Case | undefined> {
    const result = await db
      .update(cases)
      .set({ ...case_, updatedAt: new Date() })
      .where(eq(cases.id, id))
      .returning();
    return result[0];
  }

  // Case message operations
  async getCaseMessages(caseId: string): Promise<CaseMessage[]> {
    return await db
      .select()
      .from(caseMessages)
      .where(eq(caseMessages.caseId, caseId))
      .orderBy(caseMessages.createdAt);
  }

  async createCaseMessage(message: InsertCaseMessage): Promise<CaseMessage> {
    const result = await db.insert(caseMessages).values([message]).returning();
    return result[0];
  }

  async markMessageAsRead(id: string): Promise<void> {
    await db
      .update(caseMessages)
      .set({ read: true })
      .where(eq(caseMessages.id, id));
  }

  // Document operations
  async getDocument(id: string): Promise<Document | undefined> {
    const result = await db.select().from(documents).where(eq(documents.id, id)).limit(1);
    return result[0];
  }

  async getDocumentsByMember(memberId: string): Promise<Document[]> {
    return await db
      .select()
      .from(documents)
      .where(eq(documents.memberId, memberId))
      .orderBy(desc(documents.createdAt));
  }

  async createDocument(document: InsertDocument): Promise<Document> {
    const result = await db.insert(documents).values([document]).returning();
    return result[0];
  }

  async updateDocument(id: string, document: Partial<InsertDocument>): Promise<Document | undefined> {
    const result = await db
      .update(documents)
      .set(document)
      .where(eq(documents.id, id))
      .returning();
    return result[0];
  }

  async deleteDocument(id: string): Promise<void> {
    await db.delete(documents).where(eq(documents.id, id));
  }

  // Appointment operations
  async getAppointment(id: string): Promise<Appointment | undefined> {
    const result = await db.select().from(appointments).where(eq(appointments.id, id)).limit(1);
    return result[0];
  }

  async getAppointmentsByMember(memberId: string): Promise<Appointment[]> {
    return await db
      .select()
      .from(appointments)
      .where(eq(appointments.memberId, memberId))
      .orderBy(appointments.dateTime);
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const result = await db.insert(appointments).values([appointment]).returning();
    return result[0];
  }

  async updateAppointment(id: string, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined> {
    const result = await db
      .update(appointments)
      .set(appointment)
      .where(eq(appointments.id, id))
      .returning();
    return result[0];
  }

  async deleteAppointment(id: string): Promise<void> {
    await db.delete(appointments).where(eq(appointments.id, id));
  }

  // Notification operations
  async getNotification(id: string): Promise<Notification | undefined> {
    const result = await db.select().from(notifications).where(eq(notifications.id, id)).limit(1);
    return result[0];
  }

  async getNotificationsByMember(memberId: string): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.memberId, memberId))
      .orderBy(desc(notifications.createdAt));
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const result = await db.insert(notifications).values([notification]).returning();
    return result[0];
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.id, id));
  }

  // Service operations
  async getServices(): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.active, true));
  }

  async getService(id: string): Promise<Service | undefined> {
    const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
    return result[0];
  }

  async createService(service: InsertService): Promise<Service> {
    const result = await db.insert(services).values([service]).returning();
    return result[0];
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined> {
    const result = await db
      .update(services)
      .set(service)
      .where(eq(services.id, id))
      .returning();
    return result[0];
  }

  // Task operations
  async getTasksByMember(memberId: string): Promise<Task[]> {
    return await db
      .select()
      .from(tasks)
      .where(eq(tasks.memberId, memberId))
      .orderBy(tasks.order);
  }

  async createTask(task: InsertTask): Promise<Task> {
    const result = await db.insert(tasks).values([task]).returning();
    return result[0];
  }

  async updateTask(id: string, task: Partial<InsertTask>): Promise<Task | undefined> {
    const result = await db
      .update(tasks)
      .set(task)
      .where(eq(tasks.id, id))
      .returning();
    return result[0];
  }

  // Brand config operations
  async getBrandConfig(code: string): Promise<BrandConfig | undefined> {
    const result = await db
      .select()
      .from(brandConfigs)
      .where(and(eq(brandConfigs.code, code), eq(brandConfigs.active, true)))
      .limit(1);
    return result[0];
  }

  async createBrandConfig(config: InsertBrandConfig): Promise<BrandConfig> {
    const result = await db.insert(brandConfigs).values([config]).returning();
    return result[0];
  }
}

export const storage = new PgStorage();
