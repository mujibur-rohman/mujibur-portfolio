export type Post = {
  id: number;
  slug: string;
  title: string;
  content: string;
  coverImage?: string;
  coverPath?: string;
  isArchived: boolean;
  isPublished: boolean;
};
