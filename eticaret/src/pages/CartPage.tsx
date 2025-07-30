import { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import {useNavigate} from "react-router-dom";


const CartInterface = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Web Tasarım Paketi",
      price: 1500,
      quantity: 1,
      category: "Hizmet",
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Laptop Tamiri",
      price: 800,
      quantity: 1,
      category: "Teknik",
      image: "/api/placeholder/80/80"
    }
  ]);
  const navigate = useNavigate();
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Sayfa Başlığı */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Sepetim</h1>
      <p className="text-gray-600 mb-8">Sepetinizdeki ürünler aşağıda görüntülenmektedir.</p>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Sepetinizde ürün bulunmamaktadır.</p>
        </div>
      ) : (
        <>
          {/* Sepet Tablosu */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
            <table className="w-full">
              {/* Tablo Başlığı */}
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">ÜRÜN ADI</th>
                  <th className="px-6 py-4 text-center font-semibold">FİYAT (TL)</th>
                  <th className="px-6 py-4 text-center font-semibold">MİKTAR</th>
                  <th className="px-6 py-4 text-center font-semibold">KATEGORİ</th>
                  <th className="px-6 py-4 text-center font-semibold">TOPLAM</th>
                  <th className="px-6 py-4 text-center font-semibold">İŞLEM</th>
                </tr>
              </thead>

              {/* Tablo İçeriği */}
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}>
                    {/* Ürün Adı ve Görseli */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        </div>
                      </div>
                    </td>

                    {/* Fiyat */}
                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-gray-800">{item.price.toLocaleString('tr-TR')} TL</span>
                    </td>

                    {/* Miktar */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} className={item.quantity <= 1 ? 'text-gray-400' : 'text-gray-600'} />
                        </button>
                        <span className="w-12 text-center font-semibold bg-gray-100 py-1 px-2 rounded border">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </td>

                    {/* Kategori */}
                    <td className="px-6 py-4 text-center">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                    </td>

                    {/* Toplam */}
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-green-600 text-lg">
                        {(item.price * item.quantity).toLocaleString('tr-TR')} TL
                      </span>
                    </td>

                    {/* İşlem */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                        title="Sepetten Kaldır"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Toplam ve İşlemler */}
          <div className="mt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            {/* Sol Taraf - Alışverişe Devam */}
            <div>
                <button
                onClick={goToHomePage}
               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                ← Alışverişe Devam Et
              </button>
            </div>
            
            

            {/* Sağ Taraf - Toplam ve Ödeme */}
            <div className="bg-gray-50 p-6 rounded-lg border min-w-80">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Ara Toplam:</span>
                  <span className="font-semibold">{getTotalPrice().toLocaleString('tr-TR')} TL</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>KDV (%18):</span>
                  <span className="font-semibold">{Math.round(getTotalPrice() * 0.18).toLocaleString('tr-TR')} TL</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                  <span>Genel Toplam:</span>
                  <span className="text-green-600">{Math.round(getTotalPrice() * 1.18).toLocaleString('tr-TR')} TL</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Siparişi Tamamla 
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors">
                  Sepeti Güncelle
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartInterface;