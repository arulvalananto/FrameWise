import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './components/Sidebar.tsx';

const Home: React.FC = () => {
    return (
        <div className="w-screen h-screen flex items-center">
            <Sidebar />
            <div className="w-full h-full flex-1 p-1 md:px-5 md:py-10">
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
