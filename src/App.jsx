// App.jsx
import { useState, useEffect, useRef} from "react";
import Board from '/components/Board'
import Timer from '/components/Timer'
import FormatTime from "../components/FormatTime";

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
  const [tries , setTries] = useState(0)
  const [matchedCard , setMatchedCard] = useState(0)
  const [showModal , setShowModal] = useState(false)
  const [disabled, setDisabled] = useState(false); //disable clicking while compairing
  const [choiceTwo, setChoiceTwo] = useState(null); 
  const [isGameOver , setIsGameOver] =useState(false)
    const [seconds, setSeconds] = useState(0);
    const [bestTime , setBestTime] =useState(null)
    const [bestTry , setBestTry] =useState(null)

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
    setTries(0)
    setMatchedCard(0)
    setIsGameOver(false)
    setSeconds(0)
    
  }
  
  // start game
  useEffect(() => {
    startNewGame();
    {<Timer isGameOver={isGameOver} seconds={seconds} setSeconds={setSeconds} />}
  
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
  setMatchedCard(matchedCard+1)
    
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


 useEffect(()=>{
   if(matchedCard===COLORS.length) {
    setIsGameOver(true)
    setShowModal(true)


     setBestTime((prev) => {
      if (prev === null || seconds < prev) {
        return   seconds

      }
 return prev
    })

     setBestTry((prev) => {
      if (prev === null || tries < prev) {
        return tries
      }
      return prev
    })
  
    }
 },[matchedCard])

  // وقتی مقدار BestTry یا BestTime تغییر کرد ذخیره بشه
useEffect(() => {
 

  if (bestTry !== null) {
    localStorage.setItem("bestTry", bestTry);
  }
}, [bestTry]);

useEffect(() => {
  if (bestTime !== null) {
    localStorage.setItem("bestTime", bestTime);
  }
}, [bestTime]);

// وقتی برنامه اجرا میشه، از localStorage مقدار قبلی رو بخونه
useEffect(() => {
 
    const savedBestTry = localStorage.getItem("bestTry");
    const savedBestTime = localStorage.getItem("bestTime");
    
    if (savedBestTry !== null) {
      setBestTry(Number(savedBestTry));
    }
    if (savedBestTime !== null) {
      setBestTime(Number(savedBestTime));
    }
    
  
}, []);


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
    setTries(tries+1)
   
  }


return (   
  <div
    className={"min-h-screen flex flex-col items-center justify-start md:justify-center p-6 bg-pink-100 relative "}
  >
    <div className={`${
      showModal ? "blur-xs " : "blur-none"
    }`}>

    <h1 className="text-2xl font-semibold mb-4 text-center">Matching Game!</h1>
    <div className="flex justify-between gap-10">
      <p>Tries: {tries}</p>
      <p>Matched: {matchedCard}</p>
      <p className="flex gap-1">Timer:  {<Timer isGameOver={isGameOver} seconds={seconds} setSeconds={setSeconds}  />}</p>
    </div>
    <Board cards={cards} handleChoice={handleChoice} />
    <div className=" flex mt-4 justify-center">
      <button
        className="px-4 py-2 md:py-3 md:px-6 bg-pink-600 text-white rounded cursor-pointer hover:bg-pink-700 "
        onClick={startNewGame}
        >
        Restart
      </button>
    </div>
        </div>

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <div className="bg-pink-100 text-gray-800 rounded-lg p-6 w-auto  text-center shadow-2xl">
          <p className="font-bold text-lg pb-5">Game Compeleted!</p>

      <div className="flex gap-10 justify-center" >
      <p>Tries: {tries}</p>
      <p>Best try:{bestTry}</p>
        </div>    

      <div className="flex gap-10 justify-center" >
      <p className="flex gap-2 ">Timer  {<Timer isGameOver={isGameOver} seconds={seconds} setSeconds={setSeconds} />}</p>
      <p className="flex gap-2">Best time {<FormatTime seconds={bestTime}/>}</p>
      </div> 

      <div className="flex gap-10 justify-center">
          <button
            onClick={() => {
              setShowModal(false) 
              startNewGame()
            }}
            className="mt-6 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            >
            Close
          </button>
            </div>
        </div>
      </div>
    )}
  </div>
);

}