import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import {
    changeSelectedInsight,
    videoDetailsSelector,
} from '../../../../../store/reducers/videoDetails';
import { emotions } from '../../../../../static/data';
import useIsMobile from '../../../../../hooks/useIsMobile';

const EmotionsChart: React.FC = () => {
    const dispatch = useDispatch();
    const { videoDetails, insights, selectedInsight } =
        useSelector(videoDetailsSelector);

    const isMobile = useIsMobile();

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
                const { color, icon, textColor } =
                    emotions[emotionType.toLowerCase()];

                const fixedPercent = percent.toFixed(2);
                return (
                    <div
                        className="flex flex-col gap-3 items-center cursor-pointer"
                        key={emotionType}
                        onClick={() => handleChangeCurrentEmotion(emotionType)}
                    >
                        <p
                            className={`text-sm capitalize ${
                                emotionType === selectedInsight.emotion?.type
                                    ? `underline underline-offset-2 ${textColor} font-bold`
                                    : ''
                            }`}
                        >
                            {emotionType}
                        </p>
                        <div
                            className={`w-12 h-12 md:w-20 md:h-20 transition-all ${
                                emotionType === selectedInsight.emotion?.type
                                    ? `scale-110`
                                    : ''
                            }`}
                        >
                            <CircularProgressbarWithChildren
                                value={+fixedPercent}
                                styles={buildStyles({
                                    strokeLinecap: 'round',
                                    textSize: isMobile ? '8px' : '16px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: 'white',
                                    trailColor: 'transparent',
                                    textColor: 'white',
                                    backgroundColor: color ? color : 'white',
                                })}
                                background
                                backgroundPadding={6}
                            >
                                <span className="text-xs md:text-xl hover:scale-105 transition-all">
                                    {icon}
                                </span>
                                <div style={{ fontSize: isMobile ? 8 : 12 }}>
                                    <strong>{fixedPercent}%</strong>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const MemoziedEmotionChart = React.memo(EmotionsChart);
export default MemoziedEmotionChart;
