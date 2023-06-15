import React, { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import './index.css';
import { AppDispatch } from '../../store';
import VideoPlayer from './components/VideoPlayer';
import MemoziedLoader from '../../components/Loader';
import VideoInsights from './components/VideoInsights';
import { MemoziedBackButton } from '../../components/BackButton';
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
        <section className="video-details">
            <div className="video-player-container">
                <VideoPlayer />
            </div>
            <div className="video-insights-container insights">
                <VideoInsights />
            </div>

            <MemoziedBackButton to="/" title="Go back" />
        </section>
    );
};

const MemoziedVideoDetails = memo(VideoDetails);
export default MemoziedVideoDetails;
