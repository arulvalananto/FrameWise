import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    changeSelectedInsight,
    videoDetailsSelector,
} from '../../../../../store/reducers/videoDetails';
import { NamedPerson } from '../../../../../store/reducers/videoDetails/index.interface';

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
        <p
            className={`px-2 py-1 rounded text-xs md:text-sm cursor-pointer select-none flex gap-2 ${
                mention?.id === namedPerson?.id
                    ? 'bg-mention text-white font-bold'
                    : ''
            }`}
            onClick={handleMoveToSpecificTime}
        >
            {mention?.name}
        </p>
    );
};

const MemoziedMention = memo(Mention);
export default MemoziedMention;
