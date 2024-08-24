import { useEffect } from 'react';
import { BsMusicNoteBeamed } from 'react-icons/bs';

const DisplayTrack = ({
  currentTrack,
  audioRef,
  volume,
  muteVolume,
  setDuration,
  progressBarRef,
  handleNext
}) => {
  const onLoadedMetadata = () => {
    console.log("onLoadedMeta", onloadedmetadata)

    const seconds = audioRef.current.duration;

    audioRef.current.volume = volume / 100;

    audioRef.current.muted = muteVolume;

    setDuration(parseInt(seconds, 10));

    progressBarRef.current.max = seconds;
  };

  useEffect(() => {
    return () => {
      if(progressBarRef.current) {
        progressBarRef.current.max = 0;
      } 
      setDuration(0)
    } 
  }, [])

  return (
    <audio
      controlsList="nodownload"
      autoPlay
      ref={audioRef}
      onLoadedMetadata={onLoadedMetadata}
      onEnded={handleNext}>
      <source src={currentTrack?.src} type="audio/mpeg" />
    </audio>
  );
};
export default DisplayTrack;