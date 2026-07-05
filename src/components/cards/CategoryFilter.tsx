import type { Category } from "../../types/category";

type Props = {
  categories: Category[];
  selectedCategory: string;
  onChange: (value: string) => void;
};

function CategoryFilter({
  categories,
  selectedCategory,
  onChange,
}: Props) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-72 h-14 border border-gray-300 rounded-xl px-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    >
      <option value="">All Categories</option>

      {categories.map((category) => (
        <option
          key={category.id}
          value={category.name}
        >
          {category.name}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;