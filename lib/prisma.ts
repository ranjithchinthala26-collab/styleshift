import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

function getDatabaseUrl(): string | undefined {
  // If user provides a remote database URL (e.g. Postgres / Supabase / Neon)
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("file:")) {
    return process.env.DATABASE_URL;
  }

  // On Vercel Serverless environments, /var/task is read-only.
  // We copy the database to /tmp so write operations (register, login, analyses) succeed.
  if (process.env.VERCEL) {
    const tmpDbPath = "/tmp/dev.db";
    if (!fs.existsSync(tmpDbPath)) {
      const candidates = [
        path.join(process.cwd(), "prisma", "dev.db"),
        path.join(process.cwd(), "dev.db"),
        path.join("/var/task", "prisma", "dev.db"),
        path.join("/var/task", "dev.db"),
      ];
      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
          try {
            fs.copyFileSync(candidate, tmpDbPath);
            break;
          } catch (e) {
            console.warn("Could not copy sqlite database to /tmp:", e);
          }
        }
      }
    }
    return `file:${tmpDbPath}`;
  }

  return process.env.DATABASE_URL || undefined;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  initialized?: boolean;
};

const activeDbUrl = getDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: activeDbUrl ? { db: { url: activeDbUrl } } : undefined,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

export async function ensureDbReady() {
  if (globalForPrisma.initialized) return;
  globalForPrisma.initialized = true;
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "WebsiteAnalysis" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "url" TEXT NOT NULL,
        "title" TEXT,
        "industry" TEXT NOT NULL DEFAULT 'SaaS Platform',
        "audience" TEXT NOT NULL DEFAULT 'Developers & Startups',
        "uxScore" INTEGER NOT NULL DEFAULT 87,
        "layout" TEXT NOT NULL DEFAULT 'Hero → Feature Grid → Pricing → Testimonials → Footer',
        "typography" TEXT NOT NULL DEFAULT 'Inter + Satoshi (Modern Sans)',
        "colors" TEXT NOT NULL,
        "components" TEXT NOT NULL,
        "rawMetadata" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "StyleTransformation" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "analysisId" TEXT NOT NULL,
        "presetId" TEXT NOT NULL,
        "presetName" TEXT NOT NULL,
        "presetColor" TEXT NOT NULL,
        "themeTokens" TEXT NOT NULL,
        "generatedCss" TEXT NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "StyleTransformation_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "WebsiteAnalysis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Verification" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "url" TEXT NOT NULL,
        "fullName" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "company" TEXT NOT NULL,
        "verifiedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ExportPackage" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "transformationId" TEXT NOT NULL,
        "filename" TEXT NOT NULL,
        "downloadCount" INTEGER NOT NULL DEFAULT 1,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "ExportPackage_transformationId_fkey" FOREIGN KEY ("transformationId") REFERENCES "StyleTransformation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "passwordHash" TEXT NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      );
    `);
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
    `);
  } catch (err) {
    // Already created or non-sqlite
  }
}

if (process.env.VERCEL) {
  ensureDbReady().catch(() => {});
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
