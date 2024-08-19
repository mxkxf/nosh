import Parser from "rss-parser";
import { z, ZodError } from "zod";

import { NextRequest, NextResponse } from "next/server";
import { Feed, FeedItem } from "@/types";

const parser: Parser<Feed, FeedItem> = new Parser({
  customFields: {
    item: ["contentSnippet"],
  },
});

const schema = z.object({
  url: z.string().url(),
});

export async function GET(request: NextRequest) {
  try {
    const { url } = schema.parse(
      Object.fromEntries(request.nextUrl.searchParams)
    );

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
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: error.errors[0].message,
        },
        {
          status: 400,
        }
      );
    }

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
