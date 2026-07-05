import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { PostgrestError } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";

import type { Card } from "../types/card";
import type { CardFormData } from "../types/cardForm";

type CardsContextType = {
  cards: Card[];
  loading: boolean;

  addCard: (
    card: CardFormData
  ) => Promise<{ error: PostgrestError | null }>;
  updateCard: (
    id: number,
    card: CardFormData
  ) => Promise<{ error: PostgrestError | null }>;
  deleteCard: (
    id: number
  ) => Promise<{ error: PostgrestError | null }>;

  refreshCards: () => Promise<void>;
};

const CardsContext = createContext<CardsContextType | null>(null);

function CardsProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshCards();
  }, []);

  async function refreshCards() {
    setLoading(true);

    const { data, error } = await supabase
      .from("cards")
      .select(`
        *,
        category:categories (
          id,
          name,
          created_at
        )
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCards(data as Card[]);
    }

    setLoading(false);
  }

  async function addCard(card: CardFormData) {
    const { error } = await supabase
      .from("cards")
      .insert(card);

    if (!error) {
      await refreshCards();
    }

    return { error };
  }

  async function updateCard(
    id: number,
    card: CardFormData
  ) {
    const { error } = await supabase
      .from("cards")
      .update(card)
      .eq("id", id);

    if (!error) {
      await refreshCards();
    }

    return { error };
  }

  async function deleteCard(id: number) {
    const { error } = await supabase
      .from("cards")
      .delete()
      .eq("id", id);

    if (!error) {
      await refreshCards();
    }

    return { error };
  }

  return (
    <CardsContext.Provider
      value={{
        cards,
        loading,
        addCard,
        updateCard,
        deleteCard,
        refreshCards,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}

export { CardsProvider };

export default CardsContext;
