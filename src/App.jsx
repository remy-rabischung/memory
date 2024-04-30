import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Title from "./Title";
import backImage from "./assets/images/back.png";
import coliseeImage from "./assets/images/colisee.png";
import machuImage from "./assets/images/machu.png";
import chineImage from "./assets/images/chine.png";
import chichenImage from "./assets/images/chichen.png";
import tajImage from "./assets/images/taj.png";
import petraImage from "./assets/images/petra.png";
import "./App.css";

const images = [
  coliseeImage,
  machuImage,
  chineImage,
  chichenImage,
  tajImage,
  petraImage,
];

const initialCards = images.concat(images).map((image, index) => ({
  image: image,
  isFlipped: false,
  isMatched: false,
  id: index,
}));

function App() {
  const [cards, setCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);

  useEffect(() => {
    shuffleCards(initialCards);
  }, []);

  const shuffleCards = (cardsArray) => {
    for (let i = cardsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
    setCards(cardsArray);
  };

  const handleCardClick = (index) => {
    if (flippedIndexes.length === 2) return;
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedIndexes((prevIndexes) => [...prevIndexes, index]);
  };

  useEffect(() => {
    if (flippedIndexes.length === 2) {
      const [index1, index2] = flippedIndexes;
      if (cards[index1].image === cards[index2].image) {
        setCards((prevCards) =>
          prevCards.map((card, i) =>
            i === index1 || i === index2 ? { ...card, isMatched: true } : card
          )
        );
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, i) =>
              i === index1 || i === index2 ? { ...card, isFlipped: false } : card
            )
          );
        }, 1000);
      }
      setFlippedIndexes([]);
    }
  }, [flippedIndexes, cards]);

  const restartGame = () => {
    shuffleCards(initialCards);
    setFlippedIndexes([]);
  };

  return (
    <div className="App">
      <Title />
      <div className="card-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            index={index}
            card={card}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      <Button onClick={restartGame}>Restart Game</Button>
    </div>
  );
}

export default App;