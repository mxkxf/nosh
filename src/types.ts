export type FeedItem = {
  title: string;
  description: string;
  link: string;
  author: string;
  pubDate: string;
  content: string;
};

export type Feed = {
  title: string;
  description: string;
  url: string;
  link: string;
  icon: string;
  items: FeedItem[];
};
