import  { useEffect, useState } from "react";
import { getAddressesByUserId } from "../services/AddressService";

const UserAddresses = () => {
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const result = await getAddressesByUserId(10); // 10 yerine kullanıcı ID'sini dinamik ver
      if (result.isSuccessful) {
        setAddresses(result.data);
      }
    };
    fetchAddresses();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Adreslerim</h2>
      {addresses.map((addr) => (
        <div key={addr.id} className="mb-4 border p-3 rounded">
          <p><strong>Adres:</strong> {addr.addressLine1}, {addr.addressLine2}</p>
          <p><strong>Şehir:</strong> {addr.city}</p>
          <p><strong>Posta Kodu:</strong> {addr.postalCode}</p>
          <p><strong>Ülke:</strong> {addr.country}</p>
          <p><strong>Varsayılan mı:</strong> {addr.isDefault ? "Evet" : "Hayır"}</p>
        </div>
      ))}
    </div>
  );
};

export default UserAddresses;