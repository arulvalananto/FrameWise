import React from 'react';

import Faces from './Faces';
import Brands from './Brands';
import Places from './Places';
import Topics from './Topics';
import Mentions from './Mentions';
import Keywords from './Keywords';

const VideoInsights: React.FC = () => {
    return (
        <div className="flex flex-col gap-2">
            <Faces />
            <Brands />
            <Places />
            <Topics />
            <Mentions />
            <Keywords />
        </div>
    );
};

export default VideoInsights;
