export type PostFrontMatter = {
  title?: string;
  description?: string | null;
  tags?: string[] | null;
  publishedDate?: string | null;
  image?: string | null;
  series?: string | null;
};

export type SeriesFrontMatter = {
  title: string;
  description?: string | null;
};

export type Post = {
  frontMatter: PostFrontMatter;
  slug: string;
  markdownBody?: string;
};

export type Series = {
  frontMatter: SeriesFrontMatter;
  slug: string;
};

export type Replies = {
  uid: string;
  content: string;
  displayName: string;
  photoURL?: string | null;
};

export type Comment = {
  id: number;
  uid: string;
  content: string;
  displayName: string;
  photoURL?: string | null;
  replies?: Comment[] | null;
};

export type User = {
  displayName: string;
  photoURL: string | null;
  uid: string;
};

export type UserContext = {
  currentUser: User | null;
  isAuthLoading: boolean;
  setIsAuthLoading: (value: boolean) => void;
};

export type PostFilters = {
  tag?: string | null;
  series?: string | null;
};
