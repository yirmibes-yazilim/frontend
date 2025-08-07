
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { useState, useEffect, useRef } from "react";
import CartIcon from "./CartIcon";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const Header = () => {
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  


 useEffect(() => {
  const token = localStorage.getItem("token");
  const isLoggedIn = token !== null && token !== "undefined"; // Hem null hem de "undefined" string'ini kontrol edin
  console.log("Token değeri:", token); // Debug için

  setIsLoggedIn(isLoggedIn);
}, []);

  // Menü dışına tıklanırsa dropdown kapanır
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAccountClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setShowUserDropdown((prev) => !prev);
    }
  };

  return (
    <div className="flex justify-between items-center my-6 mx-10 relative">
      <div className="w-1/3">
        <Logo />
      </div>
      <div className="w-1/2 items-center">
        <SearchBar />
      </div>

      <div className="w-1/6 flex justify-around items-center relative">
        <div ref={dropdownRef} className="relative">
          <VscAccount
            onClick={handleAccountClick}
            className="cursor-pointer text-2xl"
          />

          {isLoggedIn && showUserDropdown && (
            <div className="absolute right-0 bg-white shadow-lg rounded-lg mt-2 w-48 z-50">
              <ul className="py-2">
                <li
<<<<<<< HEAD
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Login
=======
                  onClick={() => navigate("/profile")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Profil
>>>>>>> ayca
                </li>
                <li
                  onClick={() => navigate("/cartpage")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Siparişlerim
                </li>
                <li
                  onClick={() => navigate("/addresses")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Adreslerim
                </li>
              </ul>
            </div>
          )}
        </div>

        <FaRegHeart
          onClick={() => navigate("/favorites")}
          className="cursor-pointer text-2xl"
        />

        <CartIcon
          onClick={() => navigate("/cartpage")}
          className="cursor-pointer text-2xl"
        />
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Header;
=======
export default Header;

        
>>>>>>> ayca
