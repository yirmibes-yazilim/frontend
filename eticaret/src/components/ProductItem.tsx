import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

interface ProductItemProps {
  product: Product;
  isFavorited: boolean;
  onToggleFavorite: (id: number, isFavorited: boolean) => void;
}

const ProductItem = ({ product, isFavorited, onToggleFavorite }: ProductItemProps) => {
  return (
    <div className="bg-white shadow-md p-4 rounded">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-contain object-center mb-4 rounded"
        />
        <button
          className="absolute top-2 right-2"
          onClick={() => onToggleFavorite(product.id, isFavorited)}
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
