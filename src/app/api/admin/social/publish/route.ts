import { NextRequest, NextResponse } from "next/server";
import { dispatchSocialCampaign } from "@/lib/server/social-publisher";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || !body.payload || !body.channels) {
      return NextResponse.json(
        { error: "Invalid request. 'payload' and 'channels' are required." },
        { status: 400 }
      );
    }

    const result = await dispatchSocialCampaign({
      channels: body.channels,
      payload: body.payload,
      customWebhookUrl: body.customWebhookUrl,
    });

    return NextResponse.json(result, { status: result.success ? 200 : 502 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error during social dispatch" },
      { status: 500 }
    );
  }
}
