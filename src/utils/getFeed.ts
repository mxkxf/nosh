import axios from 'axios';

export default async function getFeed(url: string) {
  const response = await axios.post(`/api/get-feed`, { url });

  return response.data;
}
