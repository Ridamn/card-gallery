type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({ search, setSearch }: Props) {
  return (
    <div className="max-w-xl mx-auto mb-10">
      <input
        type="text"
        placeholder="Search cards..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
      />
    </div>
  );
}

export default SearchBar;