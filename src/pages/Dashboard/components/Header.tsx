import React, { memo, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

import Sorter from '../../../components/Sorter';
import { sorterOptions } from '../../../static/data';
import constants from '../../../static/constants.json';

const Header: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleUploadFile = (event: React.MouseEvent<HTMLButtonElement>) => {
        // upload file
    };

    return (
        <div className="flex items-center justify-between flex-col md:flex-row gap-4 h-14 flex-none">
            <div className="bg-secondary flex flex-row gap-2 items-center px-4 py-2 rounded w-full md:w-1/2 lg:w-1/4">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                    name="search"
                    type="search"
                    placeholder="Search something..."
                    value={searchText}
                    onChange={handleSearchChange}
                    aria-label="Search"
                    className="bg-transparent w-full border-none outline-none"
                />
            </div>
            <div className="flex flex-row gap-3 items-center self-end md:self-center">
                <Sorter options={sorterOptions} />
                <Tooltip title={constants.TOOLTIP.UPLOAD_FILE} arrow>
                    <button
                        type="button"
                        onClick={handleUploadFile}
                        aria-label="Upload"
                        className="bg-primary text-black px-4 py-2 rounded hover:scale-95 transition-all"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

const MemoziedHeader = memo(Header);
export default MemoziedHeader;
