import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import ModalBasket from "./ModalBasket";
import "./BasketButton.css";

const BasketButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      <div className="dbbutton">
        <button className="bbutton" onClick={() => setIsModalOpen(true)}>
          Перейти в корзину {itemCount > 0 && <span>({itemCount})</span>}
        </button>
        <ModalBasket
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};

export default BasketButton;
