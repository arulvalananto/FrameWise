import React, { useEffect, useState } from 'react';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getThumbnail } from '../../../api/helpers';
import constants from '../../../static/constants.json';
import { fancyTimeFormat, trimStr } from '../../../common/helpers';
import { VideoState } from '../../../store/reducers/videos/index.interface';

interface VideoProps {
    video: VideoState;
}

const Video: React.FC<VideoProps> = ({ video }) => {
    const { id, thumbnailId } = video;

    const [thumbnail, setThumbnail] = useState('');
    const [isThumbnailLoading, setIsThumbnailLoading] = useState(true);
    const [isDeleteProcessing, setIsDeleteProcessing] = useState(false);

    const handlePlayVideo = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log(event);
    };

    const handleDeleteVideo = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        console.log('delete', event);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await getThumbnail(id, thumbnailId);
                setThumbnail(response);
                setIsThumbnailLoading(false);
            } catch (error) {
                console.error(error);
                // toast.error(error?.message);
                setIsThumbnailLoading(false);
            }
        })();
    }, [id, thumbnailId]);

    return (
        <div
            className="col-span-1 relative cursor-pointer"
            onClick={handlePlayVideo}
        >
            <div className="w-full h-full bg-secondary rounded overflow-hidden border border-gray-900">
                <img
                    className="w-full h-full object-cover lg:max-h-60 xl:max-h-48 2xl:max-h-52"
                    src={`${constants.AZURE_VIDEO_INDEXER.IMAGE_URL_PREFIX}${thumbnail}`}
                    alt="thumb"
                />
            </div>
            <p className="bg-darkgrey absolute hidden sm:block text-xs lg:text-sm top-4 lg:top-2 left-2 bg-opacity-75 rounded px-2 py-1 cursor-default">
                {trimStr(video?.name)}
            </p>
            <button
                type="button"
                aria-label="delete video"
                className="bg-darkgrey absolute text-xs bg-opacity-75 rounded px-2 py-1 top-4 lg:top-2 right-2 hover:scale-95"
                onClick={handleDeleteVideo}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <p className="bg-darkgrey absolute text-xs lg:text-sm bottom-4 lg:bottom-2 font-cherry right-2 bg-opacity-75 rounded px-2 py-1 cursor-default">
                {fancyTimeFormat(video?.durationInSeconds)}
            </p>
        </div>
    );
};

export default Video;
