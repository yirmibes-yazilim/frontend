import { SlBasket } from "react-icons/sl";
import React from "react";

interface CartIconProps {
  onClick?: () => void;
  className?: string;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick, className }) => {
  return (
    <div 
      className={`relative ${className}`} 
      onClick={onClick}
    >
      <SlBasket className="text-2xl"/>
      <span className="bg-red-600 text-white w-5 h-5 flex justify-center items-center rounded-full absolute -top-3 -right-5 text-xs"></span>
    </div>
  );
};

export default CartIcon;