import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';

import logo from './logo.png';
import background from './background.png';

const SongAnalyzed = () => {

    const containerStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        maxHeight: '100%',
    };

    const [analyzedSong, setAnalyzedSong] = useState({})
    const [recommendedSongs, setRecommendedSongs] = useState([])

    useEffect(() => {
        const getAnalyzedSong = (songId) => {
            songId = window.location.href.split("/").pop();
            fetch(`http://127.0.0.1:5000/songs/${songId}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setAnalyzedSong(data[0])
                })
                .catch(error => console.log(error))
        };

        const getRecommendedSongs = (songId) => {
            songId = window.location.href.split("/").pop();
            fetch(`http://127.0.0.1:5000/songs/recommend?song_id=${songId}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setRecommendedSongs(data)
                })
                .catch(error => console.log(error))
        }

        getAnalyzedSong();
        getRecommendedSongs();
    }, []);



    return (
        <div className="flex flex-col items-center justify-center min-h-screen" style={containerStyle}>
            <img src={logo} style={{ width: '70%', height: 'auto' }} className="mb-4" alt="logo" />

            { analyzedSong ? (
                <div className="w-full max-w-xl p-6">
                    <div className="flex flex-col items-center bg-orange-300 shadow-md rounded-lg px-8 py-6 mb-4">
                        <h1 className="mb-4 text-2xl font-bold text-gray-900">Song Analyzed: </h1>
                        <br/>

                        <h2 className="mb-4 text-xl font-bold text-gray-900">{analyzedSong.Name} -
                            {analyzedSong.Artist}</h2>
                        <p className="mb-4 text-gray-900">From the album {analyzedSong.Album}</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            { recommendedSongs.length > 0 ? (
                <div className="w-full max-w-3xl p-6 mx-auto">
                  <div className="bg-purple-300 shadow-md rounded-lg p-6 mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Recommended Songs:</h1>

                    {recommendedSongs.map((song, index) => (
                      <div key={index} className="bg-orange-200 shadow-md rounded-lg p-6 mb-3">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{song.Name} - {song.Artist}</h3>
                        <p className="text-gray-700">From the album {song.Album}</p>
                      </div>
                    ))}
                  </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    );
}

export default SongAnalyzed;