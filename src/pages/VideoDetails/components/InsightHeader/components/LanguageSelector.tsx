import React from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
    appSelector,
    changeLanguageCode,
} from '../../../../../store/reducers/app';
import { AppDispatch } from '../../../../../store';
import { videoDetailsSelector } from '../../../../../store/reducers/videoDetails';
import { fetchInsightsDetails } from '../../../../../store/reducers/videoDetails/index.thunk';

const LanguageSelector: React.FC = () => {
    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>();

    const { defaultLanguageCode, supportedLanguages } =
        useSelector(appSelector);
    const { isInsightsLoading } = useSelector(videoDetailsSelector);

    const onChange = (value: string) => {
        if (isInsightsLoading) return;

        dispatch(changeLanguageCode(value));
        if (id) {
            dispatch(fetchInsightsDetails({ id }));
        }
    };

    return (
        <div className="hidden md:block">
            <Select
                showSearch
                value={defaultLanguageCode}
                defaultValue={defaultLanguageCode}
                className="bg-black w-38 text-xs"
                placeholder="Language"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                    (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }
                options={supportedLanguages.map((language) => ({
                    label: language.name,
                    value: language.languageCode,
                }))}
            />
        </div>
    );
};

const MemoziedLanguageSelector = React.memo(LanguageSelector);
export default MemoziedLanguageSelector;
