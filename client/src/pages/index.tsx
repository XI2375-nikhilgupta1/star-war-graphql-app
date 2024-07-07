import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './home';

const Pages: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/" />
            </Routes>
        </BrowserRouter>
    );
}

export default Pages;