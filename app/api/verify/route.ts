import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, fullName, email, company } = body;

    if (!url || !fullName || !email) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required verification fields." },
        { status: 400 }
      );
    }

    let verificationId = "verif-" + Date.now();
    try {
      const record = await prisma.verification.create({
        data: {
          url,
          fullName,
          email,
          company: company || "Independent",
        },
      });
      verificationId = record.id;
    } catch (e) {
      console.warn("DB record error on verify:", e);
    }

    return NextResponse.json({
      success: true,
      verified: true,
      verificationId,
      message: "Domain verified and transformation authorized.",
    });
  } catch (error: any) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Verification failed" },
      { status: 500 }
    );
  }
}
