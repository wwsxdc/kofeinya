import React, { useState } from "react";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: login,
          password: password,
        }),
      });

      if (response.ok) {
        console.log("Login successful");
        onSuccess(); // Вызываем колбэк успеха
        onClose(); // Закрываем модалку
      } else {
        console.error("Login failed");
        // Можно добавить обработку ошибок (показать сообщение пользователю)
        alert("Ошибка авторизации. Проверьте логин и пароль.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Ошибка сети. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  // Если модалка закрыта, не рендерим её
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="auth_modal">
        <h2>Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="login">Логин (email):</label>
            <input
              type="email"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Введите ваш email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Введите ваш пароль"
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
