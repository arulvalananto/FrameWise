import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { faRecycle, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';

import './index.css';
import { AppDispatch } from '../../../../store';
import constants from '../../../../static/constants.json';
import { fancyTimeFormat, trimStr } from '../../../../common/helpers';
import { VideoState } from '../../../../store/reducers/videos/index.interface';
import { fetchAllVideos } from '../../../../store/reducers/videos/index.thunk';
import MemoziedConfirmationModal from '../../../../components/DeleteConfirmationModal';
import MemoziedCircularProgress from '../../../../components/CircularProgressWithLabel';
import {
    deleteByVideoId,
    updateVideoProcessingState,
} from '../../../../store/reducers/videos';
import {
    deleteVideo,
    getAllVideos,
    getThumbnail,
    reIndexVideo,
} from '../../../../api/videos';

interface VideoProps {
    video: VideoState;
}

const Video: React.FC<VideoProps> = ({ video }) => {
    const { isAuthenticated } = useAuth0();
    const { id, thumbnailId, processingProgress, state, name } = video;

    const shouldRender = useRef(true);
    const [thumbnail, setThumbnail] = useState('');
    const [isDeleteProcessing, setIsDeleteProcessing] = useState(false);
    const [isReIndexing, setIsReIndexing] = useState(false);
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
        try {
            event.stopPropagation();
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
        try {
            event.stopPropagation();
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
        <div className="video" onClick={handlePlayVideo}>
            <div className="video-image-container">
                {!invalidImageURLError && (
                    <img
                        className="video-image"
                        src={`${constants.AZURE_VIDEO_INDEXER.IMAGE_URL_PREFIX}${thumbnail}`}
                        alt={trimStr(name)}
                        onError={handleInvalidImageURLError}
                    />
                )}
            </div>
            <Tooltip title={name} placement="top" arrow>
                <p className="video-title">{trimStr(name)}</p>
            </Tooltip>
            {isProcessedVideo ? (
                <>
                    <p className="video-length">
                        {fancyTimeFormat(video?.durationInSeconds)}
                    </p>
                    <MemoziedConfirmationModal
                        title="Delete"
                        handleSubmit={handleDeleteVideo}
                        buttonIcon={faTrashCan}
                        disabled={!isProcessedVideo}
                        isDeleteProcessing={isDeleteProcessing}
                    />
                    <MemoziedConfirmationModal
                        title="Re-Index"
                        message={constants.MESSAGE.REINDEX_PROMPT_DEFAULT}
                        cancelText="no"
                        submitText="yes"
                        handleSubmit={handleReIndexVideo}
                        buttonIcon={faRecycle}
                        disabled={!isProcessedVideo}
                        isDeleteProcessing={isReIndexing}
                        className="video-reIndex-button"
                    />
                </>
            ) : (
                <div className="video-circular-progress">
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
