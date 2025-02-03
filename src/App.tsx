import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FrontPage from './components/FrontPage';
import SavedJokes from './components/SavedJokes';
import useJokes from './hooks/useJokes';

const App: React.FC = () => {
  const { savedJokes, saveJoke } = useJokes();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<FrontPage saveJoke={saveJoke} />} />
        <Route path="/saved" element={<SavedJokes jokes={savedJokes} />} />
      </Routes>
    </Router>
  );
};

export default App;
