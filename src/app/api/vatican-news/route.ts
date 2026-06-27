import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Fetch YouTube RSS Feed for latest video
    const ytRes = await fetch(
      "https://www.youtube.com/feeds/videos.xml?channel_id=UCxIsefyl9g9A5SGWA4FvGIA",
      { next: { revalidate: 1800 } } // Cache for 30 minutes
    );
    const ytText = await ytRes.text();

    const videoMatch = ytText.match(/<entry>([\s\S]*?)<\/entry>/);
    let video = null;
    if (videoMatch) {
      const entryContent = videoMatch[1];
      const title = (entryContent.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
      const videoId = (entryContent.match(/<yt:videoId>([\s\S]*?)<\/yt:videoId>/) || [])[1] || "";
      const published = (entryContent.match(/<published>([\s\S]*?)<\/published>/) || [])[1] || "";
      video = {
        title: title.replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim(),
        videoId,
        published,
      };
    }

    // 2. Fetch Vatican News English RSS Feed
    const newsRes = await fetch(
      "https://www.vaticannews.va/en.rss.xml",
      { next: { revalidate: 1800 } } // Cache for 30 minutes
    );
    const newsText = await newsRes.text();

    const newsItems: Array<{ title: string; link: string; pubDate: string }> = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(newsText)) !== null && newsItems.length < 2) {
      const itemContent = match[1];
      
      let title = "";
      const cdataMatch = itemContent.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
      if (cdataMatch) {
        title = cdataMatch[1].trim();
      } else {
        const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
        title = titleMatch ? titleMatch[1].trim() : "";
      }
      
      const link = (itemContent.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || "";
      const pubDate = (itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || "";

      // Format date: e.g. "Fri, 26 Jun 2026 13:15:00 +0200" -> "26.06.2026"
      let formattedDate = "";
      try {
        const dateObj = new Date(pubDate);
        if (!isNaN(dateObj.getTime())) {
          const day = String(dateObj.getDate()).padStart(2, '0');
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const year = dateObj.getFullYear();
          formattedDate = `${day}.${month}.${year}`;
        } else {
          formattedDate = pubDate;
        }
      } catch {
        formattedDate = pubDate;
      }

      newsItems.push({
        title: title.replace(/&amp;/g, '&').trim(),
        link: link.trim(),
        pubDate: formattedDate,
      });
    }

    return NextResponse.json({
      video,
      news: newsItems,
    });
  } catch (error) {
    console.error("Error fetching Vatican News API:", error);
    return NextResponse.json(
      { error: "Failed to fetch Vatican News data" },
      { status: 500 }
    );
  }
}
