// App.jsx
import { useState, useEffect, useRef } from "react";
import Board from '/components/Board'

const COLORS = [
  "bg-pink-300",
  "bg-purple-500",
  "bg-blue-800",
  "bg-sky-400",
  "bg-green-600",
  "bg-yellow-300",
  "bg-red-500",
  "bg-amber-800",
];

export default function App() {
  const [cards, setCards] = useState([]);       
  const [choiceOne, setChoiceOne] = useState(null); 
  const [choiceTwo, setChoiceTwo] = useState(null); 
  const [disabled, setDisabled] = useState(false); //disable clicking while compairing
  const timeoutRef = useRef(null); //timeout for cleaning

  
  function startNewGame() {
    const doubled = [...COLORS, ...COLORS];
    const shuffled = doubled
      .map((color) => ({ value: color, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((obj, index) => ({
        id: index , // unique id
        color: obj.value,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  }

  // start game
  useEffect(() => {
    startNewGame();
    
  }, []);


  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;
    setDisabled(true);//disable click while compairing
    if (choiceOne.id === choiceTwo.id) {
     //if choice1 == choice2 =>cklick on one card
      resetTurn();
      return;
    }

    if (choiceOne.color === choiceTwo.color) {
  // matched(true)
      setCards((prev) =>
        prev.map((card) =>
          card.color === choiceOne.color ? { ...card, matched: true } : card
        )
      );
      resetTurn();
    } else {
//delay to see card's color befor flipped(false)
      timeoutRef.current = setTimeout(() => {
        setCards((prev) =>
          prev.map((card) =>
            card.id === choiceOne.id || card.id === choiceTwo.id
              ? { ...card, flipped: false }
              : card
          )
        );
        resetTurn();
      }, 900);
    }
  }, [choiceTwo]);

  function handleChoice(card) {
    // disable click while compairing
    if (disabled) return;
   //if card is matched or open return
    if (card.flipped || card.matched) return;

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    );

// if it's first click =>choice 1
    if (!choiceOne) {
      setChoiceOne(card);
    } else {
     //if choice1(true)=>it's choice 2
      setChoiceTwo(card);
    }
  }

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:justify-center p-6 bg-pink-100">
      <h1 className="text-2xl font-semibold mb-4">Matching Game!</h1>
      <Board cards={cards} handleChoice={handleChoice} />
      <div className="mt-4">
        <button
          className="px-4 py-2 md:py-3 md:px-6 bg-pink-600 text-white rounded"
          onClick={startNewGame}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
