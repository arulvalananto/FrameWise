import { useSelector } from 'react-redux';
import React, { useMemo, useState } from 'react';

import Brand from './Brand';
import BrandDetails from './BrandDetails';
import MemoziedTimeline from '../Timeline';
import InsightSection from '../InsightSection';
import constants from '../../../../static/constants.json';
import { getTimelineInfo } from '../../../../common/helpers';
import { TimelineProps } from '../../../../interfaces/common';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const Brands: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const {
        selectedInsight: { brand },
        insights,
    } = useSelector(videoDetailsSelector);

    const timeline: TimelineProps[] = useMemo(
        () =>
            brand?.instances
                ? brand?.instances?.map((instance) => getTimelineInfo(instance))
                : [],
        [brand?.instances]
    );

    const handleIsExpanded = () => setIsExpanded(!isExpanded);

    if (!insights?.brands?.length) {
        return null;
    }

    return (
        <InsightSection
            title={constants.INSIGHTS.BRANDS}
            count={insights?.brands?.length || 0}
            isExpanded={isExpanded}
            handleIsExpanded={handleIsExpanded}
        >
            <div className="flex flex-col w-full gap-5">
                <div
                    className={`flex flex-row flex-wrap gap-2 overflow-hidden ${
                        isExpanded ||
                        insights.brands.length < constants.EXPAND_MAX_LIMIT
                            ? 'h-auto'
                            : 'h-6 md:h-9'
                    }`}
                >
                    {insights?.brands?.map((brand) => (
                        <Brand key={brand?.name} brand={brand} />
                    ))}
                </div>
                <BrandDetails />
                <MemoziedTimeline timeline={timeline} />
            </div>
        </InsightSection>
    );
};

export default Brands;
