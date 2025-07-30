import { useState  } from "react";

interface FilterProps {
  categories: string[];
  onFilter: (filters: {
    selectedCategories: string[];
    minPrice: string;
    maxPrice: string;
    stockStatus: string;
  }) => void;
}

const FilterSidebar = ({ categories, onFilter }: FilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [stockStatus, setStockStatus] = useState("Hepsi");

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleFilterClick = () => {
    onFilter({ selectedCategories, minPrice, maxPrice, stockStatus });
  };

  return ( 
    <div className="w-64 h-screen p-4 bg-white shadow-md border-r overflow-y-auto">
      {/* Kategori */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Kategori</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Fiyat Aralığı */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Fiyat Aralığı (₺)</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="w-1/2 px-2 py-1 border rounded-md text-sm"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="w-1/2 px-2 py-1 border rounded-md text-sm"
          />
        </div>
      </div>

      {/* Stok Durumu */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Stok Durumu</h3>
        <select
          value={stockStatus}
          onChange={(e) => setStockStatus(e.target.value)}
          className="w-full px-2 py-1 border rounded-md text-sm"
        >
          <option value="Hepsi">Hepsi</option>
          <option value="Stokta Olanlar">Stokta Olanlar</option>
          <option value="Stokta Olmayanlar">Stokta Olmayanlar</option>
        </select>
      </div>

      {/* Filtrele Butonu */}
      <button
        onClick={handleFilterClick}
        className="w-full bg-gray-800 hover:bg-gray-600 text-white text-sm py-2 rounded-md"
      >
        Filtrele
      </button>
    </div>
  );
};

export default FilterSidebar;