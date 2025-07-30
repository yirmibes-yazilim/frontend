import { useEffect, useState } from "react";
import instance from "../api/axiosInstance";
import FilterSidebar from "../components/FilterSidebar";
import AdminAddProduct from "../components/AdminAddProduct";


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
}

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false); 
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);


  const fetchProducts = async () => {
    try {
      const response = await instance.get("/Products/list");
      if (response.data.isSuccessful) {
        const data = response.data.data;
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = Array.from(
          new Set(data.map((p: Product) => p.category))
        ) as string[];
        setAllCategories(["Tümü", ...uniqueCategories]);
      }
    } catch (error) {
      console.error("Ürünler listelenemedi...", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilter = ({
    selectedCategories,
    minPrice,
    maxPrice,
    stockStatus,
  }: {
    selectedCategories: string[];
    minPrice: string;
    maxPrice: string;
    stockStatus: string;
  }) => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice));
    }

    if (stockStatus === "Stokta Olanlar") {
      filtered = filtered.filter((p) => p.stock > 0);
    } else if (stockStatus === "Stokta Olmayanlar") {
      filtered = filtered.filter((p) => p.stock === 0);
    }

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      await instance.delete(`/Products/delete/${productToDelete.id}`);
      setProductToDelete(null);
      fetchProducts();
    } catch (error) {
      console.error("Ürün silinirken hata oluştu:", error);
    }
  };

  return (
    <div className="flex">
      {/* Sağ ana içerik */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Ürünler</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Ürün adı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md"
            />
            <button
              onClick={() => { setEditingProduct(null); setShowAddForm(true); }}
              className="bg-white border text-black hover:bg-gray-200 text-sm px-4 py-2 rounded-md"
            >
              + Yeni ürün ekle
            </button>
          </div>
        </div>

        {/* Ekleme formunu göster */}
        {showAddForm && (
          <AdminAddProduct
            onClose={() => setShowAddForm(false)}
            onSuccess={fetchProducts}
            product={editingProduct}
          />
        )}

        {/* Onaylı Silme */}
        {productToDelete && (
          <div className="mb-4 bg-red-50 p-4 rounded-lg border border-red-300">
            <p className="text-red-600 mb-2">
              “{productToDelete.name}” adlı ürünü silmek istediğinize emin misiniz?
            </p>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Evet, sil
            </button>
            <button
              onClick={() => setProductToDelete(null)}
              className="ml-2 text-gray-500 hover:text-black"
            >
              İptal
            </button>
          </div>
        )}


        {/* Ürün kartları */}
        {loading ? (
          <p>Yükleniyor...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600 text-sm font-bold">{product.category}</p>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="text-green-600 font-bold mt-2">{product.price}₺</p>
                <p className="text-gray-500 text-sm">Stok: {product.stock}</p>

                <div className="flex justify-between mt-4 text-sm">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setShowAddForm(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => setProductToDelete(product)}
                    className="text-red-600 hover:underline"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sol sabit filtre paneli */}
      <div className="w-64">
        <FilterSidebar categories={allCategories} onFilter={handleFilter} />
      </div>
    </div>
  );
};

export default AdminProductsPage;



