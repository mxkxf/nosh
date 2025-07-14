import Parser from "rss-parser";
import { z } from "zod";

import { NextRequest, NextResponse } from "next/server";
import { Feed, FeedItem } from "@/types";

const parser: Parser<Feed, FeedItem> = new Parser({
  customFields: {
    item: ["contentSnippet"],
  },
});

const schema = z.object({
  url: z.url(),
});

export async function GET(request: NextRequest) {
  const result = schema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams)
  );

  if (!result.success) {
    return NextResponse.json(
      {
        message: result.error.message,
      },
      {
        status: 400,
      }
    );
  }

  const url = result.data.url;

  try {
    const feed = await parser.parseURL(url);
    const urlParts = new URL(url);

    let icon = null;
    const iconUrl = `https://${urlParts.hostname}/favicon.ico`;

    try {
      const response = await fetch(iconUrl);

      if (response.status !== 200) {
        throw new Error("Could not get icon");
      }

      icon = iconUrl;
    } catch (error) {
      console.log("Error getting icon", error);
    }

    return NextResponse.json({
      url,
      icon,
      title: feed.title,
      description: feed.description,
      link: feed.link,
      items: feed.items
        ? feed.items.map((item) => ({
            title: item.title,
            description: item.contentSnippet,
            link: item.link,
            author: item.author,
            pubDate: item.pubDate,
            content: item.content,
            read: false,
          }))
        : [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong, please try again later",
      },
      {
        status: 500,
      }
    );
  }
}
