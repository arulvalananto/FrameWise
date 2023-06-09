import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';

import Brand from './Brand';
import BrandDetails from './BrandDetails';
import InsightSection from '../InsightSection';
import { getTimelineInfo } from '../../../../common/helpers';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';
import MemoziedTimeline from '../Timeline';
import { TimelineProps } from '../../../../interfaces/common';

const Brands: React.FC = () => {
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

    if (!insights?.brands?.length) {
        return null;
    }

    return (
        <InsightSection title="brands" count={insights?.brands?.length || 0}>
            <div className="flex flex-col w-full gap-4">
                <div className="flex flex-row flex-wrap gap-2">
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
