import type { Category } from "./category";

export type Card = {
  id: number;
  name: string;
  description: string;
  image_url: string | null;

  category_id: number | null;
  user_id: string;

  created_at: string;

  category?: Category;
};