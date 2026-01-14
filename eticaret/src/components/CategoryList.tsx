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

interface Category {
  id: number;
  name: string;
}

getAllCategories().then((categories: Category[]) => {
  if (categories.length === 0) {
    console.log("Kategori yok.");
  } else {
    categories.forEach((cat: Category) => console.log(cat.name));
  }
});
