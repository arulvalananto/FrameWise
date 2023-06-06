import React from 'react';

import { VideoState } from '../../../store/reducers/videos/index.interface';

interface VideoProps {
    video: VideoState;
}

const Video: React.FC<VideoProps> = () => {
    return <div>Video</div>;
};

export default Video;
