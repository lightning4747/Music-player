import { useState } from "react"
import { useMusic } from "../hooks/useMusic";

export const PlayList = () => {
    const [newplayListName,setplayListName] = useState("");
    const [selectedPlaylist, setSelectedPlaylists] = useState(null);
    const [searchQuery,setSearchQuery] = useState("");
    const [showDropdown,setShowDropdown] = useState(false);

    const {playlists, createPlaylists, allSongs, addSongToPlaylist, currentTrackIndex, handlePlaySong, deletePlaylist} = useMusic();

    console.log(playlists);
    const handleCreatePlaylist = () => {
        if(newplayListName.trim()) {
           createPlaylists(newplayListName.trim());
           setplayListName(""); 
        }
    }

    const filteredSongs = allSongs.filter((song)=> {
        const matches = song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        song.artist.toLowerCase().includes(searchQuery.toLowerCase());

        const isAlreadyInPlaylist = selectedPlaylist?.song?.some(( playlistSong)=> playlistSong.id === song.id);                

        return matches && !isAlreadyInPlaylist;
    });

    const handleAddSong = (song) => {
        if(selectedPlaylist) {
            addSongToPlaylist(selectedPlaylist.id, song);
            setSearchQuery("");
            setShowDropdown(false);
        }
    }

    const handlePlayFromPlayList = (song) => {
        const globalIndex = allSongs.findIndex((s) => s.id === song.id)
        handlePlaySong(song, globalIndex)
    }

    const deletePlalistConfirmation = (playlist) => {
        if (window.confirm(`Are you sure, you want to delete : "${playlist.name}"?`)) {
            deletePlaylist(playlist.id);
        }
    }

    return (
        <div className="playlists">
            <h2>Playlists</h2>

            {/* Create new Playlists*/}
            <div className="create-playlist">
              <h3>Create New Playlists</h3>
              <div className="playlist-form">
              <input type="text" placeholder="PlayList Name..." className="playlist-input"
              onChange={(e) => { 
                console.log("onchange");
                console.log(e.target.value);
                setplayListName(e.target.value);
            }}
              value={newplayListName}
              />
              <button className="create-btn" onClick={handleCreatePlaylist}>Create</button>
              </div>

            {/* List playlist*/}
            </div>
            <div className="playlists-list">
                {playlists?.length === 0 ? (<p className="empty-message" >No playlists created yet..</p>):
                (playlists?.map((item,key)=> (
                <div className="playlist-item" key={item.id}>
                    <div className="playlist-header">
                    <h3>{item.name}</h3>
                    <div className="playlist-action">
                        <button className="delete-playlist-btn" onClick={() => deletePlalistConfirmation(item)}>Delete</button>
                    </div>
                    </div>
                    {/* Add song Search */}
                    <div className="add-song-section">
                        <div className="search-container">
                            <input type="text" placeholder="Search songs to add..." value={
                                selectedPlaylist?.id === item.id ? searchQuery : ""
                            } 
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setSelectedPlaylists(item);
                                setShowDropdown(e.target.value.length > 0);
                            }}
                            onFocus={(e)=> {
                                setSelectedPlaylists(item);
                                setShowDropdown(e.target.value.length > 0);
                            }}
                            className="song-search-input"
                            />
                            {/* Dropdown  */}
                            {selectedPlaylist?.id === item.id && showDropdown && (
                                <div className="song-dropdown">
                                    {filteredSongs.length === 0 ? (<div className="dropdown-item no-results">No song found</div>) : 
                                        (filteredSongs.slice(0,5).map((song) => (
                                        <div className="dropdown-item" key={song.id} onClick={() => {
                                            handleAddSong(song);
                                        }}>
                                            <span className="song-title">{song.title}</span>
                                            <span className="song-artist">{song.artist}</span>
                                        </div>
                                        )))
                                        }
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="playlist-songs">
                        {item.songs.length === 0 ? (<p className="empty-playlist">No songs in this play</p>) : (item.songs.map((song,key) => (
                            <div key={key} className={`playlist-song ${currentTrackIndex === allSongs.findIndex((s)=> s.id === song.id) ? "active" : ""}`} 
                            onClick={()=> handlePlayFromPlayList(song)}>
                                <div className="song-info">
                                    <span className="song-title">{song.title}</span>
                                    <span className="song-artist">{song.artist}</span>
                                </div>
                                <span className="song-duration">{song.duration}</span>
                            </div>
                        ) ))}
                    </div>

                </div>
                ))
            )}
            </div>
        </div>
    );
};