import { useEffect, useState } from "react";
import instance from "../api/axiosInstance";

interface Category {
  id: number;
  name: string;
  description: string;
}

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  
  const fetchCategories = async () => {
    try {
      const res = await instance.get("/Categories/getAll");
      setCategories(res.data.data);
    } catch (err) {
      console.error("Kategoriler alınamadı", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const handleAddCategory = async () => {
    try {
      await instance.post("/Categories/create", newCategory);
      setNewCategory({ name: "", description: "" });
      setShowAddForm(false);
      fetchCategories();
    } catch (err) {
      console.error("Kategori ekleme hatası", err);
    }
  };

    const handleUpdateCategory = async () => {
    try {
      await instance.put("/Categories/update", {
        id: editingCategory?.id,
        name: editingCategory?.name,
        description: editingCategory?.description,
      });
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      console.error("Kategori güncelleme hatası", err);
    }
  };

   const handleDeleteCategory = async () => {
    try {
      if (categoryToDelete) {
        await instance.delete(`/Categories/delete/${categoryToDelete.id}`);
        setCategoryToDelete(null);
        fetchCategories();
      }
    } catch (err) {
      console.error("Kategori silme hatası", err);
    }
  };
  
   return (
    <div className="p-4">
      {/* Ekleme Butonu */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-white border text-black hover:bg-gray-200 text-sm px-4 py-2 rounded-md"
        >
          + Kategori ekle
        </button>
      </div>

      {/* Yeni Kategori Ekleme Formu */}
      {showAddForm && (
        <div className="mb-4 bg-gray-100 p-4 rounded-lg">
          <input
            type="text"
            placeholder="Kategori Adı"
            className="border p-2 mr-2"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Açıklama"
            className="border p-2 mr-2"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          />
          <button
            onClick={handleAddCategory}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Kaydet
          </button>
          <button
            onClick={() => setShowAddForm(false)}
            className="ml-2 text-gray-500 hover:text-black"
          >
            Vazgeç
          </button>
        </div>
      )}

      {/* Kategori Güncelleme Formu */}
      {editingCategory && (
        <div className="mb-4 bg-blue-50 p-4 rounded-lg">
          <input
            type="text"
            className="border p-2 mr-2"
            value={editingCategory.name}
            onChange={(e) =>
              setEditingCategory({ ...editingCategory, name: e.target.value })
            }
          />
          <input
            type="text"
            className="border p-2 mr-2"
            value={editingCategory.description}
            onChange={(e) =>
              setEditingCategory({ ...editingCategory, description: e.target.value })
            }
          />
          <button
            onClick={handleUpdateCategory}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Güncelle
          </button>
          <button
            onClick={() => setEditingCategory(null)}
            className="ml-2 text-gray-500 hover:text-black"
          >
            Vazgeç
          </button>
        </div>
      )}

      {/* Kategori Silme Onayı */}
      {categoryToDelete && (
        <div className="mb-4 bg-red-50 p-4 rounded-lg border border-red-300">
          <p className="text-red-600 mb-2">
            “{categoryToDelete.name}” adlı kategoriyi silmek istediğinize emin misiniz?
          </p>
          <button
            onClick={handleDeleteCategory}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Evet, sil
          </button>
          <button
            onClick={() => setCategoryToDelete(null)}
            className="ml-2 text-gray-500 hover:text-black"
          >
            İptal
          </button>
        </div>
      )}

      {/* Kategori Listesi */}
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white border p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingCategory(category)}
                className="text-blue-500 hover:underline"
              >
                Düzenle
              </button>
              <button
                onClick={() => setCategoryToDelete(category)}
                className="text-red-500 hover:underline"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
