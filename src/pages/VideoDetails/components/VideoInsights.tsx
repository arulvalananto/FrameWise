import React from 'react';

import Faces from './Faces';
import Brands from './Brands';
import Places from './Places';
import Topics from './Topics';
import Mentions from './Mentions';

const VideoInsights: React.FC = () => {
    return (
        <div className="flex flex-col gap-2">
            <Faces />
            <Brands />
            <Places />
            <Topics />
            <Mentions />
        </div>
    );
};

export default VideoInsights;
