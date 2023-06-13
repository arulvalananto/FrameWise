import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useEffect, useState } from 'react';

import constants from '../../../../static/constants.json';
import { getThumbnail } from '../../../../api/helpers';
import {
    changeSelectedInsight,
    videoDetailsSelector,
} from '../../../../store/reducers/videoDetails';
import { Face } from '../../../../store/reducers/videoDetails/index.interface';

interface FaceProps {
    face: Face;
}

const Face: React.FC<FaceProps> = ({ face }) => {
    const [thumbnail, setThumbnail] = useState<string>('');
    const [isThumbnailLoading, setIsThumbnailLoading] = useState(true);

    const dispatch = useDispatch();
    const { videoDetails, selectedInsight } = useSelector(videoDetailsSelector);

    const handleMoveToSpecificTime = () => {
        dispatch(changeSelectedInsight({ key: 'face', value: face }));
    };

    useEffect(() => {
        (async () => {
            try {
                if (videoDetails?.id) {
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
        <div className="" onClick={handleMoveToSpecificTime}>
            <div
                className={`w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full p-1 transition-all ${
                    selectedInsight?.face?.id === face?.id
                        ? 'border-2 border-primary'
                        : ''
                }`}
            >
                {!isThumbnailLoading ? (
                    <img
                        className="object-cover w-full h-full rounded-full"
                        src={`${constants.IMAGE_URL_PREFIX}${thumbnail}`}
                        alt="thumb"
                    ></img>
                ) : null}
            </div>
        </div>
    );
};

const MemoziedFace = memo(Face);
export default MemoziedFace;
