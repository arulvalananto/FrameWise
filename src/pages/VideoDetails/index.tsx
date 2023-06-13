import { useNavigate, useParams } from 'react-router-dom';
import React, { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../store';
import VideoPlayer from './components/VideoPlayer';
import MemoziedLoader from '../../components/Loader';
import VideoInsights from './components/VideoInsights';
import MemoziedBackButton from '../../components/BackButton';
import { videoDetailsSelector } from '../../store/reducers/videoDetails';
import { fetchVideoDetails } from '../../store/reducers/videoDetails/index.thunk';

const VideoDetails: React.FC = () => {
    const { id } = useParams();
    const shouldRender = useRef(true);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { isLoading } = useSelector(videoDetailsSelector);

    useEffect(() => {
        if (id) {
            if (shouldRender.current) {
                shouldRender.current = false;
                dispatch(fetchVideoDetails({ id }));
            }
        } else {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return (
            <div className="container-center">
                <MemoziedLoader />
            </div>
        );
    }

    return (
        <section className="w-full h-full flex flex-col xl:flex-row overflow-auto gap-2 relative">
            <div className="xl:flex-1 rounded bg-secondary">
                <VideoPlayer />
            </div>
            <div className="flex-1 insights xl:overflow-auto xl:flex-none xl:w-[400px] 2xl:w-[600px]">
                <VideoInsights />
            </div>
            <MemoziedBackButton
                to="/"
                title="Go back"
                className="absolute top-4 left-4 px-2 py-1 bg-primary text-black rounded text-xs md:text-base"
            />
        </section>
    );
};

const MemoziedVideoDetails = memo(VideoDetails);
export default MemoziedVideoDetails;
