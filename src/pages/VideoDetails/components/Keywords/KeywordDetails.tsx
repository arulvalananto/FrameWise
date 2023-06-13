import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MemoziedWordCloud from './WordCloud';
import {
    changeSelectedInsight,
    videoDetailsSelector,
} from '../../../../store/reducers/videoDetails';
import CustomSelect from '../../../../components/CustomSelect';

const KeywordDetails: React.FC = () => {
    const { insights, selectedInsight } = useSelector(videoDetailsSelector);
    const dispatch = useDispatch();

    const [selectedKeyword, setSelectedKeyword] = useState<string>(
        selectedInsight.keyword ? selectedInsight.keyword.text : ''
    );

    const words = useMemo(() => {
        const keywords = insights?.keywords;

        return keywords?.length
            ? keywords?.map((keyword) => ({
                  text: keyword.text || '',
                  value: keyword.instances.length || 0,
              }))
            : [];
    }, [insights?.keywords]);

    const handleChangeKeyword = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { value: keywordText } = event.target;
        if (keywordText) {
            const currentKeyword = insights?.keywords?.find(
                (key) => key.text === keywordText
            );

            if (currentKeyword) {
                dispatch(
                    changeSelectedInsight({
                        key: 'keyword',
                        value: currentKeyword,
                    })
                );
                setSelectedKeyword(keywordText);
            }
        }
    };

    return (
        <div className="flex flex-col w-full gap-5">
            <div>
                <MemoziedWordCloud words={words} />
            </div>
            <div className="flex flex-row items-center gap-3">
                {insights?.keywords && (
                    <CustomSelect
                        value={selectedKeyword}
                        onChange={handleChangeKeyword}
                        options={insights?.keywords}
                    />
                )}
            </div>
        </div>
    );
};

export default KeywordDetails;
