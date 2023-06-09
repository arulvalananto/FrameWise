import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { getThumbnail } from '../../../../../api/videos';
import constants from '../../../../../static/constants.json';
import { getSeenDuration } from '../../../../../common/helpers';
import { videoDetailsSelector } from '../../../../../store/reducers/videoDetails';

const FaceDetails: React.FC = () => {
    const [thumbnail, setThumbnail] = useState<string>('');
    const [isThumbnailLoading, setIsThumbnailLoading] = useState(true);

    const {
        videoDetails,
        selectedInsight: { face },
    } = useSelector(videoDetailsSelector);

    const seenDuration = useMemo(
        () => getSeenDuration(face?.instances, videoDetails?.durationInSeconds),
        [face?.instances, videoDetails?.durationInSeconds]
    );

    useEffect(() => {
        (async () => {
            try {
                if (videoDetails?.id && face?.thumbnailId) {
                    const response = await getThumbnail(
                        videoDetails?.id,
                        face?.thumbnailId
                    );
                    setThumbnail(response);
                    setIsThumbnailLoading(false);
                }
            } catch (err) {
                setIsThumbnailLoading(false);
            }
        })();
    }, [face?.thumbnailId, videoDetails?.id]);

    return (
        <div className="flex gap-4 items-center mt-2 transition-all">
            <div
                className={`w-[50px] h-[50px] md:w-[100px] md:h-[100px] rounded-full p-1`}
            >
                {!isThumbnailLoading ? (
                    <img
                        className="object-cover w-full h-full rounded-full"
                        src={`${constants.AZURE_VIDEO_INDEXER.IMAGE_URL_PREFIX}${thumbnail}`}
                        alt="thumb"
                    ></img>
                ) : null}
            </div>
            <div>
                <h4 className="text-base md:text-xl">{face?.name}</h4>
                <p className="text-xs">
                    Appears in {seenDuration?.toFixed(2)}% of video
                </p>
            </div>
        </div>
    );
};

const MemoziedFaceDetails = React.memo(FaceDetails);
export default MemoziedFaceDetails;
