import React, { useMemo } from 'react';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    changeSelectedInsight,
    videoDetailsSelector,
} from '../../../../store/reducers/videoDetails';
import MemoziedRedirectLink from '../../../../components/RedirectLink';
import { Topic } from '../../../../store/reducers/videoDetails/index.interface';

interface TopicProps {
    topic: Topic;
}

const Topic: React.FC<TopicProps> = ({ topic }) => {
    const dispatch = useDispatch();
    const { selectedInsight } = useSelector(videoDetailsSelector);

    const handleMoveToSpecificTime = () => {
        dispatch(changeSelectedInsight({ key: 'topic', value: topic }));
    };

    const category = useMemo(() => {
        const formattedTopic: string[] | undefined =
            topic?.referenceId?.split('/');
        return formattedTopic?.length && formattedTopic.length > 1
            ? formattedTopic[0]
            : '';
    }, [topic]);

    return (
        <div
            className={`px-2 py-1 text-sm rounded cursor-pointer select-none flex items-center gap-1 ${
                topic?.id === selectedInsight?.topic?.id
                    ? 'bg-topic text-black font-bold'
                    : ''
            }`}
            onClick={handleMoveToSpecificTime}
        >
            {category ? (
                <>
                    <span> {category}</span>
                    <span>/</span>
                </>
            ) : null}
            <div className="flex items-center gap-2">
                <span>{topic?.name}</span>
                {topic?.referenceUrl &&
                topic?.id === selectedInsight?.topic?.id ? (
                    <>
                        <span>|</span>
                        <MemoziedRedirectLink href={topic?.referenceUrl}>
                            <Tooltip title="Learn more" placement='top' arrow>
                                <FontAwesomeIcon icon={faLink} />
                            </Tooltip>
                        </MemoziedRedirectLink>
                    </>
                ) : null}
            </div>
        </div>
    );
};

const MemoziedTopic = React.memo(Topic);
export default MemoziedTopic;
