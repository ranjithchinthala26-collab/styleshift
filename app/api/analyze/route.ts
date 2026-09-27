import { NextRequest, NextResponse } from "next/server";
import { analyzeWebsite } from "@/lib/analyzer";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: false, error: "Website URL is required" },
        { status: 400 }
      );
    }

    // Run AI / heuristic analyzer
    const report = await analyzeWebsite(url);

    // Persist in SQLite database
    let dbRecord;
    try {
      dbRecord = await prisma.websiteAnalysis.create({
        data: {
          url: report.url,
          title: report.title,
          industry: report.industry,
          audience: report.audience,
          uxScore: report.uxScore,
          layout: report.layout,
          typography: report.typography,
          colors: JSON.stringify(report.colors),
          components: JSON.stringify(report.components),
          rawMetadata: JSON.stringify(report.metadata || {}),
        },
      });
    } catch (dbErr) {
      console.error("DB Save Warning:", dbErr);
    }

    return NextResponse.json({
      success: true,
      id: dbRecord?.id || "temp-" + Date.now(),
      report,
    });
  } catch (error: any) {
    console.error("Analyze error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to analyze website" },
      { status: 500 }
    );
  }
}
