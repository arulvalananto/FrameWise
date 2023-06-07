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
        <div className="mt-20 md:mt-10 flex-1 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-stretch gap-2">
                {videos?.map((video: VideoState) => (
                    <Video video={video} key={video?.id} />
                ))}
            </div>
        </div>
    );
};

export default AllVideos;
