import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import {
    changeSelectedInsight,
    videoDetailsSelector,
} from '../../../../store/reducers/videoDetails';
import { emotionsColors } from '../../../../static/data';

const EmotionsChart: React.FC = () => {
    const dispatch = useDispatch();
    const { videoDetails, insights, selectedInsight } =
        useSelector(videoDetailsSelector);

    const handleChangeCurrentEmotion = (emotionType: string): void => {
        if (emotionType) {
            const currentEmotion = insights?.emotions?.find(
                (key) => key.type === emotionType
            );

            if (currentEmotion) {
                dispatch(
                    changeSelectedInsight({
                        key: 'emotion',
                        value: currentEmotion,
                    })
                );
            }
        }
    };

    if (!videoDetails.summarizedInsights?.emotions) {
        return null;
    }

    return (
        <div className="flex flex-row gap-8 md:gap-10 justify-center">
            {videoDetails.summarizedInsights?.emotions.map((emotion) => {
                const percent = emotion?.seenDurationRatio
                    ? emotion?.seenDurationRatio * 100
                    : 0;
                const emotionType = emotion?.type;
                const color = emotionsColors[emotionType.toLowerCase()];

                const fixedPercent = parseInt(percent.toFixed(2));
                return (
                    <div
                        className="flex flex-col gap-3 items-center cursor-pointer"
                        key={emotionType}
                        onClick={() => handleChangeCurrentEmotion(emotionType)}
                    >
                        <p
                            className={`text-sm capitalize ${
                                emotionType === selectedInsight.emotion?.type
                                    ? 'underline underline-offset-2'
                                    : ''
                            }`}
                        >
                            {emotionType}
                        </p>
                        <div className="w-10 h-10 md:w-20 md:h-20">
                            <CircularProgressbar
                                value={fixedPercent}
                                text={`${fixedPercent}%`}
                                styles={buildStyles({
                                    strokeLinecap: 'butt',
                                    textSize: '16px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: color,
                                    trailColor: 'white',
                                    textColor: 'white',
                                })}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const MemoziedEmotionChart = React.memo(EmotionsChart);
export default MemoziedEmotionChart;
