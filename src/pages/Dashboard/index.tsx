import { useDispatch } from 'react-redux';
import React, { memo, useEffect, useRef } from 'react';

import Header from './components/Header';
import AllVideos from './components/AllVideos';
import { AppDispatch } from '../../store/index.ts';
import { fetchAllVideos } from '../../store/reducers/videos/index.thunk.ts';

const Dashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const shouldRender = useRef(true);

    useEffect(() => {
        if (shouldRender.current) {
            shouldRender.current = false;
            dispatch(fetchAllVideos());
        }
    }, [dispatch]);

    return (
        <section id="dashboard" className="w-full h-full flex flex-col">
            <Header />
            <AllVideos />
        </section>
    );
};

const MemoziedDashboard = memo(Dashboard);
export default MemoziedDashboard;
