import { SlBasket } from "react-icons/sl";

const CartIcon = () => {
    return(
        <div className="relative"> 
                <SlBasket className="test-2xl"/>
                <span className="bg-red-600 text-white w-5 h-5 flex justify-center items-center rounded-full absolute -top-3 -right-5 text-xs"></span>
            </div>
    )
}

export default CartIcon