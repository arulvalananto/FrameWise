import { useSelector } from 'react-redux';
import React, { useMemo, useState } from 'react';

import Face from './components/Face';
import FaceDetails from './components/FaceDetails';
import MemoziedTimeline from '../Timeline';
import MemoziedInsightSection from '../InsightSection';
import constants from '../../../../static/constants.json';
import { getTimelineInfo } from '../../../../common/helpers';
import { TimelineProps } from '../../../../interfaces';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const Faces: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { selectedInsight, insights } = useSelector(videoDetailsSelector);

    const timeline: TimelineProps[] = useMemo(() => {
        const faceInstances = selectedInsight?.face?.instances;
        return faceInstances
            ? faceInstances?.map((face) => getTimelineInfo(face))
            : [];
    }, [selectedInsight?.face?.instances]);

    const facesLength = useMemo(
        () => insights?.faces?.length,
        [insights?.faces]
    );

    const handleIsExpanded = () => setIsExpanded(!isExpanded);

    if (!facesLength) {
        return null;
    }

    return (
        <MemoziedInsightSection
            title={constants.INSIGHTS.FACES}
            count={facesLength || 0}
            isExpanded={isExpanded}
            handleIsExpanded={handleIsExpanded}
        >
            <div className="flex flex-col w-full gap-4">
                <div
                    className={`flex flex-row flex-wrap items-center overflow-hidden ${
                        isExpanded ||
                        facesLength < constants.INSIGHTS.CONFIG.EXPAND_MAX_LIMIT
                            ? 'h-auto'
                            : 'h-8 md:h-12'
                    }`}
                >
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

const MemoziedFaces = React.memo(Faces);
export default MemoziedFaces;
