import { useSelector } from 'react-redux';
import React, { useMemo, useState } from 'react';

import Label from './Label';
import MemoziedTimeline from '../Timeline';
import InsightSection from '../InsightSection';
import constants from '../../../../static/constants.json';
import { getTimelineInfo } from '../../../../common/helpers';
import { TimelineProps } from '../../../../interfaces/common';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const Labels: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const {
        selectedInsight: { label },
        insights: { labels },
    } = useSelector(videoDetailsSelector);

    const timeline: TimelineProps[] = useMemo(
        () =>
            label?.instances
                ? label?.instances?.map((instance) => getTimelineInfo(instance))
                : [],
        [label?.instances]
    );

    const handleIsExpanded = () => setIsExpanded(!isExpanded);

    if (!labels?.length) {
        return null;
    }

    return (
        <InsightSection
            title={constants.INSIGHTS.LABELS}
            count={labels?.length}
            isExpanded={isExpanded}
            handleIsExpanded={handleIsExpanded}
        >
            <div
                className={`flex flex-row flex-wrap items-center gap-2 overflow-hidden ${
                    isExpanded ||
                    labels.length < constants.INSIGHTS.CONFIG.EXPAND_MAX_LIMIT
                        ? 'h-auto'
                        : 'h-8'
                }`}
            >
                {labels?.map((label) => (
                    <Label key={label?.id} label={label} />
                ))}
            </div>
            <MemoziedTimeline timeline={timeline} />
        </InsightSection>
    );
};

export default Labels;
