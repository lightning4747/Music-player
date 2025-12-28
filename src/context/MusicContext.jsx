import { createContext,useState } from "react";

export const MusicContext = createContext();

const songs = [
    {
        id: 1,
        title: "No. 1 Party Anthem",
        artist: "Arctic Monkeys",
        url: "songs/Arctic Monkeys - No. 1 Party Anthem(MP3_160K).mp3",
        duration: "4:03"
    },
    {
        id: 2,
        title: "505",
        artist: "Arctic Monkeys",
        url: "/songs/Arctic Monkeys - 505(MP3_160K).mp3",
        duration: "4:11"
    },
    {
        id: 3,
        title: "Just Dance",
        artist: "Lady Gaga feat. Colby O'Donis",
        url: "/songs/Just Dance - Lady Gaga (Feat. Colby O_Donis) (Lyrics) 🎵(MP3_160K).mp3",
        duration: "4:12"
    },
    {
        id: 4,
        title: "OIIAIOI CAT",
        artist: "Unknown",
        url: "/songs/OIIAOIIA CAT but in 4K (Not Actually)(MP3_320K).mp3",
        duration: "0:12"
    },
    {
        id: 5,
        title: "Love Me Not",
        artist: "Ravyn Lenae",
        url: "/songs/Ravyn Lenae - Love Me Not (Lyrics)(MP3_160K).mp3",
        duration: "3:33"
    },
    {
        id: 6,
        title: "The Less I Know The Better",
        artist: "Tame Impala",
        url: "/songs/Tame Impala - The Less I Know The Better (Audio)(MP3_160K).mp3",
        duration: "3:37"
    }
];

export const MusicProvider = ({children}) => {
        const [allSongs, setAllSongs] = useState(songs)
        const [currentTrack, setCurrentTrack] = useState(songs[0])
        const [currentTrackIndex,setCurrentTrackIndex] = useState(0)
        const [currentTime,setCurrentTime] = useState(0)
        const [duration, setDuration] = useState(0)
        const [isPlaying, setIsplaying] = useState(false)
        const [volume, setVolume] = useState(0.7)
    
        const handlePlaySong = (song,index) => {
            setCurrentTrack(song)
            setCurrentTrackIndex(index)
        }
    
        const formatTime = (time) => {
            if(isNaN(time) || time === undefined) return "0.00"
    
            const minutes = Math.floor(time / 60)
            const seconds = Math.floor(time % 60)
    
            return `${minutes}:${seconds.toString().padStart(2,"0")}`;
        };
    
        const nextTrack = () => {
            setCurrentTrackIndex((prev)=> {
                const nextTrack = (prev + 1) % allSongs.length;
                setCurrentTrack(allSongs[nextTrack]);
                return nextTrack;
            })
            setIsplaying(false);
        }
    
        const prevTrack = () => {
            setCurrentTrackIndex((prev)=> {
                const nextTrack = prev === 0 ? allSongs.length - 1 : prev - 1;
                setCurrentTrack(allSongs[nextTrack]);
                return nextTrack;
            })
            setIsplaying(false);
        }
    
        const play = () => setIsplaying(true);
        const pause = () => setIsplaying(false);
    return <MusicContext.Provider value={
        {allSongs, handlePlaySong, currentTrack,currentTrackIndex,formatTime,setCurrentTime,currentTime, duration,setDuration,nextTrack,prevTrack,play,pause,isPlaying,volume,setVolume}
    }>{children}</MusicContext.Provider>
}