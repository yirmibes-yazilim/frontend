import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";     //yönlendirme yapar
import axiosInstance from"../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");              //Form verilerini ve olası hata mesajlarını tutan state’ler
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");                                   //önceki hatayı temizler


    try {
    const response = await axiosInstance.post("/Auth/login", {
        email,
        password,
    });

    const result = response.data;

    if (result.isSuccessful) {
      // Backend'den gelen accessToken ve refreshToken isimlerine dikkat et!
      const accessToken = result.data.accessToken;
      const refreshToken = result.data.refreshToken;
      login(accessToken); // Context ve localStorage ile uyumlu
      Cookies.set("accessToken", result.data.accessToken.accessToken);   // Cookie'ye ekle
      Cookies.set("refreshToken", result.data.refreshToken.refreshToken); // Cookie'ye ekle
      alert("Giriş başarılı!");
      navigate("/");
      } else {
        setError(result.message || "Giriş başarısız!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Sunucuyla bağlantı kurulamadı.");
    } finally {
      setLoading(false); //loading durumunu sıfırlar, buton tekrar aktif hale gelir
    }
   
};

    const token = Cookies.get("token");
    fetch("http://localhost:5173/api/addresses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
        <h2 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center font-medium">
            {error}
          </div>
        )}

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
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
        >
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>

        <p className="text-sm mt-4 text-center">
          Hesabın yok mu?{" "}
          <span
            className="text-blue-700 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Kayıt Ol
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
