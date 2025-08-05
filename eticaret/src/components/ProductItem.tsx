import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface ProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
  };
}

const ProductItem = ({ product }: ProductProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Favori butonuna tıklandığında çalışacak fonksiyon
  const handleToggleFavorite = () => {
    setIsFavorited((prev) => !prev);
    // Burada API çağrısı ile backend'e favori ekle/çıkar işlemi yapılmalı
    // await fetch("/api/favorites", ...)
  };

  return (
    <div className="bg-white shadow-md p-4 rounded">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-contain object-center mb-4 rounded"
        />
        <button
          className="absolute top-2 right-2 "
          onClick={handleToggleFavorite}
          aria-label={isFavorited ? "Favorilerden çıkar" : "Favorilere ekle"}
        >
          {isFavorited ? (
            <FaHeart color="red" size={22} />
          ) : (
            <FaRegHeart size={22} />
          )}
        </button>
      </div>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-green-600 font-bold">{product.price}₺</p>
      <p className="text-sm text-gray-500">Stok: {product.stock}</p>
    </div>
  );
};

export default ProductItem;