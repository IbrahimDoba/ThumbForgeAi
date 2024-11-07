// app/api/youtube/route.ts
import { YouTubeChannelResponse, YouTubeSearchResponse } from "@/types/youtube";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");

  if (!handle) {
    return Response.json(
      { error: "Handle parameter is required" },
      { status: 400 },
    );
  }

  const key = process.env.YOUTUBE_API_KEY;
  const url = "https://www.googleapis.com/youtube/v3";

  try {
    // First, search for the channel using the handle
    const searchResponse = await fetch(
      `${url}/search?part=snippet&type=channel&q=@${handle}&maxResults=1&key=${key}`,
    );
    const searchData: YouTubeSearchResponse = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return Response.json({ error: "Channel not found" }, { status: 404 });
    }

    // Get the channel ID from the search results
    const channelId = searchData.items[0].snippet.channelId;

    // Fetch the detailed channel information
    const channelResponse = await fetch(
      `${url}/channels?part=snippet,statistics&id=${channelId}&key=${key}`,
    );
    const channelData: YouTubeChannelResponse = await channelResponse.json();

    if (!channelData.items || channelData.items.length === 0) {
      return Response.json(
        { error: "Could not fetch channel details" },
        { status: 404 },
      );
    }

    return Response.json(channelData.items[0]);
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
