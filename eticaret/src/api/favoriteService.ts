import axiosInstance from "../api/axiosInstance";

// Favori ürünleri getir
export const getFavorites = async () => {
  return axiosInstance.get("/FavoriteProducts/list");
};

// Favori ürün ekle
export const addFavorite = async (productId: number) => {
  return axiosInstance.post("/FavoriteProducts/addFavorite", {
    productId, // API'nın beklediği property adı doğruysa böyle bırak
  });
};

// Favori ürünü kaldır
export const removeFavorite = async (productId: number) => {
  // Backend, delete methodu ile ve body bekliyor!
  return axiosInstance.delete("/FavoriteProducts/removeFavorite", {
    data: { productId }, // Axios delete'te body'yi `data` ile gönderirsin!
  });
};
