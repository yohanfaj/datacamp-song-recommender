import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import background from './background.png';
import {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {

  const containerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const searchSong = (query) => {
    console.log(query)
    fetch(`http://127.0.0.1:5000/songs/search?query=${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error('Something went wrong');
      }
    })
        .then(data => {
            console.log(data);
            setSongs(data);
        }
    ).catch(error => {
      console.log(error);
    });
  }

  const handleButtonClick = (songId) => {
    // Ici, nous utilisons window.location pour rediriger l'utilisateur
    // Vous pouvez également utiliser une bibliothèque de routage comme React Router
    window.location.href = `/songs/?id_song=${songId}`;
 }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={containerStyle}>
      <img src={logo} style={{ width: '70%', height: 'auto' }} className="mb-4" alt="logo" />

      <div className="w-full max-w-xl p-6">
        <div className="flex items-center border-b border-purple-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Select a song"
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    searchSong(query);
                }
            }}
          />

          <button className="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500
           hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="button"
                  onClick={
                    () => {
                        searchSong(query);
                        }
                  }>
            Search
          </button>
        </div>
      </div>

      {/* Tableau des chansons */}

      {songs.length > 0 && (
        <div className="mt-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Artist</th>
                <th className="py-2 px-4 border">Album</th>
                <th className="py-2 px-4 border">Action</th>  {/* Nouvelle colonne pour le bouton */}
                {/* Ajoutez d'autres en-têtes de colonne si nécessaire */}
              </tr>
            </thead>
            <tbody>
              {songs.map(song => (
                <tr key={song.id}>
                  <td className="py-2 px-4 border">{song.Name}</td>
                  <td className="py-2 px-4 border">{song.Artist}</td>
                  <td className="py-2 px-4 border">{song.Album}</td>
                  <td className="py-2 px-4 border">
                    <button onClick={() => handleButtonClick(song.id)}>View</button>  {/* Bouton pour chaque chanson */}
                  </td>
                  {/* Ajoutez d'autres colonnes si nécessaire */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


    </div>
  );

}

export default App;