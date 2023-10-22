import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css';
import App from './App';
import SongAnalyzed from './SongAnalyzed';

import 'bootstrap/dist/css/bootstrap.css';

createRoot(document.getElementById('root')).render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/songs/:songId" element={<SongAnalyzed />} />
        </Routes>
    </Router>
);