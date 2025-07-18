import { useState } from "react";
import { useNavigate } from "react-router-dom";     //yönlendirme yapar

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {     //form gönderildiğinde çalışır (React'e, bu e parametresinin bir "form olayı" olduğunu söyler.)
    e.preventDefault();                             // Tarayıcının formu otomatik göndermesini (ve sayfayı yenilemesini) durdurur
    setLoading(true);

    try {       //hata oluşursa programın çökmesini önler
      const response = await fetch("http://192.168.25.122:5102/api/Auth/login", {      //fetch: Tarayıcıda HTTP isteği atmamızı sağlar, await: istek tamamlanana kadar bekler
        method: "POST",     //API'ye veri gönderiyoruz
        headers: {          // Gönderdiğimiz verinin türünü
          "Content-Type": "application/json",
        },
        body: JSON.stringify({      //gönderilen veriler JSON.stringify ile strine çevrilir
          email,
          password,
        }),
      });

      const result = await response.json();     //gelen yanıtı JSON formatında alır

      if (result.isSuccessful) {
        alert(result.message);      //kullanıcıya “Giriş Başarılı” mesajı gösterilir

        navigate("/"); // Giriş başarılıysa anasayfaya yönlendir
      } else {
        alert(result.message || "Giriş başarısız");
      }
    } catch (error) {       // fetch sırasında bir hata oluşursa
      console.error("Login hatası:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);        //loading durumunu sıfırlar, buton tekrar aktif hale gelir
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
        <h2 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>

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
          disabled={loading}            //buton tıklanamaz hale gelir,aynı anda birden fazla istek atılması engellenir
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
