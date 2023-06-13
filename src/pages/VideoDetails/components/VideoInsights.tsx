import React from 'react';
import { useSelector } from 'react-redux';

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
import MemoziedLoader from '../../../components/Loader';
import { videoDetailsSelector } from '../../../store/reducers/videoDetails';

const VideoInsights: React.FC = () => {
    const {
        show: {
            keyword,
            face,
            brand,
            emotion,
            sentiment,
            place,
            topic,
            label,
            mention,
        },
        isInsightsLoading,
    } = useSelector(videoDetailsSelector);

    return (
        <div className="flex flex-col gap-2">
            <InsightHeader />
            {isInsightsLoading ? (
                <div className="w-full flex items-center justify-center">
                    <MemoziedLoader message="Translating... Please wait for sec" />
                </div>
            ) : (
                <React.Fragment>
                    {keyword && <Keywords />}
                    {face && <Faces />}
                    {brand && <Brands />}
                    {emotion && <Emotions />}
                    {sentiment && <Sentiments />}
                    {place && <Places />}
                    {mention && <Mentions />}
                    {topic && <Topics />}
                    {label && <Labels />}
                </React.Fragment>
            )}
        </div>
    );
};

export default VideoInsights;
