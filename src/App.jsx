import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import Button from "./Button";
import Title from "./Title";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

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
  const [isGameWon, setIsGameWon] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    shuffleCards(initialCards);
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      const allCardsMatched = cards.every((card) => card.isMatched);
      if (allCardsMatched) {
        setIsGameWon(true);
      }
    }
  }, [cards]);

  useEffect(() => {
    if (isGameWon) {
      setShowModal(true);
    }
  }, [isGameWon]);

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

  const handleCloseModal = () => {
    setShowModal(false);
    restartGame();
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
      <Button onClick={restartGame} variant="primary" size="lg">Restart Game</Button>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span role="img" aria-label="Trophy">
              🏆
            </span>{' '}
            Félicitations !
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Vous avez gagné !</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Rejouer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
