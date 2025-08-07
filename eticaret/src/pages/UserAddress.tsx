import { useEffect, useState } from "react";
import { getAddresses } from "../services/AddressService";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";

interface Address {
  id: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

const UserAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const navigate = useNavigate();

  // 🔄 Adresleri API'den çeken fonksiyon
  const fetchAddresses = async () => {
    try {
      const result = await getAddresses();
      console.log("Adresler yeniden çekildi:", result);
      if (result.isSuccessful) {
        setAddresses(result.data);
      }
    } catch (error) {
      console.error("Adresler çekilemedi:", error);
    }
  };

  // 🗑️ Adres silme fonksiyonu
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Bu adresi silmek istediğinize emin misiniz?");
    if (!confirmed) return;

    console.log("Silme başlatıldı. ID:", id);

    try {
      const res = await axiosInstance.delete(`/Addresses/delete/${id}`);
      console.log("Silme tamamlandı:", res.status);

      // 🔁 Listeyi güncelle
      await fetchAddresses();
      console.log("Adresler yeniden çekildi");
    } catch (error) {
      let errMsg = "Bilinmeyen bir hata oluştu";
      if (
        typeof error === "object" &&
        error &&
        "response" in error &&
        (error as { response?: { data?: unknown } }).response?.data
      ) {
        const data = (error as { response?: { data?: unknown } }).response?.data;
        errMsg = typeof data === "object" ? JSON.stringify(data) : String(data);
      } else if (error instanceof Error) {
        errMsg = error.message;
      }
      console.error("Silme hatası:", errMsg);
    }
  };

  // ⏬ Sayfa ilk yüklendiğinde adresleri getir
  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Adreslerim</h2>

      {/* ➕ Yeni adres ekleme butonu */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/addressadd")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition"
        >
          Yeni Adres Ekle
        </button>
      </div>

      {/* 📦 Adres listesi */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="relative border border-gray-200 p-5 rounded-lg bg-white shadow-sm hover:shadow-md transition"
          >
            {/* 🖉 Düzenle simgesi */}
            <button
              onClick={() => navigate(`/addressedit/${addr.id}`)}
              className="absolute top-3 right-12 text-green-600 hover:text-green-800"
              title="Düzenle"
            >
              <FaEdit size={18} />
            </button>

            {/* 🗑️ Sil simgesi */}
            <button
              onClick={() => handleDelete(addr.id)}
              className="absolute top-3 right-3 text-red-600 hover:text-red-800"
              title="Sil"
            >
              <FaTrash size={18} />
            </button>

            {/* 📄 Adres Bilgileri */}
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-medium text-gray-900">Adres:</span>{" "}
                {addr.addressLine1}
                {addr.addressLine2 && `, ${addr.addressLine2}`}
              </p>
              <p>
                <span className="font-medium text-gray-900">Şehir:</span> {addr.city}
              </p>
              <p>
                <span className="font-medium text-gray-900">Posta Kodu:</span> {addr.postalCode}
              </p>
              <p>
                <span className="font-medium text-gray-900">Ülke:</span> {addr.country}
              </p>
              <p>
                <span className="font-medium text-gray-900">Varsayılan mı:</span>{" "}
                {addr.isDefault ? (
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                    Evet
                  </span>
                ) : (
                  "Hayır"
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAddresses;
