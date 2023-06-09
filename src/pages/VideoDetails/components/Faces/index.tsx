import { useSelector } from 'react-redux';
import React, { memo, useMemo } from 'react';

import Face from './Face';
import FaceDetails from './FaceDetails';
// import InsightSection from '../InsightSection';
// import HorizontalTimeline from '../HorizontalTimeline';
// import { getTimelineInfo } from '../../../../common/helpers';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const Faces: React.FC = () => {
    const { selectedInsight, insights } = useSelector(videoDetailsSelector);

    // const timeline = useMemo(
    //     () =>
    //         selectedInsight?.face?.instances?.map((face) =>
    //             getTimelineInfo(face)
    //         ),
    //     [selectedInsight?.face?.instances]
    // );

    if (!insights?.faces?.length) {
        return null;
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row flex-wrap">
                {insights?.faces?.map((face) => (
                    <Face face={face} key={face?.id} />
                ))}
            </div>
            <FaceDetails />
        </div>
    );
};

export default Faces;
