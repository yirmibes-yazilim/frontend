import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axiosInstance";

const EmailVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get("userId");

  const [code, setCode] = useState("");
  const [result, setResult] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!userId || !code) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        `/Auth/verify-email-confirmtoken?userId=${userId}&confirmationToken=${code}`
      );

      if (response.data.isSuccessful) {
        setResult("Email başarıyla doğrulandı. Giriş sayfasına yönlendiriliyorsunuz...");
        setTimeout(() => navigate("/login"), 3000); // 3 saniye sonra yönlendirme
      } else {
        setResult(response.data.message || "Doğrulama başarısız.");
      }
    } catch (err) {
      console.error("Doğrulama hatası:", err);
      setResult("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">E-Posta Doğrulama</h2>
        <input
          type="text"
          placeholder="Doğrulama Kodu"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          disabled={loading}
        />
        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          {loading ? "Doğrulanıyor..." : "Doğrula"}
        </button>
        {result && <p className="mt-4 text-sm text-gray-700">{result}</p>}
      </div>
    </div>
  );
};

export default EmailVerify;