import { NextRequest, NextResponse } from "next/server";
import { generateTransformation } from "@/lib/transformer";
import { createExportZip } from "@/lib/exporter";
import { AnalysisReport } from "@/lib/analyzer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, title, presetId } = body;

    const mockReport: AnalysisReport = {
      url: url || "https://example.com",
      title: title || "Transformed Project",
      layout: "Hero → Feature Grid → Pricing → Testimonials → Footer",
      colors: ["#1A73E8", "#0F172A", "#FFFFFF", "#64748B"],
      typography: "Inter + Satoshi (Modern Sans)",
      components: ["Navigation", "Hero CTA", "Cards", "Pricing Tables", "Forms"],
      industry: "SaaS Platform",
      audience: "Developers & Startups",
      uxScore: 87,
    };

    const pkg = generateTransformation(mockReport, presetId || "cyber-neon");
    const zipBuffer = await createExportZip(pkg);

    return new Response(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="styleshift-${pkg.preset.id}-theme.zip"`,
      },
    });
  } catch (error: any) {
    console.error("Export error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to generate export zip" },
      { status: 500 }
    );
  }
}
