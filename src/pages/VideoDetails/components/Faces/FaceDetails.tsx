import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getSeenDuration } from '../../../../common/helpers';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const FaceDetails: React.FC = () => {
    const {
        videoDetails,
        selectedInsight: { face },
    } = useSelector(videoDetailsSelector);

    const seenDuration = useMemo(
        () => getSeenDuration(face?.instances, videoDetails?.durationInSeconds),
        [face?.instances, videoDetails?.durationInSeconds]
    );

    return (
        <div className="flex gap-4 items-center mt-2">
            <div>
                <h4 className="text-xl">{face?.name}</h4>
                <p className="text-xs">
                    Appears in {seenDuration?.toFixed(2)}% of video
                </p>
            </div>
        </div>
    );
};

export default FaceDetails;
