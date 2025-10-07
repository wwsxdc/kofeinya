import React, { useState } from "react";
import "./AuthModal.css"; 

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(true);
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
        setIsOpen(false);
        // Можно добавить редирект или обновление состояния приложения
      } else {
        console.error("Login failed");
        // Можно добавить обработку ошибок (показать сообщение пользователю)
      }
    } catch (error) {
      console.error("Request failed:", error);
      // Можно добавить обработку ошибок сети
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
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