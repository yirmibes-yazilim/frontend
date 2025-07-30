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
  return (
    <div className="bg-white shadow-md p-4 rounded">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-green-600 font-bold">{product.price}₺</p>
      <p className="text-sm text-gray-500">Stok: {product.stock}</p>
    </div>
  );
};

export default ProductItem;