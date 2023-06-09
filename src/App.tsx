import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import MemoziedDashboard from './pages/Dashboard';
import MemoziedVideoDetails from './pages/VideoDetails';

const App: React.FC = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}>
                        <Route path="/settings" element={<Settings />} />
                        <Route
                            path="/library/:id"
                            element={<MemoziedVideoDetails />}
                        />
                        <Route path="/" element={<MemoziedDashboard />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            <Toaster position="top-right" reverseOrder={true} />
        </div>
    );
};

export default App;
