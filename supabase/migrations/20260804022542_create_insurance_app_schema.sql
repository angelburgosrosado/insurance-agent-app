-- Generated from prisma/schema.prisma
-- Source: prisma/migrations/20260803120000_init/migration.sql

CREATE TYPE "StaffRole" AS ENUM ('superadmin', 'admin', 'user');

CREATE TYPE "LeadStatus" AS ENUM ('new', 'reviewing', 'assigned', 'contacted', 'qualified', 'closed');

CREATE TYPE "FollowUpTaskStatus" AS ENUM ('pending', 'completed', 'cancelled');

CREATE TYPE "ContentStatus" AS ENUM ('draft', 'published', 'archived');

CREATE TYPE "CampaignStatus" AS ENUM ('draft', 'active', 'paused', 'completed');

CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "StaffRole" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Lead" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "contactTime" TEXT,
    "message" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'new',
    "consent" BOOLEAN NOT NULL,
    "consentText" TEXT NOT NULL,
    "consentVersion" TEXT NOT NULL,
    "consentAt" TIMESTAMP(3) NOT NULL,
    "assignedToId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LeadAttribution" (
    "id" UUID NOT NULL,
    "leadId" UUID NOT NULL,
    "source" TEXT,
    "medium" TEXT,
    "campaign" TEXT,
    "content" TEXT,
    "term" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LeadAttribution_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LeadNote" (
    "id" UUID NOT NULL,
    "leadId" UUID NOT NULL,
    "authorId" UUID,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LeadNote_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "FollowUpTask" (
    "id" UUID NOT NULL,
    "leadId" UUID NOT NULL,
    "assigneeId" UUID,
    "title" TEXT NOT NULL,
    "dueAt" TIMESTAMP(3),
    "status" "FollowUpTaskStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "FollowUpTask_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ContentEntry" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'draft',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ContentEntry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Campaign" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "status" "CampaignStatus" NOT NULL DEFAULT 'draft',
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AuditEvent" (
    "id" UUID NOT NULL,
    "actorId" UUID,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_role_idx" ON "User"("role");
CREATE INDEX "Lead_status_createdAt_idx" ON "Lead"("status", "createdAt");
CREATE INDEX "Lead_email_idx" ON "Lead"("email");
CREATE INDEX "Lead_assignedToId_idx" ON "Lead"("assignedToId");
CREATE UNIQUE INDEX "LeadAttribution_leadId_key" ON "LeadAttribution"("leadId");
CREATE INDEX "LeadAttribution_source_medium_campaign_idx" ON "LeadAttribution"("source", "medium", "campaign");
CREATE INDEX "LeadNote_leadId_createdAt_idx" ON "LeadNote"("leadId", "createdAt");
CREATE INDEX "LeadNote_authorId_idx" ON "LeadNote"("authorId");
CREATE INDEX "FollowUpTask_status_dueAt_idx" ON "FollowUpTask"("status", "dueAt");
CREATE INDEX "FollowUpTask_leadId_idx" ON "FollowUpTask"("leadId");
CREATE INDEX "FollowUpTask_assigneeId_idx" ON "FollowUpTask"("assigneeId");
CREATE UNIQUE INDEX "ContentEntry_slug_key" ON "ContentEntry"("slug");
CREATE INDEX "ContentEntry_status_publishedAt_idx" ON "ContentEntry"("status", "publishedAt");
CREATE UNIQUE INDEX "Campaign_key_key" ON "Campaign"("key");
CREATE INDEX "Campaign_status_startsAt_idx" ON "Campaign"("status", "startsAt");
CREATE INDEX "AuditEvent_entityType_entityId_idx" ON "AuditEvent"("entityType", "entityId");
CREATE INDEX "AuditEvent_actorId_createdAt_idx" ON "AuditEvent"("actorId", "createdAt");

ALTER TABLE "Lead" ADD CONSTRAINT "Lead_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "LeadAttribution" ADD CONSTRAINT "LeadAttribution_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LeadNote" ADD CONSTRAINT "LeadNote_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LeadNote" ADD CONSTRAINT "LeadNote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "FollowUpTask" ADD CONSTRAINT "FollowUpTask_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FollowUpTask" ADD CONSTRAINT "FollowUpTask_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AuditEvent" ADD CONSTRAINT "AuditEvent_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
