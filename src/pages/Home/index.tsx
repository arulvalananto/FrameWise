import React from 'react';
import { Outlet } from 'react-router-dom';

import './index.css';
import Sidebar from './components/Sidebar';

const Home: React.FC = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="home-content">
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
