import React, { useState } from 'react';

interface AddressForm {
  userId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
}

const AddAddress: React.FC = () => {
  const [form, setForm] = useState<AddressForm>({
    userId: 8,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://192.168.25.136:5102/api/Addresses/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (data.isSuccessful) {
        alert("Adres başarıyla eklendi.");
      }
    } catch (err) {
      console.error("Adres eklenemedi:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md">
      {["addressLine1", "addressLine2", "city", "postalCode", "country"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          value={form[field as keyof AddressForm]}
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

