
const ProductItem = () => {
    return(
        <div className="boder p-4 m-2 rounded-lg shadow-lg">
            <img className="w-full h-40 object-cover rounded-t-lg" src="https://via.placeholder.com/250" alt="product image" />
            <div className="p-4">
                <h2 className="text-m font-semibold">Ürün 1</h2>
                <p className="text-gray-500 my-2">100 TL</p>
                <button className="bg-white border-blue-300 border-3 text-grey px-4 py-2 rounded-xl hover:bg-blue-400 w-full">
                    Sepete Ekle
                </button>

            </div>
        </div>
    )
}

export default ProductItem