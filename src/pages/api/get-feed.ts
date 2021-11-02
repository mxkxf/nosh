import { NextApiRequest, NextApiResponse } from 'next';
import Parser from 'rss-parser';

import { version } from '../../../package.json';
import { client } from '../../utils/client';

function isValidUrl(str: string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
}

const parser = new Parser();

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { url } = request.body;

  if (!url || url.trim() === '' || !isValidUrl(url)) {
    response.status(400);
    response.send({
      message: 'URL is missing/invalid',
    });
    return;
  }

  try {
    const feedResponse = await client.get(url, {
      headers: {
        'User-Agent': `nosh/${version}`,
      },
    });
    const feed = await parser.parseString(feedResponse.data);
    const urlParts = new URL(url);

    let icon = null;
    const iconUrl = `https://${urlParts.hostname}/favicon.ico`;

    try {
      await client.get(iconUrl);

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
    let message = 'Error unknown';

    if (error instanceof Error) {
      message = error.message;
    }

    response.status(500);
    response.send({
      message,
    });
  }
};

export default handler;
