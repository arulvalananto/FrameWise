import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Sidebar from './components/Sidebar.tsx';
import { AppDispatch } from '../../store/index.ts';
import { fetchAllVideos } from '../../store/reducers/videos/index.thunk.ts';

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchAllVideos());
    }, [dispatch]);

    return (
        <div className="w-screen h-screen flex items-center">
            <Sidebar />
            <div className="w-full h-full flex-1 px-5 py-10">
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
