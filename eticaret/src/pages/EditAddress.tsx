import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, MapPin } from 'lucide-react';


interface Address {
  id: number;
  userId?: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

interface ApiResponse {
  data: Address;
  statusCode: number;
  isSuccessful: boolean;
  error: string | null;
  message: string;
}

interface EditAddressProps {
  addressId?:number;
  userId?:number;
  onBack?: () => void;
  onSave?: (address: Address) => void;
}

const EditAddress: React.FC<EditAddressProps> = ({ 
  addressId = 2,
  userId = 10, 
  onBack,
  onSave 
}) => {
  const [address, setAddress] = useState<Address>({
    id: 0,
    userId: userId,
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: '',
    isDefault: false
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const API_BASE_URL = "http://192.168.25.123:5102/api";

  // Adresi getir
  const fetchAddress = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/Addresses/getById/${addressId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}` // Gerekirse token ekleyin
        }
      });

      if (!response.ok) {
        throw new Error('Adres getirilemedi');
      }

      const result: ApiResponse = await response.json();
      
      if (result.isSuccessful && result.data) {
        setAddress(result.data);
      } else {
        setError(result.error || 'Adres getirilemedi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Adresi güncelle
  const updateAddress = async (): Promise<void> => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_BASE_URL}/Addresses/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}` // Gerekirse token ekleyin
        },
        body: JSON.stringify({
          id: address.id,
          userId: address.userId,
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          postalCode: address.postalCode,
          country: address.country
        })
      });

      if (!response.ok) {
        throw new Error('Adres güncellenemedi');
      }

      const result = await response.json();
      
      if (result.isSuccessful) {
        setSuccess(result.message || 'Adres başarıyla güncellendi!');
        if (onSave) {
          onSave(address);
        }
      } else {
        setError(result.error || 'Güncelleme başarısız');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  // Component mount olduğunda adresi getir
  useEffect(() => {
    fetchAddress();
  }, [addressId]);

  // Input değişikliklerini handle et
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form submit
  const handleSubmit = (): void => {
    // Basit validasyon
    if (!address.addressLine1.trim() || !address.city.trim() || !address.country.trim()) {
      setError('Lütfen zorunlu alanları doldurun');
      return;
    }

    updateAddress();
  };

  // Geri dön
  const handleBack = (): void => {
    if (onBack) {
      onBack();
    } else {
      // Varsayılan geri dönme işlemi
      window.history.back();
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-gray-600">Adres yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Geri Dön
        </button>
        <div className="flex items-center">
          <MapPin className="text-orange-500 mr-2" size={24} />
          <h1 className="text-2xl font-bold text-gray-800">Adres Düzenle</h1>
        </div>
      </div>

      {/* Mesajlar */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          {success}
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Adres Satırı 1 */}
          <div className="md:col-span-2">
            <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-2">
              Adres Satırı 1 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Ana adres bilgisi"
              required
            />
          </div>

          {/* Adres Satırı 2 */}
          <div className="md:col-span-2">
            <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-2">
              Adres Satırı 2
            </label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Ek adres bilgisi (isteğe bağlı)"
            />
          </div>

          {/* Şehir */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              Şehir <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Şehir adı"
              required
            />
          </div>

          {/* Posta Kodu */}
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
              Posta Kodu
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={address.postalCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Posta kodu"
            />
          </div>

          {/* Ülke */}
          <div className="md:col-span-2">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
              Ülke <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={address.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Ülke adı"
              required
            />
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={saving}
            className={`flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors ${
              saving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Kaydediliyor...
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Adresi Güncelle
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            İptal
          </button>
        </div>
      </div>

      {/* Adres Bilgi Kartı */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Güncel Adres Önizleme:</h3>
        <div className="text-sm text-gray-600">
          <p>{address.addressLine1}</p>
          {address.addressLine2 && <p>{address.addressLine2}</p>}
          <p>{address.city} {address.postalCode}</p>
          <p>{address.country}</p>
        </div>
      </div>
    </div>
  );
};

export default EditAddress;

