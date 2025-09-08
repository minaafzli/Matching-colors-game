export default function Card({ card, handleChoice }) {
  return (
    <div
      onClick={() => handleChoice(card)}
      className={`w-30 h-30 flex items-center justify-center rounded-lg shadow cursor-pointer transition-all duration-100 
        ${card.flipped || card.matched ? card.color : "bg-gray-500"}`}
    ></div>
  );
}