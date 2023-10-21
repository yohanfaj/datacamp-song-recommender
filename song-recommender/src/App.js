import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import background from './background.png';
import {useState} from "react";


function App() {

  const containerStyle = {
    backgroundImage: `url(${background})`, 
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', 
    minHeight: '100vh', 
  };

  const [query, setQuery] = useState('');
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
        }
    ).catch(error => {
      console.log(error);
    });
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
        </div>
    );
  
}

export default App;
