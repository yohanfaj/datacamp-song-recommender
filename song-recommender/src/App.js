import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import background from './background.png';


function App() {

  const containerStyle = {
    backgroundImage: `url(${background})`, 
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', 
    minHeight: '100vh', 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={containerStyle}>
      <img src={logo} style={{ width: '70%', height: 'auto' }} className="mb-4" alt="logo" />
  
      <div className="w-full max-w-xl p-6">
        <div className="flex items-center border-b border-purple-500 py-2">
          <input 
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text" 
            placeholder="Select a song" 
          />
          
          <button className="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
            Search
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default App;
