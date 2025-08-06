// src/services/AddressService.ts
import axiosInstance from "../api/axiosInstance";

export const getAddresses = async () => {
  try {
    const response = await axiosInstance.get(`/Addresses/getAllByUser`);
    return response.data;
  } catch (error) {
    console.error("Adresler alınamadı:", error);
    throw error;
  }
};