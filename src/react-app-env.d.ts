/// <reference types="react-scripts" />

declare module "colorthief";

declare type FeedItem = {
  title: string;
  description: string;
  link: string;
  author: string;
  pubDate: string;
  content: string;
};

declare type Feed = {
  title: string;
  description: string;
  url: string;
  link: string;
  icon: string;
  items: FeedItem[];
};
