import { useState } from "react";
import { CartProvider } from "./components/context/CartContext";
import Header from "./components/Header/Header";
import MenuList from "./components/menu/MenuList";
import BasketButton from "./components/ModalBasket/BasketButton";
import "./styles/App.css";
import AuthModal from "./components/AuthModal/AuthModal";

function App() {
  const [activeCategory, setActiveCategory] = useState("popular");

  return (
    <CartProvider>
      <div className="App">
        <AuthModal />
        <Header onCategoryChange={setActiveCategory} />
        <MenuList activeCategory={activeCategory} />
        <BasketButton />
      </div>
    </CartProvider>
  );
}

export default App;
