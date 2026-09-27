import { NextRequest, NextResponse } from "next/server";
import { generateTransformation } from "@/lib/transformer";
import { STYLE_PRESETS } from "@/lib/presets";
import { prisma } from "@/lib/prisma";
import { AnalysisReport } from "@/lib/analyzer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { analysisId, presetId, fallbackReport } = body;

    if (!presetId) {
      return NextResponse.json(
        { success: false, error: "presetId is required" },
        { status: 400 }
      );
    }

    let report: AnalysisReport = fallbackReport || {
      url: "https://example.com",
      title: "Example Website",
      layout: "Hero → Feature Grid → Pricing → Testimonials → Footer",
      colors: ["#1A73E8", "#0F172A", "#FFFFFF", "#64748B"],
      typography: "Inter + Satoshi (Modern Sans)",
      components: ["Navigation", "Hero CTA", "Cards", "Pricing Tables", "Forms"],
      industry: "SaaS Platform",
      audience: "Developers & Startups",
      uxScore: 87,
    };

    if (analysisId && !analysisId.startsWith("temp-")) {
      try {
        const found = await prisma.websiteAnalysis.findUnique({
          where: { id: analysisId },
        });
        if (found) {
          report = {
            url: found.url,
            title: found.title || found.url,
            layout: found.layout,
            colors: JSON.parse(found.colors),
            typography: found.typography,
            components: JSON.parse(found.components),
            industry: found.industry,
            audience: found.audience,
            uxScore: found.uxScore,
          };
        }
      } catch (err) {
        console.warn("DB lookup error, using report:", err);
      }
    }

    const transformation = generateTransformation(report, presetId);

    // Save transformation in DB
    let dbTransformationId = "trans-" + Date.now();
    if (analysisId && !analysisId.startsWith("temp-")) {
      try {
        const saved = await prisma.styleTransformation.create({
          data: {
            analysisId,
            presetId: transformation.preset.id,
            presetName: transformation.preset.name,
            presetColor: transformation.preset.color,
            themeTokens: JSON.stringify(transformation.tokens),
            generatedCss: transformation.css,
          },
        });
        dbTransformationId = saved.id;
      } catch (e) {
        console.warn("Could not save transformation in DB:", e);
      }
    }

    return NextResponse.json({
      success: true,
      id: dbTransformationId,
      transformation,
    });
  } catch (error: any) {
    console.error("Transform error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to transform styles" },
      { status: 500 }
    );
  }
}
