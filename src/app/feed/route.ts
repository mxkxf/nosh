import RssParser from "rss-parser";

import { NextRequest, NextResponse } from "next/server";

function isValidUrl(str: string) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

const rssParser = new RssParser();

function parse(url: string): Promise<RssParser.Output<any>> {
  return new Promise((resolve, reject) => {
    rssParser.parseURL(url, (error, feed) => {
      if (error) {
        reject(error);
      }

      resolve(feed);
    });
  });
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const url = params.get("url");

  if (!url || url.trim() === "" || !isValidUrl(url)) {
    return NextResponse.json(
      {
        message: "URL is missing/invalid",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const feed = await parse(url);
    const urlParts = new URL(url);

    let icon = null;
    const iconUrl = `https://${urlParts.hostname}/favicon.ico`;

    try {
      await fetch(iconUrl);

      icon = iconUrl;
    } catch (error) {
      //
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
