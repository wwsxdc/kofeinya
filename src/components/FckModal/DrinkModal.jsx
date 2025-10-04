import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "./DrinkModal.css";

const DrinkModal = ({
  isOpen,
  onClose,
  drinkName = "",
  imageName = "default-drink.png",
  drinkPrice = 0,
  drinkVolume = "",
  drinkDescription = "",
  id,
}) => {
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [drinkQuantity, setDrinkQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const sizePrices = {
    medium: { price: drinkPrice, volume: drinkVolume },
    large: { price: drinkPrice * 1.2, volume: drinkVolume * 1.2 },
  };

  const addons = [
    { id: 1, name: "Карамельный сироп", price: 20 },
    { id: 2, name: "Банановый сироп", price: 20 },
    { id: 3, name: "Кокосовый сироп", price: 20 },
  ];

  const handleAddToCart = () => {
    const item = {
      id: `${id}-${selectedSize}`,
      drinkId: id,
      name: drinkName,
      image: imageName,
      size: selectedSize,
      volume: sizePrices[selectedSize].volume,
      price: sizePrices[selectedSize].price,
      quantity: drinkQuantity,
      addons: selectedAddons,
      totalPrice: totalPrice,
    };
    addToCart(item);
    onClose();
  };
  const handleAddonSelect = (addon) => {
    const existingAddon = selectedAddons.find((a) => a.id === addon.id);

    if (existingAddon) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, { ...addon, quantity: 1 }]);
    }
  };

  const changeAddonQuantity = (addonId, value) => {
    setSelectedAddons((prevAddons) => {
      return prevAddons
        .map((addon) => {
          if (addon.id === addonId) {
            const newQuantity = addon.quantity + value;

            if (newQuantity <= 0) {
              return null;
            }

            return {
              ...addon,
              quantity: Math.min(newQuantity, drinkQuantity),
            };
          }
          return addon;
        })
        .filter(Boolean);
    });
  };

  const getAddonQuantity = (addonId) => {
    const addon = selectedAddons.find((a) => a.id === addonId);
    return addon ? addon.quantity : 0;
  };

  const totalPrice =
    sizePrices[selectedSize].price * drinkQuantity +
    selectedAddons.reduce(
      (sum, addon) => sum + addon.price * addon.quantity,
      0
    );

  return (
    <div className="mdl">
      <div className="mdl__content">
        <div className="mldrnk_header">
          <div className="mdldrnk__description">
            <div className="div_img">
              <img src={imageName} alt={drinkName} className="mdldrnk__img" />
            </div>
            <div className="mdldrnk__text-content">
              <p className="mdldrnk__name">{drinkName}</p>
              <p className="mdldrnk__desc-text">{drinkDescription}</p>
            </div>
          </div>

          <div className="size-selector">
            <button
              className={`size-btn ${
                selectedSize === "medium" ? "active" : ""
              }`}
              onClick={() => setSelectedSize("medium")}
            >
              Средний ({sizePrices.medium.volume} мл) -{" "}
              {sizePrices.medium.price} руб
            </button>
            <button
              className={`size-btn ${selectedSize === "large" ? "active" : ""}`}
              onClick={() => setSelectedSize("large")}
            >
              Большой ({sizePrices.large.volume} мл) - {sizePrices.large.price}{" "}
              руб
            </button>
          </div>

          <div className="drink-quantity">
            <span className="colvo">Количество:</span>
            <div className="quantity-controls">
              <button
                onClick={() => {
                  const newQuantity = Math.max(1, drinkQuantity - 1);
                  setDrinkQuantity(newQuantity);

                  setSelectedAddons(
                    selectedAddons.map((addon) => ({
                      ...addon,
                      quantity: Math.min(newQuantity, addon.quantity),
                    }))
                  );
                }}
              >
                -
              </button>
              <span>{drinkQuantity}</span>
              <button onClick={() => setDrinkQuantity(drinkQuantity + 1)}>
                +
              </button>
            </div>
          </div>
        </div>

        <div className="addons-section">
          <h4>Добавки</h4>
          {addons.map((addon) => {
            const isSelected = selectedAddons.some((a) => a.id === addon.id);
            const quantity = getAddonQuantity(addon.id);

            return (
              <div
                key={addon.id}
                className={`addon-item ${isSelected ? "selected" : ""}`}
              >
                <div className="addon-info">
                  <span>{addon.name}</span>
                </div>

                {isSelected ? (
                  <div className="addon-quantity-controls">
                    <button onClick={() => changeAddonQuantity(addon.id, -1)}>
                      -
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => changeAddonQuantity(addon.id, 1)}>
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="select-addon-btn"
                    onClick={() => handleAddonSelect(addon)}
                  >
                    +{addon.price}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="total-price">Итого: {totalPrice} руб</div>

        <button className="modal__submit" onClick={handleAddToCart}>
          Добавить в корзину
        </button>
        <button className="close_btn" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default DrinkModal;
