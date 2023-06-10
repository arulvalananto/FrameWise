import { useSelector } from 'react-redux';
import React, { useMemo, useState } from 'react';

import Mention from './Mention';
import MemoziedTimeline from '../Timeline';
import MentionDetails from './MentionDetails';
import InsightSection from '../InsightSection';
import constants from '../../../../static/constants.json';
import { getTimelineInfo } from '../../../../common/helpers';
import { TimelineProps } from '../../../../interfaces/common';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const Mentions: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { insights, selectedInsight } = useSelector(videoDetailsSelector);

    const timeline: TimelineProps[] = useMemo(() => {
        const mention = selectedInsight?.namedPerson;
        return mention
            ? mention?.instances?.map((instance) => getTimelineInfo(instance))
            : [];
    }, [selectedInsight?.namedPerson]);

    const handleIsExpanded = () => setIsExpanded(!isExpanded);

    if (!insights?.namedPeople?.length) {
        return null;
    }

    return (
        <InsightSection
            title="mentions"
            count={insights?.namedPeople?.length}
            isExpanded={isExpanded}
            handleIsExpanded={handleIsExpanded}
        >
            <div className="flex flex-col w-full gap-4">
                <div
                    className={`flex flex-row flex-wrap gap-2 overflow-hidden ${
                        isExpanded ||
                        insights?.namedPeople?.length <
                            constants.EXPAND_MAX_LIMIT
                            ? 'h-auto'
                            : 'h-7'
                    }`}
                >
                    {insights?.namedPeople?.map((mention) => (
                        <Mention key={mention?.id} mention={mention} />
                    ))}
                </div>
                <MentionDetails />
                <MemoziedTimeline timeline={timeline} />
            </div>
        </InsightSection>
    );
};

export default Mentions;
