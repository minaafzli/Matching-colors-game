    const COLORS = {
      pink: "bg-pink-400",
      purple: "bg-purple-500",
      blue: "bg-blue-800",
      sky: "bg-sky-400",
      green: "bg-green-600",
      yellow: "bg-yellow-300",
     
    };
    
    
function Card({color}) {
    return (
        <>
        <div className={`w-36 h-36  rounded-3xl ${COLORS[color]} `}>
            
        </div>
       
        </>
    )
}

export default Card

