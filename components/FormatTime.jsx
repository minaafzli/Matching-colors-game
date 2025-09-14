function FormatTime({seconds}) {
        
    function formatTime(time){
    const minutes = Math.floor(time / 60);
    const secs = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

       
    return (
        <div className="">
            {formatTime(seconds)}
        </div>
    )
}

export default FormatTime
