import { useEffect, useRef } from "react";
import { useMusic } from "../hooks/useMusic";

export const MusicPlayer = () => {

    const {currentTrack,formatTime,setCurrentTime,currentTime,duration,setDuration,nextTrack,prevTrack,play,pause,isPlaying,volume,setVolume} = useMusic();
    const audioRef = useRef(null);

useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
        setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
        nextTrack();
        setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    audio.load(); 

    return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
    };
}, [currentTrack, setDuration, setCurrentTime]);

useEffect(()=> {
    const audio = audioRef.current;
    if(!audio) return;
    
    if(isPlaying) {
        audio.play().catch((err) => console.err(err))
    }
    else {
        audio.pause();
    }
},[isPlaying])

useEffect(()=> {
    if(!audioRef.current) return;

    audioRef.current.volume = volume;

},[volume]);

const progress = duration > 0 ? currentTime/duration * 100 : 0;


    return( 
        <div className="music-player">
            <audio ref={audioRef} src={currentTrack.url} preload="metadata" crossOrigin="anonymous" />

            <div className="track-info">
                <h3 className="track-title">{currentTrack.title}</h3>
                <p className="track-artist">{currentTrack.artist}</p>
            </div>

            <div className="progress-container">
                <span className="time">{formatTime(currentTime)}</span>
               <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={currentTime}
                    className="progress-bar"
                    onChange={(e) => {
                        const audio = audioRef.current;
                        if(!audio) return;

                        const time = parseFloat(e.target.value);
                        audio.currentTime = time;
                        setCurrentTime(time);
                    }}
                   style={{"--progress": `${progress}%`}}
                />

                <span className="time">{formatTime(duration)}</span>
            </div>

            <div className="controls">
                <button className="control-btn" onClick={prevTrack}>⏮</button>
                <button className="control-btn play-btn" onClick={() => isPlaying ? pause() : play()}>{ isPlaying ? "⏸"  : "▶︎"}</button>
                <button className="control-btn" onClick={nextTrack}>⏭</button>
            </div>

            <div className="volume-container">
                <span className="volume-icon">✮🎧</span>
                <input type="range"  min="0" max="1" step="0.1" className="volume-bar" onChange={ (e)=> {
                    const newVolume = parseFloat(e.target.value);
                    setVolume(newVolume);
                }} value={volume}/>
            </div>
        </div>

    );
};