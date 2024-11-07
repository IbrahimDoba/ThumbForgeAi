
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { generatedImages, users } from "@/lib/db/schema";
import getSession from "@/lib/getSession";
import { validateRequest } from "@/lib/validateRequest";
import { mapAspectRatio, mapColorPalette, mapStyleType } from "./helpers";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    await validateRequest();

    const session = await getSession();
    // const user = session?.user;

    const user = await db.query.users.findFirst({
      where: eq(users.id, session?.user.id),
    });

    if (!user || user?.credits! < 2) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 403 });
    }

    const params = await req.json();
    const {
      userPrompt,
      thumbnailText,
      imageType,
      aspectRatio,
      colorPalette,
      enhancePrompt,
    } = params;

    // Construct the prompt based on user inputs
    const basePrompt = `${userPrompt}. Text "${thumbnailText}" bold and readable, well-integrated with background.`;

    const imageRequest = {
      prompt: basePrompt,
      aspect_ratio: mapAspectRatio(aspectRatio),
      model: "V_2_TURBO",
      magic_prompt_option: enhancePrompt ? "ON" : "OFF",
      style_type: mapStyleType(imageType),
      color_palette: mapColorPalette(colorPalette),
    };
    console.log('image request',imageRequest)
    const response = await fetch("https://api.ideogram.ai/generate", {
      method: "POST",
      headers: {
        "Api-Key": process.env.IDEOGRAM_AI_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_request: imageRequest }),
    });
      console.log(response)
    if (!response.ok) {
      throw new Error("Failed to generate images");
    }

    const body = await response.json();
    console.log(body);
    const url = body.data[0].url; //  pass the proper url
    const enhancedPromptText = body.data[0].prompt


    if (!url) {
      throw new Error("No image URL returned from Ideogram API");
    }
    // Update user credits
    await db.update(users)
      .set({ credits: user?.credits! - 2 })
      .where(eq(users.id, user.id));

    // Save the generated image
    await db.insert(generatedImages).values({
      userId: user.id,
      imageUrl: url,
      prompt: userPrompt,
      enhancedPrompt: enhancedPromptText,
      thumbnailText,
      imageType,
      aspectRatio,
      colorPalette, // fix auto color option
      enhancePrompt: enhancePrompt ? "true" : "false",
      creditCost: 2,
    });

    return NextResponse.json({ url, enhancedPromptText }, { status: 200 });

  } catch (error) {
    console.error("Error generating images:", error);
    return NextResponse.json(
      { error: "Failed to generate images" },
      { status: 500 },
    );
  }
}
