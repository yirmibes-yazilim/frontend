import { useEffect, useState } from "react";
import instance from "../api/axiosInstance"; 
import ProductItem from "./ProductItem";
import { addFavorite, removeFavorite, getFavorites } from "../api/favoriteService";
import { DEFAULT_COLS } from "../components/ColumnCounter"; // ortak sabiti içe aktarır
import clsx from "clsx"; //değiştirilebilir css için clsx import edildi

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

type ColCount = 1|2|3|4|5|6|7|8|9|10|11|12; 

const COL_MAP: Record<ColCount, string> = { //Sütun sayı değerlerinin hangi grid-cols a denk geldiği belirlenir
  1:"grid-cols-1", 2:"grid-cols-2", 3:"grid-cols-3", 4:"grid-cols-4",
  5:"grid-cols-5", 6:"grid-cols-6", 7:"grid-cols-7", 8:"grid-cols-8",
  9:"grid-cols-9", 10:"grid-cols-10", 11:"grid-cols-11", 12:"grid-cols-12",
};

const COLS_KEY = "global_cols";

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [cols, setCols] = useState<ColCount>(4);

  useEffect(() => {
    instance.get("/Products/list")
      .then((response) => {
        if (response.data.isSuccessful) {
          setProducts(response.data.data);
        } else {
          console.error("Ürün listesi alınamadı:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  }, []);

    // Favori ürünleri çek
  useEffect(() => {
    getFavorites()
      .then((response) => {
        if (response.data.isSuccessful) {
          // Eğer response.data.data productId dizisiyse:
          setFavoriteIds(response.data.data.map((item: any) => item.productId ?? item.id));
          // productId yoksa doğrudan id’yi alabilirsin
        }
      })
      .catch(() => setFavoriteIds([]));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(COLS_KEY);
    const val = saved ? Number(saved) : DEFAULT_COLS;
    setCols((Math.min(12, Math.max(1, val))) as ColCount);
  }, []);

    useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem(COLS_KEY);
      const val = saved ? Number(saved) : DEFAULT_COLS;
      setCols((Math.min(12, Math.max(1, val))) as ColCount);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
    // Favori toggle fonksiyonu
  const handleToggleFavorite = (id: number, isFav: boolean) => {
    if (isFav) {
      removeFavorite(id).then(() => {
        setFavoriteIds((prev) => prev.filter(fid => fid !== id));
      });
    } else {
      addFavorite(id).then(() => {
        setFavoriteIds((prev) => [...prev, id]);
      });
    }
  };

  return (
    <div className={clsx("grid gap-10 mb-8 mx-8", COL_MAP[cols])}>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          isFavorited={favoriteIds.includes(product.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
};

export default Products;