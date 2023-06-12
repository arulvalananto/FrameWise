import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { AppDispatch } from '../../store';
import { changeSearchText, videosSelector } from '../../store/reducers/videos';

const Searchbox: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { searchText } = useSelector(videosSelector);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearchText(event?.target?.value));
    };

    return (
        <div className="bg-secondary flex flex-row gap-2 items-center px-4 py-2 rounded w-full md:w-1/2 lg:w-1/4 mt-2 md:mt-0  text-sm md:text-base">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
                name="search"
                type="search"
                placeholder="Search something..."
                value={searchText}
                onChange={handleSearchChange}
                aria-label="Search"
                className="bg-transparent w-full border-none outline-none text-input"
            />
        </div>
    );
};

export default Searchbox;
