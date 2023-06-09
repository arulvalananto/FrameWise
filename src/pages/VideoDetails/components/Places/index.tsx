import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Place from './Place';
import MemoziedTimeline from '../Timeline';
import InsightSection from '../InsightSection';
import { getTimelineInfo } from '../../../../common/helpers';
import { TimelineProps } from '../../../../interfaces/common';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const Places: React.FC = () => {
    const { selectedInsight, insights } = useSelector(videoDetailsSelector);

    const timeline: TimelineProps[] = useMemo(() => {
        const location = selectedInsight?.namedLocation;

        return location
            ? location?.instances?.map((instance) => getTimelineInfo(instance))
            : [];
    }, [selectedInsight?.namedLocation]);

    if (!insights?.namedLocations?.length) {
        return null;
    }

    return (
        <InsightSection
            title="places"
            count={insights?.namedLocations?.length || 0}
        >
            {insights?.namedLocations?.map((namedLocation) => (
                <Place key={namedLocation?.id} namedLocation={namedLocation} />
            ))}
            <MemoziedTimeline timeline={timeline} />
        </InsightSection>
    );
};

export default Places;
