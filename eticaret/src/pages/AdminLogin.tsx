import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../api/axiosInstance";



const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    

    

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await instance.post("/Admin/login", { email, password });
            if (response.data.isSuccessful) {
                // Yeni AuthContext'e uygun şekilde login fonksiyonunu çağır
                //const { accessToken, refreshToken, accessTokenExpTime, refreshTokenExpTime } = response.data.data;
                //login({ accessToken, refreshToken, accessTokenExpTime, refreshTokenExpTime });
                navigate("/admin/home"); // Başarılı giriş sonrası yönlendirme
            } else {
                setError(response.data.message || "Giriş başarısız");
            }
        } catch (error) {
            console.error("Login hatası:", error);
            setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm relative"
            >
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                    aria-label="Kapat"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Giriş Ekranı</h2>

                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm mb-1 font-medium">
                        E-posta
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm mb-1 font-medium">
                        Şifre
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition"
                >
                    {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;