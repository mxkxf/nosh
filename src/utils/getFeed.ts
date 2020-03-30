import axios from "axios";
import Parser from "rss-parser";

export default async function getFeed(url: string) {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/${url}`,
  );

  const parser = new Parser();
  const feed = await parser.parseString(response.data);

  const urlParts = new URL(url);

  return {
    url,
    title: feed.title,
    icon: `https://${urlParts.hostname}/favicon.ico`,
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
        }))
      : [],
  } as Feed;
}
