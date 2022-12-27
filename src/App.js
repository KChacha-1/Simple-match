import "./App.css";
import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";
const cardImg = [
  {
    src: "/img/png-1.png",
  },
  {
    src: "/img/png-2.png",
  },
  {
    src: "/img/png-3.png",
  },
  {
    src: "/img/png-4.png",
  },
  {
    src: "/img/png-5.png",
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [game, setGame] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [endgame, setEndGame] = useState(0);
  const shuffleCards = () => {
    const shuffledCards = [...cardImg, ...cardImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setGame(true);
    setEndGame(0);
  };
  // Commented out for just a normal new game rest 
  // useEffect(() => {
  //   shuffleCards();
  // }, []);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        setEndGame((prevGame) => prevGame + 1);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetCards();
      } else {
        setTimeout(() => resetCards(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetCards = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns((prevTurns) => prevTurns + 1);
  };
  return (
    <div className="App">
      <h1>Simple Match</h1>
      {!game && <button onClick={shuffleCards}>New Game</button>}
      {/* <button onClick={shuffleCards}>New Game</button> */}
      {game && (
        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      )}
      {console.log(cards)}
      <div className="turns">turns:{turns}</div>
      {endgame === 5 ? (
        <div>
          <h1>YOU WIN!!!!</h1>
          <button onClick={shuffleCards}>New Game</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
