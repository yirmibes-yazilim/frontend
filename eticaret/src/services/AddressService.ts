// src/services/AddressService.ts

export const getAddressesByUserId = async (userId: number) => {
  try {
    const response = await fetch(`http://192.168.25.122:5102/api/Addresses/getAllByUserId/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Adresler alınamadı:", error);
    throw error;
  }
};

