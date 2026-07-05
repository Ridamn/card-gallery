import { useState } from "react";

import Hero from "../components/Hero";
import SearchBar from "../components/cards/SearchBar";
import CategoryFilter from "../components/cards/CategoryFilter";
import CardGrid from "../components/cards/CardGrid";
import CardSkeletonGrid from "../components/ui/CardSkeletonGrid";

import { useCards } from "../hooks/useCards";
import { useCategories } from "../hooks/useCategories";

function Home() {
  const { cards, loading } = useCards();
  const { categories } = useCategories();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      card.name.toLowerCase().includes(search.toLowerCase()) ||
      card.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      card.category?.name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6">
      <Hero />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {loading ? (
        <CardSkeletonGrid />
      ) : (
        <CardGrid cards={filteredCards} />
      )}
    </div>
  );
}

export default Home;
