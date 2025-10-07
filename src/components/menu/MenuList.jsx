import React, { useState, useEffect } from "react";
import MenuItem from "../items/MenuItem";
import AuthModal from "../AuthModal/AuthModal"; // Импортируем компонент модалки
import "./MenuList.css";

const MenuList = ({ activeCategory = "popular" }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
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
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            setIsAuthModalOpen(true); // Открываем модалку вместо выброса ошибки
            setLoading(false);
            return; // Прерываем выполнение
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMenuItems(data.goods);
      } catch (err) {
        // Эта часть выполнится только для других ошибок (не 401)
        setError(err.message);
        console.error("Ошибка при загрузке данных:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Функция для повторной загрузки данных после успешной авторизации
  const refetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/inventory/goods",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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

      {/* Модальное окно авторизации */}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={() => {
            setIsAuthModalOpen(false);
            refetchData(); // Повторно загружаем данные после успешной авторизации
          }}
        />
      )}
    </div>
  );
};

export default MenuList;
