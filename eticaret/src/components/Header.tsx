import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import {useState,useEffect} from "react";
import CartIcon from "./CartIcon";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const Header = () => {
    const navigate = useNavigate();
    const [showuserDropdown, setShowUserDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);    

    useEffect(() => {
        const LoggedInStatus= localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(LoggedInStatus);
        
    }, []);

    const handleAccountClick = () => {
        if (isLoggedIn){
            navigate("/Login");
        }
    }

    return(
        <div className="flex justify-between items-center my-6 mx-10">
            <div className="w-1/3">
                <Logo/>
            </div>
            <div className="w-1/2 items-center">
                <SearchBar/>
            </div>
            
            <div className="w-1/6 flex justify-around items-center my-6 mx-1">
                <div
                    className="relative"
                    onMouseEnter={() => setShowUserDropdown(true)}
                    onMouseLeave={() => setShowUserDropdown(false)}
                    ></div> 
                <VscAccount 
                onClick={() => navigate("/login")}
                className="cursor-pointer text-2xl"
                />
                {showuserDropdown && (
                    <div className="absolute right-0 bg-white shadow-lg rounded-lg mt-2 w-48">
                        <ul className="py-2">
                            <li
                                onClick={() => navigate("/profile")}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                Profil
                            </li>
                            <li
                                onClick={() => navigate("/orders")}
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
    )
}

export default Header
        
