import React from 'react';

import Faces from './Faces';
import Brands from './Brands';
import Places from './Places';
import Topics from './Topics';
import Labels from './Labels';
import Mentions from './Mentions';
import Keywords from './Keywords';
import Emotions from './Emotions';
import Sentiments from './Sentiments';
import InsightHeader from './InsightHeader';

const VideoInsights: React.FC = () => {
    return (
        <div className="flex flex-col gap-2">
            <InsightHeader />
            <Keywords />
            <Faces />
            <Brands />
            <Emotions />
            <Sentiments />
            <Places />
            <Topics />
            <Labels />
            <Mentions />
        </div>
    );
};

export default VideoInsights;
