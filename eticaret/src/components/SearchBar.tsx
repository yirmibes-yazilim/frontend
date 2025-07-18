import { useState } from "react";
//useState = input alanına yazılan değeri saklar


const SearchBar = () => {
// Arama terimini tutar
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    /* Boşsa işlem yapma */
    if (query.trim() === "") return;
    alert(`Arama yapılıyor: ${query}`);
    // Burada API istekleri ya da yönlendirme yapılabilir
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter tuşuna basılırsa ara
    if (e.key === "Enter") {
      handleSearch();       //Butona basıldığında tetiklenir, şu an alert, ama filtreleme veya API olabilir.
    }
  };

  return (
    <div className="w-full max-w-md">
        {/* Giriş kutusu */}
        
      <input
        type="text"
        placeholder="Ürün veya kategori ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} //Input her değiştiğinde query güncellenir
        onKeyDown={handleKeyDown}       //onKeyDown = Klavyeden bir tuşa basıldığında çalışması
        className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-4xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
