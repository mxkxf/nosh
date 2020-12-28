import axios from 'axios';
import Parser from 'rss-parser';
import { Feed } from '../types';

export default async function getFeed(url: string) {
  const response = await axios.post(`/api/get-feed`, { url });

  const parser = new Parser();
  const feed = await parser.parseString(response.data);

  const urlParts = new URL(url);

  let icon = null;
  const iconUrl = `https://${urlParts.hostname}/favicon.ico`;

  try {
    await axios.get(`https://cors-anywhere.herokuapp.com/${iconUrl}`);

    icon = iconUrl;
  } catch (error) {
    //
  }

  return {
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
        }))
      : [],
  } as Feed;
}
