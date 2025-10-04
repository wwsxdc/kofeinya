import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = ({ onCategoryChange, activeCategory = "popular" }) => {
  const [activeButton, setActiveButton] = useState(activeCategory);

  // Синхронизируем внутреннее состояние с внешним пропсом
  useEffect(() => {
    setActiveButton(activeCategory);
  }, [activeCategory]);

  const handleButtonClick = (category) => {
    setActiveButton(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <header>
      <div className="head">
        <img src="/images/header.png" alt="head" />
      </div>

      <div className="poisk">
        <input type="text" placeholder="Найти товары..." />
      </div>

      <div className="zaalupa">
        <button
          className={activeButton === "popular" ? "active" : ""}
          onClick={() => handleButtonClick("popular")}
        >
          Популярное
        </button>
        <button
          className={activeButton === "drinks" ? "active" : ""}
          onClick={() => handleButtonClick("drinks")}
        >
          Напитки
        </button>
        <button
          className={activeButton === "bakery" ? "active" : ""}
          onClick={() => handleButtonClick("bakery")}
        >
          Выпечка
        </button>
      </div>
    </header>
  );
};

export default Header;
