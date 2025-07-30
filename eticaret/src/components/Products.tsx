import { useEffect, useState } from "react";
import instance from "../api/axiosInstance"; 
import ProductItem from "./ProductItem";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <div className="grid grid-cols-4 gap-10 mb-8 mx-8">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;