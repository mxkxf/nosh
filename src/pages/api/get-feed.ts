import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import Parser from 'rss-parser';

const parser = new Parser();

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { url } = request.body;

  if (!url || url.trim() === '') {
    response.status(400);
    response.send({
      message: 'URL is missing',
    });
    return;
  }

  try {
    const feedResponse = await axios.get(url);

    const feed = await parser.parseString(feedResponse.data);

    const urlParts = new URL(url);

    let icon = null;
    const iconUrl = `https://${urlParts.hostname}/favicon.ico`;

    try {
      await axios.get(`https://cors-anywhere.herokuapp.com/${iconUrl}`);

      icon = iconUrl;
    } catch (error) {
      //
    }

    response.status(200);
    response.send({
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
    });
  } catch (error) {
    response.status(500);
    response.send({
      message: error.message,
    });
  }
};

export default handler;
