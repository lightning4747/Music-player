import { useMusic } from "../hooks/useMusic";

export const AllSongs = () => {
    const {allSongs} = useMusic();
    
    return <div className="all-songs">
        <h2>All songs {allSongs.length}</h2>
    </div>
}