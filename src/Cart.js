import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Web Tasarım Paketi',
      price: 1500,
      category: 'Hizmet'
    },
    {
      id: 2,
      name: 'Laptop Tamiri',
      price: 800,
      category: 'Teknik'
    }
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: 'Kategori Seçin'
  });

  const categories = ['Hizmet', 'Teknik', 'Yazılım', 'Donanım', 'Danışmanlık'];

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const addItem = () => {
    if (newItem.name && newItem.price && newItem.category !== 'Kategori Seçin') {
      const item = {
        id: Date.now(),
        name: newItem.name,
        price: parseInt(newItem.price),
        category: newItem.category
      };
      setCartItems([...cartItems, item]);
      setNewItem({ name: '', price: '', category: 'Kategori Seçin' });
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-500 text-white p-4">
          <div className="grid grid-cols-4 gap-4 font-semibold">
            <div>Ürün Adı</div>
            <div>Fiyat (₺)</div>
            <div>Kategori</div>
            <div>İşlem</div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="text-gray-700">{item.price}</div>
                <div className="text-gray-700">{item.category}</div>
                <div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Item Form */}
        <div className="bg-gray-50 p-4 border-t">
          <div className="grid grid-cols-4 gap-4 items-center">
            <input
              type="text"
              placeholder="Ürün Adı"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Fiyat (₺)"
              value={newItem.price}
              onChange={(e) => setNewItem({...newItem, price: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="Kategori Seçin">Kategori Seçin</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button
              onClick={addItem}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center"
            >
              <Plus size={16} />
              Ekle
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="bg-green-500 text-white p-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Toplam Tutar:</div>
            <div className="text-xl font-bold">{totalPrice} ₺</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4 justify-end">
        <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Alışverişe Devam Et
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Sepeti Onayla
        </button>
      </div>
    </div>
  );
};

export default Cart;