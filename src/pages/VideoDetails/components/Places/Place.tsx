import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    changeSelectedInsight,
    videoDetailsSelector,
} from '../../../../store/reducers/videoDetails';
import { NamedLocation } from '../../../../store/reducers/videoDetails/index.interface';

interface PlaceProps {
    namedLocation: NamedLocation;
}

const Place: React.FC<PlaceProps> = ({ namedLocation }) => {
    const dispatch = useDispatch();
    const { selectedInsight } = useSelector(videoDetailsSelector);

    const handleMoveToSpecificTime = () => {
        dispatch(
            changeSelectedInsight({
                key: 'namedLocation',
                value: namedLocation,
            })
        );
    };

    return (
        <div
            className={`px-2 py-1 rounded text-xs md:text-sm  cursor-pointer select-none ${
                namedLocation?.id === selectedInsight?.namedLocation?.id
                    ? 'bg-place text-black font-bold'
                    : ''
            }`}
            onClick={handleMoveToSpecificTime}
        >
            {namedLocation?.name}
        </div>
    );
};

const MemoziedPlace = React.memo(Place);
export default MemoziedPlace;
