
import { useState, useEffect } from "react";
import Card from "./Card";

function Cards() {
  const COLORS = [
    "pink",
    "purple",
    "blue",
    "sky",
    "green",
    "yellow",
   
  ];

  //repeat two COLORS array to create one array with double colors
  const doubledColors = [...COLORS, ...COLORS];
console.log(COLORS)


//shuffle
  function shuffleArray(array) {
    return array
      .map((item) => ({ value: item, sort: Math.random() }))  //{value:pink sort:0.122}
      .sort((a, b) => a.sort - b.sort) //sorting the numbers
      .map((obj) => obj.value);  //output is an array with shuffle colors
  }

  const [shuffledColors, setShuffledColors] = useState([]);

  useEffect(() => {
    setShuffledColors(shuffleArray(doubledColors));  //shuffle the shuffleArray and set in setshufflecolors for first render
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="grid grid-cols-4 gap-4">
        {shuffledColors.map((color, index) => (
          <Card key={index} color={color} />  //create an shuffle array of all doubled colors
        ))}
      </div>
    </div>
  );
}

export default Cards;
