
export interface YouTubeSearchResponse {
   kind: string;
   etag: string;
   nextPageToken?: string;
   regionCode?: string;
   pageInfo: {
     totalResults: number;
     resultsPerPage: number;
   };
   items: YouTubeSearchItem[];
 }
 
 export interface YouTubeSearchItem {
   kind: string;
   etag: string;
   id: {
     kind: string;
     channelId: string;
     videoId?: string;
     playlistId?: string;
   };
   snippet: YouTubeSnippet;
 }
 
 export interface YouTubeChannelResponse {
   kind: string;
   etag: string;
   pageInfo: {
     totalResults: number;
     resultsPerPage: number;
   };
   items: YouTubeChannel[];
 }
 
 export interface YouTubeChannel {
   kind: string;
   etag: string;
   id: string;
   snippet: YouTubeSnippet;
   statistics: YouTubeChannelStatistics;
 }
 
 export interface YouTubeSnippet {
   publishedAt: string;
   channelId: string;
   title: string;
   description: string;
   thumbnails: {
     default: YouTubeThumbnail;
     medium: YouTubeThumbnail;
     high: YouTubeThumbnail;
     standard?: YouTubeThumbnail;
     maxres?: YouTubeThumbnail;
   };
   channelTitle: string;
   localized?: {
     title: string;
     description: string;
   };
   country?: string;
 }
 
 export interface YouTubeThumbnail {
   url: string;
   width: number;
   height: number;
 }
 
 export interface YouTubeChannelStatistics {
   viewCount: string;
   subscriberCount: string;
   hiddenSubscriberCount: boolean;
   videoCount: string;
 }