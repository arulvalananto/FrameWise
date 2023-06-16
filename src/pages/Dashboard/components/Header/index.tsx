import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';
import toast from 'react-hot-toast';
import { AppDispatch } from '../../../../store';
import { sorterOptions } from '../../../../static/data';
import Searchbox from '../../../../components/Searchbox';
import constants from '../../../../static/constants.json';
import MemoziedSorter from '../../../../components/Sorter';
import FileUploader from '../../../../components/FileUploader';
import Reloader from '../../../../components/Reloader/Reloader';
import { fetchAllVideos } from '../../../../store/reducers/videos/index.thunk';
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

    const handleReloadPage = (): void => {
        const lastVideoLoadedTime = localStorage.getItem(
            constants.VIDEOS_LAST_LOADED
        );
        const currentTime = Date.now();

        if (
            lastVideoLoadedTime &&
            +lastVideoLoadedTime + constants.VIDEOS_FREQUENCY_SPAN_TIME <
                currentTime
        ) {
            dispatch(fetchAllVideos());
        } else {
            toast.error(constants.ERROR_MESSAGE.FREQUENT_RELOAD_CALLS);
        }

        const time = Date.now() + '';
        localStorage.setItem(constants.VIDEOS_LAST_LOADED, time);
    };

    return (
        <header className="header">
            <Searchbox value={searchText} onChange={handleSearchChange} />
            <div className="header-acion-buttons">
                <Reloader handleReload={handleReloadPage} />
                <MemoziedSorter options={sorterOptions} />
                <FileUploader />
            </div>
        </header>
    );
};

const MemoziedHeader = memo(Header);
export default MemoziedHeader;
