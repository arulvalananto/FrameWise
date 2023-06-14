import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Sentiment from './components/Sentiment';
import MemoziedTimeline from '../Timeline';
import MemoziedInsightSection from '../InsightSection';
import constants from '../../../../static/constants.json';
import { getTimelineInfo } from '../../../../common/helpers';
import { TimelineProps } from '../../../../interfaces/common';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const Sentiments: React.FC = () => {
    const { selectedInsight, insights } = useSelector(videoDetailsSelector);

    const timeline: TimelineProps[] = useMemo(() => {
        const sentiment = selectedInsight?.sentiment;

        return sentiment
            ? sentiment?.instances?.map((instance) => getTimelineInfo(instance))
            : [];
    }, [selectedInsight?.sentiment]);

    if (!insights?.sentiments?.length) {
        return null;
    }

    return (
        <MemoziedInsightSection
            title={constants.INSIGHTS.SENTIMENTS}
            count={insights?.sentiments?.length || 0}
            showExpand={false}
        >
            <div className="flex flex-col gap-5 w-full">
                <div className="flex flex-row gap-6 md:gap-16 justify-center">
                    {insights?.sentiments?.map((sentiment, index) => (
                        <Sentiment
                            sentiment={sentiment}
                            key={index}
                            index={index}
                        />
                    ))}
                </div>
                <MemoziedTimeline timeline={timeline} />
            </div>
        </MemoziedInsightSection>
    );
};

const MemoziedSentiments = React.memo(Sentiments);
export default MemoziedSentiments;
