import React, { useState } from "react";
import "./AuthModal.css"; // Создайте этот файл для стилей

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    // Добавлено async здесь
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: login, // Используем значение из состояния
          password: password, // Используем значение из состояния
        }),
      });

      if (response.ok) {
        // Успешная авторизация
        console.log("Login successful");
        setIsOpen(false);
      } else {
        // Обработка ошибок авторизации
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="auth_modal">
        <h2>Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Логин:</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
