import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    changeSelectedInsight,
    videoDetailsSelector,
} from '../../../../store/reducers/videoDetails';
import { NamedPerson } from '../../../../store/reducers/videoDetails/index.interface';

interface MentionProps {
    mention: NamedPerson;
}

const Mention: React.FC<MentionProps> = ({ mention }) => {
    const dispatch = useDispatch();
    const {
        selectedInsight: { namedPerson },
    } = useSelector(videoDetailsSelector);

    const handleMoveToSpecificTime = () => {
        dispatch(changeSelectedInsight({ key: 'namedPerson', value: mention }));
    };

    return (
        <div
            className={`px-2 py-1 rounded text-sm cursor-pointer select-none ${
                mention?.id === namedPerson?.id
                    ? 'bg-black text-white font-bold'
                    : ''
            }`}
            onClick={handleMoveToSpecificTime}
        >
            {mention?.name}
        </div>
    );
};

const MemoziedMention = memo(Mention);
export default MemoziedMention;
