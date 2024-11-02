
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { generatedImages } from "@/lib/db/schema";
import getSession from "@/lib/getSession";
import { validateRequest } from "@/lib/validateRequest";

export async function POST(req: Request) {
  try {
    await validateRequest();

    const session = await getSession();
    const user = session?.user;


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
      model: "V_2",
      magic_prompt_option: enhancePrompt ? "ON" : "OFF",
      style_type: mapStyleType(imageType),
      color_palette: mapColorPalette(colorPalette),
    };

    const response = await fetch("https://api.ideogram.ai/generate", {
      method: "POST",
      headers: {
        "Api-Key": process.env.IDEOGRAM_AI_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_request: imageRequest }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate images");
    }

    const body = await response.json();
    console.log(body);
    const url = body.data[0].url; //  pass the proper url

    if (!url) {
      throw new Error("No image URL returned from Ideogram API");
    }

    // Save the generated image URL to the database
    await db.insert(generatedImages).values({
      userId: user?.id!,

      imageUrl: url,
      prompt: userPrompt,
      thumbnailText,
      imageType,
      aspectRatio,
      colorPalette,
      enhancePrompt: enhancePrompt ? "true" : "false",
    });

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Error generating images:", error);
    return NextResponse.json(
      { error: "Failed to generate images" },
      { status: 500 },
    );
  }
}

// Helper function to map aspect ratios to Ideogram-compatible values
function mapAspectRatio(
  aspectRatio: string,
): "ASPECT_1_1" | "ASPECT_16_9" | "ASPECT_10_16" {
  switch (aspectRatio) {
    case "1:1":
      return "ASPECT_1_1";
    case "16:9":
      return "ASPECT_16_9";
    case "9:16":
      return "ASPECT_10_16";
    default:
      return "ASPECT_1_1"; // Default to square if unknown
  }
}
function mapStyleType(imageType: string): string {
  const styleMap: { [key: string]: string } = {
    "auto": "AUTO",
    "realistic": "REALISTIC",
    "3d-render": "RENDER_3D",
    "anime": "ANIME",
    "general": "GENERAL",
    "design": "DESIGN",
  };
  return styleMap[imageType] || "AUTO";
}

function mapColorPalette(colorPalette: string): string {
  const paletteMap: { [key: string]: string } = {
    "auto": "AUTO",
    "ember": "EMBER",
    "fresh": "FRESH",
    "jungle": "JUNGLE",
    "magic": "MAGIC",
    "melon": "MELON",
    "mosaic": "MOSAIC",
    "pastel": "PASTEL",
    "ultramarine": "ULTRAMARINE",
  };
  return paletteMap[colorPalette] || "AUTO";
}