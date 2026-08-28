import { NextResponse } from "next/server";
import { requireApiStaffAccess } from "@/lib/auth/server";
import { generateCampaignPack, CampaignRequest } from "@/lib/server/ai-content-generator";

export async function POST(request: Request) {
  const auth = await requireApiStaffAccess();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as CampaignRequest;

    if (!body.product || !body.persona || !body.trigger) {
      return NextResponse.json(
        { error: "Missing required campaign parameters (product, persona, trigger)" },
        { status: 400 }
      );
    }

    const campaignPack = generateCampaignPack(body);

    return NextResponse.json({
      success: true,
      campaignPack,
    });
  } catch (error) {
    console.error("[AI Content Generation Error]", error);
    return NextResponse.json(
      { error: "Failed to synthesize AI campaign content" },
      { status: 500 }
    );
  }
}
