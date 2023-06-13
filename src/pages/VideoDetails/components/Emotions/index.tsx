import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';

import MemoziedTimeline from '../Timeline';
import EmotionsChart from './EmotionsChart';
import MemoziedInsightSection from '../InsightSection';
import constants from '../../../../static/constants.json';
import { getTimelineInfo } from '../../../../common/helpers';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const Emotions: React.FC = () => {
    const { selectedInsight, insights } = useSelector(videoDetailsSelector);

    const timeline = useMemo(() => {
        const emotion = selectedInsight?.emotion;
        return emotion
            ? emotion?.instances?.map((instance) => getTimelineInfo(instance))
            : [];
    }, [selectedInsight?.emotion]);

    if (!insights?.emotions?.length) {
        return null;
    }
    return (
        <MemoziedInsightSection
            title={constants.INSIGHTS.EMOTIONS}
            count={insights?.emotions?.length}
            showExpand={false}
        >
            <div className="flex flex-col w-full gap-5">
                <EmotionsChart />
                <MemoziedTimeline timeline={timeline} />
            </div>
        </MemoziedInsightSection>
    );
};

export default Emotions;
