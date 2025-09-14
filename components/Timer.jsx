import { useEffect } from "react";
import FormatTime from "./FormatTime";

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
  
  return <FormatTime seconds={seconds}/>;
}

export default Timer;
