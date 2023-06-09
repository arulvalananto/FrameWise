import { useSelector } from 'react-redux';
import React, { useMemo, useState } from 'react';

import Topic from './components/Topic';
import MemoziedTimeline from '../Timeline';
import InsightSection from '../InsightSection';
import constants from '../../../../static/constants.json';
import { getTimelineInfo } from '../../../../common/helpers';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const Topics: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { selectedInsight, insights } = useSelector(videoDetailsSelector);

    const timeline = useMemo(() => {
        const topic = selectedInsight?.topic;
        return topic
            ? topic?.instances?.map((topic) => getTimelineInfo(topic))
            : [];
    }, [selectedInsight?.topic]);

    const handleIsExpanded = () => setIsExpanded(!isExpanded);

    if (!insights?.topics?.length) {
        return null;
    }

    return (
        <InsightSection
            title={constants.INSIGHTS.TOPICS}
            count={insights?.topics?.length}
            isExpanded={isExpanded}
            handleIsExpanded={handleIsExpanded}
        >
            <div className="flex flex-col w-full gap-5">
                <div
                    className={`flex flex-row flex-wrap items-center gap-2 overflow-hidden ${
                        isExpanded ||
                        insights?.topics?.length <
                            constants.INSIGHTS.CONFIG.EXPAND_MAX_LIMIT
                            ? 'h-auto'
                            : 'h-6 md:h-10'
                    }`}
                >
                    {insights?.topics?.map((topic) => (
                        <Topic topic={topic} key={topic?.id} />
                    ))}
                </div>
                <MemoziedTimeline timeline={timeline} />
            </div>
        </InsightSection>
    );
};

const MemoziedTopics = React.memo(Topics);
export default MemoziedTopics;
