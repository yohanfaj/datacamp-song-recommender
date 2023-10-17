import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./tailwind.css"
import "./styles/purple-animation.css"

function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="bg-gradient-to-b from-purple-800 via-purple-600 to-purple-400 h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-white mb-4">Welcome to My App</h1>
      <p className="text-xl text-white mb-8">My awesome Home component</p>

      <input
        type="text"
        placeholder="Enter text here"
        value={inputValue}
        onChange={handleInputChange}
        className="w-64 h-10 px-3 py-2 rounded-md shadow-md focus:outline-none focus:ring focus:border-purple-600 bg-white text-gray-700"
      />

      <p className="mt-4 text-white">
        You entered: <span className="font-bold">{inputValue}</span>
      </p>
    </div>
  );
}

export default Home;
