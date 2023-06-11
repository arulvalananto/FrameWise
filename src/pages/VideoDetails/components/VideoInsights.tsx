import React from 'react';

import Faces from './Faces';
import Brands from './Brands';
import Places from './Places';
import Topics from './Topics';
import Labels from './Labels';
import Mentions from './Mentions';
import Keywords from './Keywords';
import Emotions from './Emotions';

const VideoInsights: React.FC = () => {
    return (
        <div className="flex flex-col gap-2">
            <Keywords />
            <Faces />
            <Brands />
            <Emotions />
            <Places />
            <Topics />
            <Labels />
            <Mentions />
        </div>
    );
};

export default VideoInsights;
