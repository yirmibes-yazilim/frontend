import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sendConfirmationEmail } from "../services/authService";

const EmailConfirmationSend = () => {
  const { userId } = useParams(); // URL'den userId'yi al
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const sendEmail = async () => {
      try {
        const response = await sendConfirmationEmail(Number(userId));

        // Type assertion for response
        const typedResponse = response as { isSuccessful: boolean; message?: string };

        if (typedResponse.isSuccessful) {
          setMessage("Doğrulama kodu e-posta adresinize gönderildi.");
        } else {
          setError(typedResponse.message || "Kod gönderilemedi.");
        }
      } catch (err) {
        console.error("E-posta gönderme hatası:", err);
        setError("Sunucuya ulaşılamadı. Lütfen daha sonra tekrar deneyin.");
      }
    };

    if (userId) {
      sendEmail();
    } else {
      setError("Geçersiz kullanıcı.");
    }
  }, [userId]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4">E-Posta Doğrulama</h2>

        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => navigate(`/verify-email?userId=${userId}`)}
        >
          Doğrulama Kodunu Gir
        </button>
      </div>
    </div>
  );
};

export default EmailConfirmationSend;