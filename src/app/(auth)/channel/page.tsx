"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { YouTubeChannel } from "@/types/youtube";

export default function ChannelPage() {
  const [channelInfo, setChannelInfo] = useState<YouTubeChannel | null>(null);
  const [handle, setHandle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const cleanHandle = (input: string) => {
    return input.replace("@", "").trim();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setChannelInfo(null);

    const cleanedHandle = cleanHandle(handle);

    try {
      const response = await fetch(`/api/youtube?handle=${encodeURIComponent(cleanedHandle)}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to fetch channel data");
        return;
      }

      setChannelInfo(data);
    } catch (error) {
      console.error("Error fetching channel data:", error);
      setError("Error fetching channel data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: string) => {
    return parseInt(num).toLocaleString();
  };

  return (
    <div className="grid min-h-screen place-content-center p-4">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Channel Info</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="items-center space-x-2 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base ring-offset-background focus-within:outline-foreground focus-within:outline-2 focus-within:outline-offset-2 md:text-sm">
                <span className="text-sm bg-accent">youtube.com/</span>
                <input
                  placeholder="@channelhandle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="flex-1 ring-0 w-full border-l border-input bg-transparent px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the channel handle (e.g. @username)
              </p>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isLoading ? "Searching..." : "Search Channel"}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {channelInfo && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={channelInfo.snippet.thumbnails.default.url}
                  alt={channelInfo.snippet.title}
                  className="h-16 w-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{channelInfo.snippet.title}</h3>
                  <p className="text-sm text-gray-500">
                    {formatNumber(channelInfo.statistics.subscriberCount)} subscribers
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg p-3">
                  <p className="text-sm">Total Views</p>
                  <p className="font-semibold">
                    {formatNumber(channelInfo.statistics.viewCount)}
                  </p>
                </div>
                <div className="rounded-lg p-3">
                  <p className="text-sm ">Videos</p>
                  <p className="font-semibold">
                    {formatNumber(channelInfo.statistics.videoCount)}
                  </p>
                </div>
              </div>

              <div className="rounded-lg p-3">
                <p className="text-sm">Description</p>
                <p className="text-sm">
                  {channelInfo.snippet.description.slice(0, 200)}
                  {channelInfo.snippet.description.length > 200 ? "..." : ""}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}