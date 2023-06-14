import { useSelector } from 'react-redux';
import React, { useMemo, useState } from 'react';

import Place from './Place';
import PlaceDetails from './PlaceDetails';
import MemoziedTimeline from '../Timeline';
import InsightSection from '../InsightSection';
import constants from '../../../../static/constants.json';
import { getTimelineInfo } from '../../../../common/helpers';
import { TimelineProps } from '../../../../interfaces/common';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const Places: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { selectedInsight, insights } = useSelector(videoDetailsSelector);

    const timeline: TimelineProps[] = useMemo(() => {
        const location = selectedInsight?.namedLocation;

        return location
            ? location?.instances?.map((instance) => getTimelineInfo(instance))
            : [];
    }, [selectedInsight?.namedLocation]);

    const handleIsExpanded = () => setIsExpanded(!isExpanded);

    if (!insights?.namedLocations?.length) {
        return null;
    }

    return (
        <InsightSection
            title={constants.INSIGHTS.PLACES}
            count={insights?.namedLocations?.length || 0}
            isExpanded={isExpanded}
            handleIsExpanded={handleIsExpanded}
        >
            <div className="flex flex-col w-full gap-5">
                <div
                    className={`flex flex-row flex-wrap items-center gap-2 overflow-hidden ${
                        isExpanded ||
                        insights?.namedLocations?.length <
                            constants.INSIGHTS.CONFIG.EXPAND_MAX_LIMIT
                            ? 'h-auto'
                            : 'h-6 md:h-10'
                    }`}
                >
                    {insights?.namedLocations?.map((namedLocation) => (
                        <Place
                            key={namedLocation?.id}
                            namedLocation={namedLocation}
                        />
                    ))}
                </div>
                <PlaceDetails />
                <MemoziedTimeline timeline={timeline} />
            </div>
        </InsightSection>
    );
};

export default Places;
