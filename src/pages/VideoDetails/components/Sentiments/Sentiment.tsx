import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sentimentColors } from '../../../../static/data';
import MemoziedCircularProgress from '../../../../components/CircularProgress';
import { Sentiment } from '../../../../store/reducers/videoDetails/index.interface';
import {
    changeSelectedInsight,
    videoDetailsSelector,
} from '../../../../store/reducers/videoDetails';

type SentimentProps = {
    sentiment: Sentiment;
    index: number;
};

const Sentiment: React.FC<SentimentProps> = ({ sentiment, index }) => {
    const dispatch = useDispatch();
    const { selectedInsight } = useSelector(videoDetailsSelector);

    const handleMoveToSpecificTime = () => {
        dispatch(
            changeSelectedInsight({
                key: 'sentiment',
                value: sentiment,
            })
        );
    };

    return (
        <div
            className={`flex flex-col gap-3 items-center cursor-pointer text-${sentimentColors[index]}`}
            onClick={handleMoveToSpecificTime}
        >
            <MemoziedCircularProgress
                value={sentiment.averageScore * 100}
                color="inherit"
            />
            <p
                className={`text-xs ${
                    sentiment?.id === selectedInsight?.sentiment?.id
                        ? 'underline underline-offset-2'
                        : ''
                }`}
            >
                {sentiment?.sentimentType}
            </p>
        </div>
    );
};

export default Sentiment;
