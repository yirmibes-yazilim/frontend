import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Logo =() => {
    return(
        <div >
            <Link to="/"> 
            <img src={logo} alt="Yirmibeş Yazılım & Danışmanlık" className="w-40 h-auto cursor-pointer" />
            </Link>
        
        </div>
    )
}

export default Logo