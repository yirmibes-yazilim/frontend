import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { getFavorites, removeFavorite } from "../api/favoriteService";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFavorites()
      .then((response) => {
        if (response.data.isSuccessful) {
          setFavorites(response.data.data);
        } else {
          setFavorites([]);
        }
      })
      .catch(() => setFavorites([]))
      .finally(() => setLoading(false));
  }, []);

  const handleRemoveFavorite = (productId: number) => {
    removeFavorite(productId).then(() => {
      setFavorites((prev) => prev.filter((item) => item.id !== productId));
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form className="bg-white p-10 rounded-2xl shadow-md w-full max-w-screen relative">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="Kapat"
        >
          &times;
        </button>
        <div className="text-2xl font-bold mb-6 text-center">Favorilerim</div>
        {favorites.length === 0 ? (
          <div className="text-center text-gray-500 py-16">Henüz favori ürününüz yok.</div>
        ) : (
          <div className="grid grid-cols-3 gap-10 mb-8 mx-8">
            {favorites.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                isFavorited={true}
                onToggleFavorite={() => handleRemoveFavorite(product.id)}
              />
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Favorites;
