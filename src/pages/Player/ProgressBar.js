import { useEffect } from "react";

const ProgressBar = ({
    progressBarRef,
    audioRef,
    timeProgress,
    bufferedProgress,
    duration,
  }) => {
    const handleProgressChange = () => {
      audioRef.current.currentTime = progressBarRef.current.value;
    };
  
    const formatTime = (time) => {
      if (time && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const formatMinutes =
          minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(time % 60);
        const formatSeconds =
          seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${formatMinutes}:${formatSeconds}`;
      }
      return '00:00';
    };

    useEffect(() => {
      console.log("duration", duration)
    }, [duration]);

    return (
      <div className="progress">
        <span className="time current font-bold w-[50px]">{formatTime(timeProgress)}</span>
        <input
          type="range"
          ref={progressBarRef}
          defaultValue="0"
          onChange={handleProgressChange}
          style={{
            background: `linear-gradient(to right, #ACCFFF 0%, 
              #ACCFFF
              ${bufferedProgress}%, #FEFEFE
              ${bufferedProgress}%, #FEFEFE
              100%)`,
          }}
        />
        <span className="time font-bold w-[50px]">{formatTime(duration)}</span>
      </div>
    );
  };
  
  export default ProgressBar;