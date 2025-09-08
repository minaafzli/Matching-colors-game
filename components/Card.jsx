export default function Card({ card, handleChoice }) {
  return (
    <div
      onClick={() => handleChoice(card)}
      className={`w-16 h-16  md:w-30 md:h-30 flex items-center justify-center rounded-lg shadow cursor-pointer transition-all duration-100 
        ${card.flipped || card.matched ? card.color : "bg-gray-500"}`}
    ></div>
  );
}