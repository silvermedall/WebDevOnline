import { useState } from "react";

interface FilterProps {
  onFilterChange: (filters: {
    searchTerm: string;
    materialFilter: string;
    sortBy: string;
  }) => void;
}

const ShopFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [materialFilter, setMaterialFilter] = useState("all");
  const [sortBy, setSortBy] = useState("price");

  const handleFilterChange = () => {
    onFilterChange({
      searchTerm,
      materialFilter,
      sortBy,
    });
  };

  return (
    <div className="filter-container">
      <h2>Filter:</h2>
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p className="material-label">Material:</p>
      <select
        className="material-select"
        value={materialFilter}
        onChange={(e) => setMaterialFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="plastic">Plastic</option>
        <option value="metal">Metal</option>
        <option value="wood">Wood</option>
      </select>
      <p className="sort-label">Sort by:</p>
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
      <button className="filter-button" onClick={handleFilterChange}>
        Filter
      </button>
    </div>
  );
};

export default ShopFilter;
