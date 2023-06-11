import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo, useState } from 'react';

import MemoziedTimeline from '../Timeline';
import MemoziedInsightSection from '../InsightSection';
import constants from '../../../../static/constants.json';
import { getTimelineInfo } from '../../../../common/helpers';
import {
    changeSelectedInsight,
    videoDetailsSelector,
} from '../../../../store/reducers/videoDetails';
import EmotionsChart from './EmotionsChart';
import CustomSelect from '../../../../components/CustomSelect';

const Emotions: React.FC = () => {
    const dispatch = useDispatch();
    const { selectedInsight, insights } = useSelector(videoDetailsSelector);

    const [selectedEmotion, setSelectedEmotion] = useState<string>(
        selectedInsight.emotion ? selectedInsight.emotion.type : ''
    );

    const timeline = useMemo(() => {
        const emotion = selectedInsight?.emotion;
        return emotion
            ? emotion?.instances?.map((instance) => getTimelineInfo(instance))
            : [];
    }, [selectedInsight?.emotion]);

    const handleChangeEmotion = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { value: emotionType } = event.target;
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
                setSelectedEmotion(emotionType);
            }
        }
    };

    if (!insights?.emotions?.length) {
        return null;
    }
    return (
        <MemoziedInsightSection
            title={constants.INSIGHTS.EMOTIONS}
            count={insights?.emotions?.length}
            showExpand={false}
        >
            <div className="flex flex-col w-full gap-5">
                <EmotionsChart />
                <div className="flex flex-row items-center gap-3">
                    {insights?.keywords && (
                        <CustomSelect
                            value={selectedEmotion}
                            onChange={handleChangeEmotion}
                            options={insights?.emotions}
                        />
                    )}
                    <p className="text-xs">
                        {selectedInsight?.emotion?.instances?.length} Occurences
                    </p>
                </div>
                <MemoziedTimeline timeline={timeline} />
            </div>
        </MemoziedInsightSection>
    );
};

export default Emotions;
