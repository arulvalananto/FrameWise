import React from 'react';

import Faces from './Faces';
import Brands from './Brands';
import Places from './Places';

const VideoInsights: React.FC = () => {
    return (
        <div className="flex flex-col gap-2">
            <Faces />
            <Brands />
            <Places />
        </div>
    );
};

export default VideoInsights;
