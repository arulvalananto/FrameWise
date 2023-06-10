import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import constants from '../../../static/constants.json';
import { getVideoAccessToken } from '../../../api/helpers';
import { getVideoPlayerURL } from '../../../common/helpers';
import { videoDetailsSelector } from '../../../store/reducers/videoDetails';

const VideoPlayer: React.FC = () => {
    const [videoAccessToken, setVideoAccessToken] = useState<string>('');

    const { currentStartTime, videoDetails } =
        useSelector(videoDetailsSelector);

    const videoURL = useMemo(
        () =>
            videoDetails?.id
                ? getVideoPlayerURL(videoDetails?.id, videoAccessToken)
                : '',
        [videoAccessToken, videoDetails?.id]
    );

    const moveToSpecificTime = useCallback(() => {
        try {
            if (currentStartTime) {
                const videoPlayerFrame: any = document.getElementById(
                    constants.VIDEO_PLAYER_ID
                );

                const payload = {
                    time: currentStartTime,
                    origin: 'https://www.videoindexer.ai',
                };
                if (
                    'postMessage' in window &&
                    videoPlayerFrame &&
                    videoPlayerFrame.contentWindow
                ) {
                    videoPlayerFrame.contentWindow.postMessage(
                        payload,
                        payload.origin
                    );
                }
            }
        } catch (error) {
            toast.error(constants.ERROR_MESSAGE.VIDEO_NEXT_MOVE);
        }
    }, [currentStartTime]);

    useEffect(() => moveToSpecificTime(), [moveToSpecificTime]);

    useEffect(() => {
        (async () => {
            try {
                if (videoDetails?.id) {
                    const response = await getVideoAccessToken(
                        videoDetails?.id
                    );
                    setVideoAccessToken(response);
                }
            } catch (error) {
                toast.error(
                    constants.ERROR_MESSAGE.VIDEO_TOKEN_AUTHENTICATION_FAILED
                );
            }
        })();
    }, [videoDetails?.id]);

    return (
        <div className="p-2 w-full h-full flex flex-col gap-3">
            <div className="w-full h-[250px] sm:h-[350px] md:h-[300px] lg:h-[450px] xl:h-[600px]">
                <iframe
                    id={constants.VIDEO_PLAYER_ID}
                    src={videoURL}
                    allowFullScreen
                    allow="autoplay"
                    className="w-full h-full object-contain rounded"
                    title="player"
                ></iframe>
            </div>
            <div className="flex flex-col gap-2">
                <h5 className="text-sm md:text-base xl:text-2xl font-bold">
                    {videoDetails?.name}
                </h5>
                <p className="text-gray-500 text-xs md:text-sm xl:text-base">
                    Created by: {videoDetails?.userName}
                </p>
            </div>
        </div>
    );
};

export default VideoPlayer;
