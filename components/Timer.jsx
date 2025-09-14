import { useEffect } from "react";

function Timer({ isGameOver ,seconds , setSeconds}) {

  useEffect(() => {
    if (isGameOver ) return;  //game ends 
    
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // cleaning
    return () => clearInterval(interval);
  }, [isGameOver ]);

//  conver time format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const secs = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return <div className="">{formatTime(seconds)}</div>;
}

export default Timer;
