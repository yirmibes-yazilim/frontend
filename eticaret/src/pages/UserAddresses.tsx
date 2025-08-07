import  { useEffect, useState } from "react";
import { getAddresses } from "../services/AddressService";
import { useNavigate } from "react-router-dom"; // yönlendirme için
import { FaEdit } from "react-icons/fa"; // kalem simgesi için


const UserAddresses = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const navigate = useNavigate(); // yönlendirme hook'u

  useEffect(() => {
    const fetchAddresses = async () => {
      const result = await getAddresses(); // 10 yerine kullanıcı ID'sini dinamik ver
      if (result && typeof result === "object" && "isSuccessful" in result && (result as any).isSuccessful) {
        setAddresses((result as any).data);
      }
    };
    fetchAddresses();
  }, []);

 return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Adreslerim</h2>

      <div className="mb-4">
        <button
          onClick={() => navigate("/addressadd")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Yeni Adres Ekle
        </button>
      </div>

      {addresses.map((addr) => (
        <div key={addr.id} className="relative mb-4 border p-4 rounded">
          {/* Düzenle simgesi */}
          <button
            onClick={() => navigate('/addressedit/${addr.id}')}
            className="absolute top-2 right-2 text-blue-600 hover:text-blue-800"
            title="Düzenle"
          >
            <FaEdit size={18} />
          </button>

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

