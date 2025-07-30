import { useNavigate } from "react-router-dom"; 

const AdminNav =() => {
    const navigate = useNavigate();

    return(
        <div >
            <div className="w-64 h-screen bg-gray-800 text-white p-4">
                    <h2 className="text-2xl font-bold mb-6 p-7 border-2 border-white">Kullanıcı adı</h2>
                    <ul className="space-y-4">
                        <li className="hover:text-gray-300 cursor-pointer">Dashboard</li>
                        <li onClick={() => navigate("adminproducts")}
                        className="hover:text-gray-300 cursor-pointer">Ürünler</li>
                        <li onClick={() => navigate("admincategories")}
                        className="hover:text-gray-300 cursor-pointer">Kategoriler</li>
                        <li className="hover:text-gray-300 cursor-pointer">Siparişler</li>
                        <li className="hover:text-gray-300 cursor-pointer">Kullanıcılar</li>
                        <li className="hover:text-gray-300 cursor-pointer">Çıkış</li>
                    </ul>
                </div>
        </div>
    )
}

export default AdminNav