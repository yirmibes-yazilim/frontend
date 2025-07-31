export const getAddressesByUserId = async (userId: number) => {
  try {
    const token = localStorage.getItem("token"); // Girişte saklanan token

    const response = await fetch(`http://192.168.25.123:5102/api/Addresses/getAllByUserId/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Yetkisiz veya başarısız istek");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Adresler alınamadı:", error);
    throw error;
  }
};


