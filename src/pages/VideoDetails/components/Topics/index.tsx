import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';

import Topic from './Topic';
import MemoziedTimeline from '../Timeline';
import InsightSection from '../InsightSection';
import { getTimelineInfo } from '../../../../common/helpers';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const Topics: React.FC = () => {
    const { selectedInsight, insights } = useSelector(videoDetailsSelector);

    const timeline = useMemo(() => {
        const topic = selectedInsight?.topic;
        return topic
            ? topic?.instances?.map((topic) => getTimelineInfo(topic))
            : [];
    }, [selectedInsight?.topic]);

    if (!insights?.topics?.length) {
        return null;
    }

    return (
        <InsightSection title="topics" count={insights?.topics?.length}>
            <div className="flex flex-col w-full gap-4">
                <div className="flex flex-row flex-wrap gap-2">
                    {insights?.topics?.map((topic) => (
                        <Topic topic={topic} key={topic?.id} />
                    ))}
                </div>
                {/* <div>
                <p>{selectedInsight?.topic?.referenceId}</p>
                <p>{selectedInsight?.topic?.referenceUrl}</p>
            </div> */}
                <MemoziedTimeline timeline={timeline} />
            </div>
        </InsightSection>
    );
};

export default Topics;
