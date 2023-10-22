import React from "react";

const SongCard = ({ song }) => {
    return (
        <div className="song-card">
        <div className="song-info">
            <h2>{song.name}</h2>
            <h3>{song.artist}</h3>
            <p>{song.album}</p>
        </div>
        </div>
    );
}

export default SongCard;