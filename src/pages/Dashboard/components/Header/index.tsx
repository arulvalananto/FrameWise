import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';
import { AppDispatch } from '../../../../store';
import { sorterOptions } from '../../../../static/data';
import Searchbox from '../../../../components/Searchbox';
import MemoziedSorter from '../../../../components/Sorter';
import FileUploader from '../../../../components/FileUploader';
import {
    changeSearchText,
    videosSelector,
} from '../../../../store/reducers/videos';

const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { searchText } = useSelector(videosSelector);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearchText(event?.target?.value));
    };

    return (
        <header className="header">
            <Searchbox value={searchText} onChange={handleSearchChange} />
            <div className="header-acion-buttons">
                <MemoziedSorter options={sorterOptions} />
                <FileUploader />
            </div>
        </header>
    );
};

const MemoziedHeader = memo(Header);
export default MemoziedHeader;
