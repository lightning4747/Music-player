import { useState } from "react"

const songs = [
    {
        id: 1,
        title: "No. 1 Party Anthem",
        artist: "Arctic Monkeys",
        url: "/songs/Arctic Monkeys - No. 1 Party Anthem(MP3_160K).mp3",
        duration: "4:03"
    },
    {
        id: 2,
        title: "505",
        artist: "Arctic Monkeys",
        url: "public/songs/Arctic Monkeys - 505(MP3_160K).mp3",
        duration: "4:11"
    },
    {
        id: 3,
        title: "Just Dance",
        artist: "Lady Gaga feat. Colby O'Donis",
        url: "public/songs/Just Dance - Lady Gaga (Feat. Colby O_Donis) (Lyrics) 🎵(MP3_160K).mp3",
        duration: "4:12"
    },
    {
        id: 4,
        title: "OIIAIOI CAT",
        artist: "Unknown",
        url: "public/songs/OIIAOIIA CAT but in 4K (Not Actually)(MP3_320K).mp3",
        duration: "0:12"
    },
    {
        id: 5,
        title: "Love Me Not",
        artist: "Ravyn Lenae",
        url: "public/songs/Ravyn Lenae - Love Me Not (Lyrics)(MP3_160K).mp3",
        duration: "3:33"
    },
    {
        id: 6,
        title: "The Less I Know The Better",
        artist: "Tame Impala",
        url: "public/songs/Tame Impala - The Less I Know The Better (Audio)(MP3_160K).mp3",
        duration: "3:37"
    }
];


export const useMusic = () => {
    const [allSongs, setAllSongs] = useState(songs)
    
    return {allSongs};
}   