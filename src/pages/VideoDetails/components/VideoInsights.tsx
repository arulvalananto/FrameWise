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
import { useSelector } from 'react-redux';
import { videoDetailsSelector } from '../../../store/reducers/videoDetails';

const VideoInsights: React.FC = () => {
    const {
        show: {
            keyword,
            face,
            brand,
            emotion,
            sentiment,
            namedLocation,
            topic,
            label,
            namedPerson,
        },
    } = useSelector(videoDetailsSelector);

    return (
        <div className="flex flex-col gap-2">
            <InsightHeader />
            {keyword && <Keywords />}
            {face && <Faces />}
            {brand && <Brands />}
            {emotion && <Emotions />}
            {sentiment && <Sentiments />}
            {namedLocation && <Places />}
            {topic && <Topics />}
            {label && <Labels />}
            {namedPerson     && <Mentions />}
        </div>
    );
};

export default VideoInsights;
