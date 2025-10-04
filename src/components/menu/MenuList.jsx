import React, { useState, useEffect } from "react";
import MenuItem from "../items/MenuItem";
import "./MenuList.css";

const MenuList = ({ activeCategory = "popular" }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/inventory/goods",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",

              // Если сервер ожидает токен в куках, а не в заголовке Authorization:
              // "Cookie": `jwt=${jwtToken}`
            },
            credentials: "include", // Для отправки кук, если требуется
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMenuItems(data.goods);
      } catch (err) {
        setError(err.message);
        console.error("Ошибка при загрузке данных:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Фильтрация по активной категории из Header
  const filteredItems = menuItems.filter((item) => {
    if (activeCategory === "popular") {
      return item.price > 100;
    }
    return item.category === activeCategory;
  });

  if (loading) {
    return <div className="loading-message">Загрузка...</div>;
  }

  if (error) {
    return <div className="error-message">Ошибка: {error}</div>;
  }

  return (
    <div className="menu-list-container">
      <div className="menu-list">
        {filteredItems.map((item) => (
          <MenuItem
            key={item.id}
            drinkName={item.name}
            drinkPrice={item.price}
            drinkVolume={`${item.volume} ${
              item.category === "bakery" ? "гр" : "мл"
            }`}
            imageName={item.image_link}
            drinkDescription={item.description}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-items-message">
          В этой категории пока нет товаров
        </div>
      )}
    </div>
  );
};

export default MenuList;
