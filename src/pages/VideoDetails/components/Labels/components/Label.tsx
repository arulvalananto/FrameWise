import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    changeSelectedInsight,
    videoDetailsSelector,
} from '../../../../../store/reducers/videoDetails';
import { Label } from '../../../../../store/reducers/videoDetails/index.interface';

type LabelProps = {
    label: Label;
};

const Label: React.FC<LabelProps> = ({ label }) => {
    const dispatch = useDispatch();
    const { selectedInsight } = useSelector(videoDetailsSelector);

    const handleMoveToSpecificTime = () => {
        dispatch(changeSelectedInsight({ key: 'label', value: label }));
    };

    return (
        <div
            className={`px-3 py-1 text-xs md:text-sm rounded-3xl border border-gray-300 cursor-pointer select-none ${
                label?.id === selectedInsight.label?.id
                    ? 'bg-gray-300 text-black'
                    : ''
            }`}
            onClick={handleMoveToSpecificTime}
        >
            {label?.name}
        </div>
    );
};

const MemoziedLabel = React.memo(Label);
export default MemoziedLabel;
