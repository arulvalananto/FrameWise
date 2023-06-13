import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../store';
import { sorterOptions } from '../../../static/data';
import Searchbox from '../../../components/Searchbox';
import MemoziedSorter from '../../../components/Sorter';
import FileUploader from '../../../components/FileUploader';
import {
    changeSearchText,
    videosSelector,
} from '../../../store/reducers/videos';

const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { searchText } = useSelector(videosSelector);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearchText(event?.target?.value));
    };

    return (
        <div className="flex items-center justify-between flex-col md:flex-row gap-4 h-14 flex-none">
            <Searchbox value={searchText} onChange={handleSearchChange} />
            <div className="flex flex-row gap-3 items-center self-end md:self-center">
                <MemoziedSorter options={sorterOptions} />
                <FileUploader />
            </div>
        </div>
    );
};

const MemoziedHeader = memo(Header);
export default MemoziedHeader;
