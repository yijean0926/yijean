import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';

const App: React.FC = () => {
  // Lifted state to persist input across navigation
  const [sharedText, setSharedText] = useState('');

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Home inputText={sharedText} setInputText={setSharedText} />} 
        />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </HashRouter>
  );
};

export default App;