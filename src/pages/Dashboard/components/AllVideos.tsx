import React from 'react';
import { useSelector } from 'react-redux';

import Video from './Video';
import { videosSelector } from '../../../store/reducers/videos';
import { VideoState } from '../../../store/reducers/videos/index.interface';

const AllVideos: React.FC = () => {
    const { videos, isLoading } = useSelector(videosSelector);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!videos?.length) {
        return <p>No Videos found!</p>;
    }

    return (
        <div>
            {videos?.map((video: VideoState) => (
                <Video video={video} key={video?.id} />
            ))}
        </div>
    );
};

export default AllVideos;
