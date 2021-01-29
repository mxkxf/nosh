import { client } from './client';

export default async function getFeed(url: string) {
  const response = await client.post(`/api/get-feed`, { url });

  return response.data;
}
