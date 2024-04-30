import React from "react";
import backImage from "./assets/images/back.png";

const Card = ({ card, index, handleCardClick }) => {
  const handleClick = () => {
    handleCardClick(index);
  };

  return (
    <div
      className={`card ${card.isFlipped ? "flip" : ""} ${
        card.isMatched ? "matched" : ""
      }`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
          {card.isFlipped ? ( // Condition pour afficher l'image de dos ou de face
            <img src={card.image} alt={`Card ${index}`} />
          ) : (
            <img src={backImage} alt="Card Back" />
          )}
        </div>
        <div className="card-back">
          <img src={backImage} alt="Card Back" />
        </div>
      </div>
    </div>
  );
};

export default Card;