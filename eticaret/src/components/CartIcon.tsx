import React from "react";
import { SlBasket } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

interface CartIconProps {
  onClick?: () => void;
  className?: string;
  itemCount?: number; // opsiyonel: sepet sayısı göstermek istersen
}

const CartIcon: React.FC<CartIconProps> = ({ onClick, className = "text-2xl", itemCount }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/sale");
    }
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <SlBasket className={className} />
      {itemCount !== undefined && itemCount > 0 && (
        <span className="bg-red-600 text-white w-5 h-5 flex justify-center items-center rounded-full absolute -top-3 -right-5 text-xs">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
