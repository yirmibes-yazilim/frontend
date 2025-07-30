import { useNavigate } from "react-router-dom";


const AdminHome = () => {
    const navigate = useNavigate();

    return (
        
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-screen min-h-screen relative">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                    aria-label="Kapat"
                >
                    &times;
                </button>
                
            </div>
        
    );
}

export default AdminHome;