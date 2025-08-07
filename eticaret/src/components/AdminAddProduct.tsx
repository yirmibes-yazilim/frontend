import { useEffect, useState } from "react";
import instance from "../api/axiosInstance";

// Product tipini güncelledik, categoryId ekledik.
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
  categoryId?: number | string; // Eğer API dönüyorsa, bu alanı ekleyin.
}

// Props arayüzünü güncelledik.
interface Props {
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
}

const AdminAddProduct = ({ onClose, onSuccess, product }: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // product geldiğinde formu doldurur
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        // Burada explicit kontrol var, asla any yok!
        categoryId:
          typeof product.categoryId !== "undefined"
            ? product.categoryId.toString()
            : product.category || "",
      });
      // imageFile'ı otomatik doldurmaya gerek yok
    }
  }, [product]);

  // Tüm input değişiklikleri için
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Görsel dosyası seçme
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Form submit işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("categoryId", formData.categoryId);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const response = await instance.post("/Products/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.isSuccessful) {
        alert("Ürün başarıyla eklendi.");
        onSuccess();
        onClose();
      } else {
        alert("Hata: " + response.data.message);
      }
    } catch (err) {
      console.error("Hata:", err);
      alert("Ürün eklenirken hata oluştu.");
    }
  };

  return (
    <div className="bg-white border rounded-xl p-6 mb-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Yeni Ürün Ekle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Ürün Adı"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Açıklama"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Fiyat"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stok"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="categoryId"
          placeholder="Kategori ID"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            İptal
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;
