import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";

export const useMusic = () => {
    return useContext(MusicContext);
}