import Axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

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
    const feedResponse = await Axios.get(url);

    response.status(200);
    response.send(feedResponse.data);
  } catch (error) {
    response.status(422);
    response.send({
      message: error.message,
    });
  }
};

export default handler;
