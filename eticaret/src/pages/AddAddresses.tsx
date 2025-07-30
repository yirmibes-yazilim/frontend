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

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md">
      {["addressLine1", "addressLine2", "city", "postalCode", "country"].map(field => (
        <input
          key={field}
          type="text"
          name={field}
          value={field}
          onChange={handleChange}
          placeholder={field}
          className="block w-full mb-2 border p-2 rounded"
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Kaydet</button>
    </form>
  );
};

export default AddAddress;