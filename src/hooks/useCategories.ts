import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Category } from "../types/category";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (!error && data) {
      setCategories(data);
    }

    setLoading(false);
  }

  async function createCategory(name: string) {
    const cleaned = name.trim();

    if (!cleaned) {
      return {
        error: {
          message: "Category cannot be empty.",
        },
      };
    }

    // Check locally first (case-insensitive)
    const existing = categories.find(
      (category) =>
        category.name.toLowerCase() === cleaned.toLowerCase()
    );

    if (existing) {
      return {
        category: existing,
        error: null,
      };
    }

    const { data, error } = await supabase
      .from("categories")
      .insert({
        name: cleaned,
      })
      .select()
      .single();

    if (error) {
      return { category: null, error };
    }

    await fetchCategories();

    return {
      category: data,
      error: null,
    };
  }

  return {
    categories,
    loading,
    createCategory,
    fetchCategories,
  };
}
