import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const analyses = await prisma.websiteAnalysis.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
      include: {
        transformations: true,
      },
    });

    return NextResponse.json({
      success: true,
      history: analyses.map((a) => ({
        ...a,
        colors: JSON.parse(a.colors),
        components: JSON.parse(a.components),
      })),
    });
  } catch (error: any) {
    console.error("History fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}
