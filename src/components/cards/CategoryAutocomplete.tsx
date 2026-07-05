import { useEffect, useMemo, useState, useRef } from "react";
import { useCategories } from "../../hooks/useCategories";
import type { Category } from "../../types/category";

type Props = {
  value: Category | null;
  onChange: (category: Category | null) => void;
};

function CategoryAutocomplete({ value, onChange }: Props) {
  const { categories, createCategory } = useCategories();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setQuery(value?.name ?? "");
  }, [value]);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [categories, query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const exactMatch = useMemo(() => {
    return categories.find(
      (category) =>
        category.name.toLowerCase() === query.trim().toLowerCase()
    );
  }, [categories, query]);

  async function handleCreate() {
    const { category, error } = await createCategory(query);

    if (error || !category) return;

    onChange(category);
    setQuery(category.name);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={wrapperRef}>
      {/* <input
        type="text"
        placeholder="Category"
        value={query}
        onChange={(e) => {
          const nextQuery = e.target.value;
          setQuery(nextQuery);

          const matchedCategory = categories.find(
            (category) =>
              category.name.toLowerCase() === nextQuery.trim().toLowerCase()
          );

          onChange(matchedCategory ?? null);
        }}
        className="w-full border rounded-lg p-3"
      /> */}
      <input
          type="text"
          placeholder="Category"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
          }}
          className="w-full border rounded-lg p-3"
      />

      {isOpen && query && (
        <div className="absolute z-20 mt-2 w-full rounded-lg border bg-white shadow-lg max-h-56 overflow-y-auto">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  onChange(category);
                  setQuery(category.name);
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                {category.name}
              </button>
            ))
          ) : !exactMatch ? (
            <button
              type="button"
              onClick={handleCreate}
              className="block w-full px-4 py-2 text-left text-blue-600 hover:bg-gray-100"
            >
              + Create "{query}"
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default CategoryAutocomplete;
