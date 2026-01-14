import { useState } from 'react';
import instance from "../api/axiosInstance";

const AddAddress = () => {
  const [form, setForm] = useState({
    userId: 10, // giriş yapan kullanıcı ID'si
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: ''
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await instance.post("/Addresses/create", form);
      if (res.data.isSuccessful) {
        alert("Adres başarıyla eklendi.");
      } else {
        alert("Adres eklenemedi. Sunucu yanıtı başarısız.");
      }
    } catch (err) {
      console.error("Adres eklenemedi:", err);
      alert("Adres eklenirken bir hata oluştu.");
    }
  };
  const fields = [
    { name: "addressLine1", placeholder: "Address Line 1" },
    { name: "addressLine2", placeholder: "Address Line 2" },
    { name: "city", placeholder: "City" },
    { name: "postalCode", placeholder: "Postal Code" },
    { name: "country", placeholder: "Country" },
  ];

  // 🔽 return içinde inputları oluştur
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Yeni Adres Ekle
        </h2>

        {fields.map(({ name, placeholder }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
              {placeholder}
            </label>
            <input
              id={name}
              type="text"
              name={name}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default AddAddress;