// src/services/AddressService.ts
import axiosInstance from "../api/axiosInstance";

export const getAddressesByUserId = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/Addresses/getAllByUserId/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Adresler alınamadı:", error);
    throw error;
  }
};