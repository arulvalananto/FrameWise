import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';

import { AppDispatch } from '../../../store';
import constants from '../../../static/constants.json';
import { fancyTimeFormat, trimStr } from '../../../common/helpers';
import { VideoState } from '../../../store/reducers/videos/index.interface';
import { fetchAllVideos } from '../../../store/reducers/videos/index.thunk';
import MemoziedConfirmationModal from '../../../components/DeleteConfirmationModal';
import MemoziedCircularProgress from '../../../components/CircularProgressWithLabel';
import {
    deleteByVideoId,
    updateVideoProcessingState,
} from '../../../store/reducers/videos';
import {
    deleteVideo,
    getAllVideos,
    getThumbnail,
    reIndexVideo,
} from '../../../api/videos';

interface VideoProps {
    video: VideoState;
}

const Video: React.FC<VideoProps> = ({ video }) => {
    const { isAuthenticated } = useAuth0();
    const { id, thumbnailId, processingProgress, state, name } = video;

    const shouldRender = useRef(true);
    const [thumbnail, setThumbnail] = useState('');
    const [isDeleteProcessing, setIsDeleteProcessing] = useState(false);
    const [isReIndexing, setIsReIndexing] = useState(true);
    const [invalidImageURLError, setInvalidImageURLError] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const isProcessedVideo = useMemo(
        () => state?.toLowerCase() === constants.VIDEOS.VIDEO_PROCESSED,
        [state]
    );

    const handlePlayVideo = (): void => {
        if (!isProcessedVideo) return;
        navigate(`/library/${id}`);
    };

    const handleInvalidImageURLError = (): void => {
        setInvalidImageURLError(true);
    };

    const handleDeleteVideo = async (
        event: React.MouseEvent<HTMLButtonElement>
    ): Promise<void> => {
        event.stopPropagation();
        try {
            if (isProcessedVideo && isAuthenticated) {
                setIsDeleteProcessing(true);
                await deleteVideo(id);
                dispatch(deleteByVideoId({ videoId: id }));
                toast.success(constants.SUCCESS_MESSAGE.VIDEO_DELETED);
            } else if (!isAuthenticated) {
                toast.error(constants.ERROR_MESSAGE.GUEST_RESTRICTION);
            }
            setIsDeleteProcessing(false);
        } catch (error: unknown) {
            setIsDeleteProcessing(false);
            if (error instanceof Error) toast.error(error?.message);
            else if (error instanceof AxiosError)
                toast.error(error?.response?.data?.message);
        }
    };

    const handleReIndexVideo = async (
        event: React.MouseEvent<HTMLButtonElement | HTMLOrSVGElement>
    ): Promise<void> => {
        event?.stopPropagation();
        try {
            if (isProcessedVideo && isAuthenticated) {
                setIsReIndexing(true);
                const response = await reIndexVideo(video.id);
                if (response === 'ok') {
                    toast.success(constants.SUCCESS_MESSAGE.REINDEX_INITIATED);
                    dispatch(fetchAllVideos());
                }
                setIsReIndexing(false);
            } else if (!isAuthenticated) {
                toast.error(constants.ERROR_MESSAGE.GUEST_RESTRICTION);
            }
        } catch (error: unknown) {
            setIsReIndexing(false);
            if (error instanceof Error) toast.error(error?.message);
            else if (error instanceof AxiosError)
                toast.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        (async () => {
            if (shouldRender.current) {
                shouldRender.current = false;
                try {
                    const response = await getThumbnail(id, thumbnailId);
                    setThumbnail(response);
                    setInvalidImageURLError(false);
                } catch (error: unknown) {
                    if (error instanceof Error) toast.error(error?.message);
                    else if (error instanceof AxiosError)
                        toast.error(error?.response?.data?.message);
                    setInvalidImageURLError(true);
                }
            }
        })();
    }, [id, thumbnailId]);

    useEffect(() => {
        const intervalId: string | number | NodeJS.Timeout | undefined =
            setInterval(async () => {
                try {
                    if (!isProcessedVideo) {
                        const videos: VideoState[] = await getAllVideos();
                        const currentVideoState: VideoState | undefined =
                            videos?.find((vid) => vid.id === id);

                        dispatch(
                            updateVideoProcessingState({
                                videoId: id,
                                videoProcessingState:
                                    currentVideoState?.processingProgress,
                                videoState: currentVideoState?.state,
                                thumbnailId: currentVideoState?.thumbnailId,
                            })
                        );

                        if (!thumbnail && currentVideoState?.thumbnailId) {
                            const response = await getThumbnail(
                                id,
                                currentVideoState?.thumbnailId
                            );
                            setThumbnail(response);
                        }
                    } else {
                        clearInterval(intervalId);
                    }
                } catch (error: unknown) {
                    if (error instanceof Error) toast.error(error?.message);
                    else if (error instanceof AxiosError)
                        toast.error(error?.response?.data?.message);
                }
            }, constants.VIDEOS.VIDEO_PROCESSING_API_CALL);

        return () => clearInterval(intervalId);
    }, [dispatch, thumbnail, id, isProcessedVideo]);

    return (
        <div
            className="col-span-1 relative cursor-pointer"
            onClick={handlePlayVideo}
        >
            <div className="w-full h-full bg-secondary rounded overflow-hidden border border-gray-900">
                {!invalidImageURLError && (
                    <img
                        className="w-full h-full object-cover lg:max-h-60 xl:max-h-48 2xl:max-h-52"
                        src={`${constants.AZURE_VIDEO_INDEXER.IMAGE_URL_PREFIX}${thumbnail}`}
                        alt={trimStr(name)}
                        onError={handleInvalidImageURLError}
                    />
                )}
            </div>
            <Tooltip title={name} placement="top" arrow>
                <p className="bg-darkgrey absolute hidden sm:block text-xs lg:text-sm top-4 lg:top-2 left-2 bg-opacity-75 rounded px-2 py-1 cursor-default">
                    {trimStr(name)}
                </p>
            </Tooltip>
            {isProcessedVideo ? (
                <>
                    <MemoziedConfirmationModal
                        title="Delete"
                        handleSubmit={handleDeleteVideo}
                        buttonIcon={faTrashCan}
                        disabled={!isProcessedVideo}
                        isDeleteProcessing={isDeleteProcessing}
                    />
                    <p className="bg-darkgrey absolute text-xs lg:text-sm bottom-4 lg:bottom-2 font-cherry right-2 bg-opacity-75 rounded px-2 py-1 cursor-default">
                        {fancyTimeFormat(video?.durationInSeconds)}
                    </p>
                    <button
                        type="button"
                        onClick={handleReIndexVideo}
                        disabled={isReIndexing}
                        className="bg-darkgrey absolute text-xs bg-opacity-75 rounded px-2 py-1 top-4 lg:top-2 right-12 hover:scale-95 cursor-pointer"
                    >
                        <Tooltip title="Re-index">
                            <FontAwesomeIcon
                                icon={faRecycle}
                                onClick={handleReIndexVideo}
                            />
                        </Tooltip>
                    </button>
                </>
            ) : (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col">
                    <MemoziedCircularProgress
                        value={parseInt(processingProgress)}
                    />
                    {constants.VIDEOS.VIDEO_INDEXING_MESSAGE}
                </div>
            )}
        </div>
    );
};

const MemoziedVideo = memo(Video);
export default MemoziedVideo;
