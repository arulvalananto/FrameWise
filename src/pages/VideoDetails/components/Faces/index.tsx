import { useSelector } from 'react-redux';
import React, { memo, useMemo } from 'react';

import Face from './Face';
import FaceDetails from './FaceDetails';
import MemoziedTimeline from '../Timeline';
// import InsightSection from '../InsightSection';
import { getTimelineInfo } from '../../../../common/helpers';
import { TimelineProps } from '../../../../interfaces/common';
import * as videoDetails from '../../../../store/reducers/videoDetails';
import MemoziedInsightSection from '../InsightSection';

const Faces: React.FC = () => {
    const { selectedInsight, insights } = useSelector(
        videoDetails.videoDetailsSelector
    );

    const timeline: TimelineProps[] = useMemo(() => {
        const faceInstances = selectedInsight?.face?.instances;
        return faceInstances
            ? faceInstances?.map((face) => getTimelineInfo(face))
            : [];
    }, [selectedInsight?.face?.instances]);

    if (!insights?.faces?.length) {
        return null;
    }

    return (
        <MemoziedInsightSection
            title="faces"
            count={insights?.faces?.length || 0}
        >
            <div className="flex flex-col w-full gap-4">
                <div className="flex flex-row flex-wrap items-center">
                    {insights?.faces?.map((face) => (
                        <Face face={face} key={face?.id} />
                    ))}
                </div>
                <FaceDetails />
                <MemoziedTimeline timeline={timeline} />
            </div>
        </MemoziedInsightSection>
    );
};

export default Faces;
