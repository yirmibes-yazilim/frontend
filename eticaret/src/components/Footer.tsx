import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import logo from "../images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#263B5E] text-white px-6 py-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* İletişim Bölümü */}
        <div>
          <h3 className="text-lg font-bold mb-4">İletişim</h3>
          <p className="mb-2">Adres:</p>
          <p className="text-gray-300 text-sm mb-2">
            Zafer Mah. 152. Cad No:39 ADÜ Teknokent Efeler/Aydın<br />
            Şube: Yedieylül Mah. 1013 Sk. No:3 D:2 Efeler/Aydın
          </p>

          <p className="mt-4 mb-2">Email:</p>
          <p className="text-gray-300 text-sm mb-2">destek@yirmibes.com.tr</p>

          <p className="mt-4 mb-2">Telefon & Fax:</p>
          <p className="text-gray-300 text-sm mb-4">+90 256 224 00 25</p>

          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com/yirmibesyzlm"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-[#2f3e59] hover:bg-[#FFB400] rounded-full transition-colors duration-300"
            >
              <FaFacebookF className="text-white" />
            </a>
            <a
              href="https://www.linkedin.com/company/yirmibesyazilim/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-[#2f3e59] hover:bg-[#FFB400] rounded-full transition-colors duration-300"
            >
              <FaLinkedinIn className="text-white" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col items-center">
        <img src={logo} alt="Yirmibeş Logo" className="h-12 mb-2" />
        <p className="text-sm text-gray-300">
          © Yirmibeş Yazılım ve Danışmanlık - 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;