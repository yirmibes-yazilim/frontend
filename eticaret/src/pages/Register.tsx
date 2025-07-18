import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://192.168.25.122:5102/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          firstName,
          lastName,
          password,
        }),
      });

      const result = await response.json();

      if (result.isSuccessful) {
        alert(result.message || "Kayıt başarılı!");
        navigate("/login");
      } else {
        alert(result.message || "Kayıt başarısız");
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
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

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Ad"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Soyad"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="border p-2 rounded-md"
          />
        </div>

        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full mb-4 border p-2 rounded-md"
        />

        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 border p-2 rounded-md"
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

