import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

  const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await registerUser(form);

      if (result.isSuccessful) {
      const userId = result.data?.id;     // backend bu bilgiyi dönmeli
      alert("Lütfen e-posta adresinize gelen kodu doğrulayın.");
      navigate(`/send-confirmation/${userId}`);
    } else {
      setError(result.message || "Kayıt başarısız.");
    }
    } catch (err) {
      setError("Sunucuyla bağlantı kurulamadı.");
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md relative"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="Kapat"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="Ad"
            value={form.firstName}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Soyad"
            value={form.lastName}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
          />
        </div>

        <input
          type="text"
          name="username"
          placeholder="Kullanıcı Adı"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full mb-4 border p-2 rounded-md"
        />

        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 border p-2 rounded-md"
        />

        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-6 border p-2 rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition"
        >
          {loading ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
        </button>

        <p className="text-sm mt-4 text-center">
          Zaten hesabın var mı?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Giriş Yap
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;

