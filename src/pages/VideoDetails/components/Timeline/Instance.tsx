import { Tooltip } from '@mui/material';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    changeStartTime,
    videoDetailsSelector,
} from '../../../../store/reducers/videoDetails';
import { TimelineProps } from '../../../../interfaces/common';
import { getVideoSpecificTime } from '../../../../common/helpers';

interface TimeInstanceProps {
    time: TimelineProps;
}

const Instance: React.FC<TimeInstanceProps> = ({ time }) => {
    const dispatch = useDispatch();
    const { currentStartTime, videoDetails } =
        useSelector(videoDetailsSelector);

    const width = useMemo(
        () =>
            videoDetails?.durationInSeconds
                ? (time?.width / videoDetails?.durationInSeconds) * 100
                : 0,
        [videoDetails?.durationInSeconds, time?.width]
    );

    const xStartingPoint = useMemo(
        () =>
            videoDetails?.durationInSeconds
                ? (time?.start / videoDetails?.durationInSeconds) * 100
                : 0,
        [videoDetails?.durationInSeconds, time?.start]
    );

    const handleMoveToSpecificTime = () => {
        const newTime = getVideoSpecificTime(time?.start, currentStartTime);
        dispatch(changeStartTime({ time: newTime }));
    };

    return (
        <Tooltip title={time?.period || ''} placement="top" arrow>
            <rect
                onClick={handleMoveToSpecificTime}
                width={`${width}%`}
                height="12"
                x={`${xStartingPoint}%`}
                y="5"
                className="transition item cursor-pointer"
            ></rect>
        </Tooltip>
    );
};

const MemoziedInstance = React.memo(Instance);  
export default MemoziedInstance;
