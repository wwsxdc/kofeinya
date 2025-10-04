import React from "react";
import { useCart } from "../context/CartContext";
import "./ModalBasket.css";

const ModalBasket = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal">
        <h2>Ваша корзина</h2>
        <button onClick={onClose}>×</button>

        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Корзина пуста</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <div>
                      {item.price} руб × {item.quantity} = {item.totalPrice} руб
                    </div>
                    {item.size && <div>Размер: {item.size}</div>}
                    {item.addons?.length > 0 && (
                      <div>
                        Добавки: {item.addons.map((a) => a.name).join(", ")}
                      </div>
                    )}
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
            <div className="total-price">Итого: {totalPrice} руб</div>
            <div className="bybtn" onClick={() => }></div>
          </>
        )}
      </div>
    </>
  );
};

export default ModalBasket;
