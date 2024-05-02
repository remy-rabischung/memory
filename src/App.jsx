import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import Button from "./Button";
import Title from "./Title";
import "./App.css";

import coliseeImage from "./assets/images/colisee.png";
import machuImage from "./assets/images/machu.png";
import chineImage from "./assets/images/chine.png";
import chichenImage from "./assets/images/chichen.png";
import tajImage from "./assets/images/taj.png";
import petraImage from "./assets/images/petra.png";

const images = [
  coliseeImage,
  machuImage,
  chineImage,
  chichenImage,
  tajImage,
  petraImage,
];

const initialCards = images
  .concat(images)
  .map((image, index) => ({
    image: image,
    isFlipped: false,
    isMatched: false,
    id: index,
  }));

  function App() {
    const [cards, setCards] = useState([]);
    const [flippedIndexes, setFlippedIndexes] = useState([]);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);
  
    useEffect(() => {
      shuffleCards(initialCards);
    }, []);
  
    useEffect(() => {
      const allCardsMatched = cards.every((card) => card.isMatched);
      if (allCardsMatched) {
        setIsGameWon(true);
      }
    }, [cards]);
  
    useEffect(() => {
      return () => {
        setCards([]);
        setFlippedIndexes([]);
        setIsGameWon(false);
      };
    }, []);

  useEffect(() => {
    if (flippedIndexes.length === 2) {
      const [index1, index2] = flippedIndexes;
      if (cards[index1].image === cards[index2].image) {
        setCards((prevCards) =>
          prevCards.map((card, i) =>
            i === index1 || i === index2 ? { ...card, isMatched: true } : card
          )
        );
        setFlippedIndexes([]);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, i) =>
              i === index1 || i === index2 ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedIndexes([]);
        }, 1000);
      }
    }
  }, [flippedIndexes, cards]);

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

  const restartGame = () => {
    shuffleCards(initialCards);
    setFlippedIndexes([]);
    setIsGameWon(false);
  };

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
    const audioElement = document.getElementById("backgroundMusic");
    if (musicPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  };

  return (
    <div className="App">
      <Title />
      {isGameWon && (
        <div className="victory-message">
          <span role="img" aria-label="Trophy">
            🏆
          </span>{" "}
          Vous avez gagné !
        </div>
      )}
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
      <Button onClick={toggleMusic}>
        {musicPlaying ? "Pause Music" : "Play Music"}
      </Button>
      <audio id="backgroundMusic" loop>
        <source src="./assets/musique/Red.m4a" type="audio/mpeg" />
        Votre navigateur ne prend pas en charge l'élément audio.
      </audio>
    </div>
  );
}

export default App;
