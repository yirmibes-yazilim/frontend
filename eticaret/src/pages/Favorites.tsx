import { useNavigate } from "react-router-dom";
import ProductItem from "../components/ProductItem";

const Favorites = () => {
    const navigate = useNavigate();



    return(
        <div className="flex justify-center items-center min-h-screen  bg-gray-100 px-4">
            <form 
                className="bg-white p-10 rounded-2xl shadow-md w-full max-w-screen relative"
            >
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                    aria-label="Kapat"
                >
                     &times;
                </button>
                <div className="text-2xl font-bold mb-6 text-center">Favorilerim</div>

                <div className="grid grid-cols-3 gap-10 mb-8 mx-8">
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                </div>

            </form>

        </div>
    )
}

export default Favorites