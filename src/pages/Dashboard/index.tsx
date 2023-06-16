import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useEffect, useRef } from 'react';

import './index.css';
import Header from './components/Header/index.tsx';
import { AppDispatch } from '../../store/index.ts';
import AllVideos from './components/AllVideos/index.tsx';
import { fetchAllVideos } from '../../store/reducers/videos/index.thunk.ts';
import { videosSelector } from '../../store/reducers/videos/index.ts';

const Dashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const shouldRender = useRef(true);

    const { videos } = useSelector(videosSelector);

    useEffect(() => {
        if (shouldRender.current) {
            shouldRender.current = false;
            if (!videos.length) {
                dispatch(fetchAllVideos());
            }
        }
    }, [dispatch, videos.length]);

    return (
        <section id="library" className="library">
            <h3 className="library-title">Library</h3>
            <Header />
            <AllVideos />
        </section>
    );
};

const MemoziedDashboard = memo(Dashboard);
export default MemoziedDashboard;
