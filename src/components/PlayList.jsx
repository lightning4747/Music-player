import { useState } from "react"
import { useMusic } from "../hooks/useMusic";

export const PlayList = () => {
    const [newplayListName,setplayListName] = useState("");

    const {playlists, createPlaylists} = useMusic();

    const handleCreatePlaylist = () => {
        if(newplayListName.trim()) {
           createPlaylists(newplayListName.trim());
           setplayListName(""); 
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
                {playlists.length === 0 ? (<p className="empty-message" >No playlists created yet..</p>):
                (playlists.map((item,key)=> (
                <div className="playlist-item" key={item.id}>
                    <div className="playlist-header">
                    <h3>{item.name}</h3>
                    <div className="playlist-action">
                        <button className="delete-playlist-btn">Delete</button>
                    </div>
                    </div>
                </div>)))}
                {/* Add song Search */}
                
            </div>
        </div>
    )
}