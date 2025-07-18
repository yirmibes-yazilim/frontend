import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import CartIcon from "./CartIcon";
import Logo from "./Logo";
import SearchBar from "./SearchBar";


const Header = () => {
    const navigate = useNavigate();

    return(
        <div className="flex justify-between items-center my-6 mx-10">
            <div className="w-1/3">
                <Logo/>
            </div>
            <div className="w-1/2 items-center">
                <SearchBar/>
            </div>
            
            <div className="w-1/6 flex justify-around items-center my-6 mx-1">
                <VscAccount 
                onClick={() => navigate("/login")}
                className="cursor-pointer text-2xl"
                />

                <FaRegHeart 
                onClick={() => navigate("/favorites")}
                className="cursor-pointer text-2xl"
                />
        
                <CartIcon />
            </div>
            
        </div>
    )
}

export default Header