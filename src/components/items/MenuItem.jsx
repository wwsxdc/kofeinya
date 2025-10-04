import React, { useState } from "react";
import "./MenuItem.css";
import DrinkModal from "../FckModal/DrinkModal";

const MenuItem = ({
  id,
  drinkName,
  drinkPrice,
  drinkVolume,
  imageName,
  drinkDescription,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="item"
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
      >
        <div className="dv_img">
          <img className="item__img" src={imageName} alt={drinkName} />
        </div>
        <div className="item__info">
          <h3 className="item__name">{drinkName}</h3>
        </div>
        <div className="item__bottom">
          <div className="item__price">{drinkPrice} руб</div>
          <div className="item__vlm">{drinkVolume}</div>
        </div>
      </div>

      <DrinkModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        drinkName={drinkName}
        imageName={imageName}
        drinkPrice={drinkPrice}
        drinkVolume={drinkVolume}
        drinkDescription={drinkDescription}
        id={id}
      />
    </>
  );
};

export default MenuItem;
