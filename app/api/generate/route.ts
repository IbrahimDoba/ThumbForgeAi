import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const params = await req.json();
    const { userPrompt, thumbnailText, imageType, aspectRatio, colorPalette, enhancePrompt } = params;

    // Construct the prompt based on user inputs
    const basePrompt = `Create a professional thumbnail image that is ${imageType} style, with ${colorPalette} colors. 
    The image should be ${aspectRatio} and ${enhancePrompt ? 'enhanced with additional details' : 'simple and straightforward'}. 
    The main focus should be: ${userPrompt}. 
    Prominently display the following text on the thumbnail: "${thumbnailText}". 
    Ensure the text is easily readable, bold and contrasts well with the background. 
    The text should be integrated into the image design in a visually appealing way.`;

    // Send request to Ideogram API
    const response = await fetch("https://api.ideogram.ai/generate", {
      method: "POST",
      headers: {
        "Api-Key": process.env.IDEOGRAM_AI_KEY!,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_request: {
          prompt: basePrompt,
          aspect_ratio: mapAspectRatio(aspectRatio),
          model: "V_1_TURBO",
          magic_prompt_option: "AUTO"
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate images');
    }

    const body = await response.json();
    console.log(body)
    const url = body.data?.url; //  pass the proper url 

    if (!url) {
      throw new Error('No image URL returned from Ideogram API');
    }

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error('Error generating images:', error);
    return NextResponse.json({ error: 'Failed to generate images' }, { status: 500 });
  }
}

// Helper function to map aspect ratios to Ideogram-compatible values
function mapAspectRatio(aspectRatio: string): "ASPECT_1_1" | "ASPECT_16_9" | "ASPECT_10_16" {
  switch (aspectRatio) {
    case '1:1':
      return "ASPECT_1_1";
    case '16:9':
      return "ASPECT_16_9";
    case '9:16':
      return "ASPECT_10_16";
    default:
      return "ASPECT_1_1";  // Default to square if unknown
  }
}