import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/server/db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const prisma = getPrismaClient();
    
    const content = await prisma.contentEntry.findUnique({
      where: { id }
    });

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("[API_ADMIN_CONTENT_ID_GET]", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, summary, body: contentBody, seoMetadata, status } = body;

    const prisma = getPrismaClient();
    
    const existing = await prisma.contentEntry.findUnique({
      where: { id }
    });

    if (!existing) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    const updatedContent = await prisma.contentEntry.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        summary: summary ?? existing.summary,
        body: contentBody ?? existing.body,
        seoMetadata: seoMetadata ?? existing.seoMetadata,
        status: status ?? existing.status,
        publishedAt: status === "published" && existing.status !== "published" 
          ? new Date() 
          : existing.publishedAt,
      }
    });

    return NextResponse.json({ content: updatedContent });
  } catch (error) {
    console.error("[API_ADMIN_CONTENT_ID_PUT]", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const prisma = getPrismaClient();
    
    await prisma.contentEntry.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API_ADMIN_CONTENT_ID_DELETE]", error);
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
  }
}
