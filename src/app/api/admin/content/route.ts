import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/server/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const prisma = getPrismaClient();
    
    const contents = await prisma.contentEntry.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ contents });
  } catch (error) {
    console.error("[API_ADMIN_CONTENT_GET]", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, slug, title, summary, body: contentBody, seoMetadata, status } = body;

    if (!slug || !title || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prisma = getPrismaClient();
    
    // Check if slug exists
    const existing = await prisma.contentEntry.findUnique({
      where: { slug }
    });

    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const newContent = await prisma.contentEntry.create({
      data: {
        type,
        slug,
        title,
        summary: summary || null,
        body: contentBody || "",
        seoMetadata: seoMetadata || "{}",
        status: status || "draft",
        publishedAt: status === "published" ? new Date() : null,
      }
    });

    return NextResponse.json({ content: newContent });
  } catch (error) {
    console.error("[API_ADMIN_CONTENT_POST]", error);
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 });
  }
}
