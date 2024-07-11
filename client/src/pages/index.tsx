import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './home';
import CharacterPage from './character';

const Pages: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route
          element={<CharacterPage />}
          path="/character/:name/:characterId"
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
