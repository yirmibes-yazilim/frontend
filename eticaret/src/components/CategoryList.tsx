async function getAllCategories() {
  try {
    const response = await fetch('http://192.168.25.136:5102/api/Categories/getAll');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const categories = await response.json();
    console.log('Kategoriler:', categories);
    return categories;
  } catch (error) {
    console.error('Kategoriler alınırken hata oluştu:', error);
    return [];
  }
}

// Kullanımı
getAllCategories().then(categories => {
  // Kategorileri kullan
});