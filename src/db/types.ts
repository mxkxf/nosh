import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  users: UsersTable;
  feed: FeedsTable;
}

export interface UsersTable {
  id: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;

export interface FeedsTable {
  id: Generated<number>;
  user_id: string;
  title: string;
  url: string;
  description: string | null;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Feed = Selectable<FeedsTable>;
export type NewFeed = Insertable<FeedsTable>;
export type FeedUpdate = Updateable<FeedsTable>;
