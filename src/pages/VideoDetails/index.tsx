import { useParams } from 'react-router-dom';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../store';
import VideoPlayer from './components/VideoPlayer';
import MemoziedLoader from '../../components/Loader';
import VideoInsights from './components/VideoInsights';
import { videoDetailsSelector } from '../../store/reducers/videoDetails';
import { fetchVideoDetails } from '../../store/reducers/videoDetails/index.thunk';

const VideoDetails: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const { isLoading } = useSelector(videoDetailsSelector);

    useEffect(() => {
        if (id) {
            dispatch(fetchVideoDetails({ id }));
        }
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <div className="container-center">
                <MemoziedLoader />
            </div>
        );
    }

    return (
        <section className="w-full h-full flex flex-col xl:flex-row overflow-auto gap-2">
            <div className="xl:flex-1 rounded bg-secondary">
                <VideoPlayer />
            </div>
            <div className="flex-1 overflow-auto xl:flex-none xl:w-[400px] 2xl:w-[600px]">
                <VideoInsights />
            </div>
        </section>
    );
};

const MemoziedVideoDetails = memo(VideoDetails);
export default MemoziedVideoDetails;
