import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import MemoziedTimeline from '../Timeline';
import MemoziedInsightSection from '../InsightSection';
import constants from '../../../../static/constants.json';
import { getTimelineInfo } from '../../../../common/helpers';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const Keywords: React.FC = () => {
    const { selectedInsight, insights } = useSelector(videoDetailsSelector);

    const timeline = useMemo(() => {
        const keyword = selectedInsight?.keyword;
        return keyword
            ? keyword?.instances?.map((instance) => getTimelineInfo(instance))
            : [];
    }, [selectedInsight?.keyword]);

    if (!insights?.keywords?.length) {
        return null;
    }

    return (
        <MemoziedInsightSection
            title={constants.INSIGHTS.KEYWORDS}
            count={insights?.keywords?.length}
            showExpand={false}
        >
            <div className="flex flex-col w-full gap-5">
                <MemoziedTimeline timeline={timeline} />
            </div>
        </MemoziedInsightSection>
    );
};

export default Keywords;
