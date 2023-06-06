import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowDownAZ,
    // faArrowUpZA,
    faMagnifyingGlass,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleUploadFile = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.target);
    };

    return (
        <div className="flex items-center justify-between flex-col md:flex-row gap-4">
            <div className="bg-secondary flex flex-row gap-2 items-center px-4 py-2 rounded w-full md:w-1/4">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                    type="search"
                    placeholder="Search something..."
                    value={searchText}
                    onChange={handleSearchChange}
                    aria-label="Search"
                    className="bg-transparent w-full border-none outline-none"
                />
            </div>
            <div className="flex flex-row gap-3 items-center self-end">
                <button
                    type="button"
                    onClick={handleUploadFile}
                    aria-label="Upload"
                    className="bg-white text-black px-4 py-2 rounded hover:scale-95 transition-all"
                >
                    <FontAwesomeIcon icon={faArrowDownAZ} />
                    {/* <FontAwesomeIcon icon={faArrowUpZA} /> */}
                </button>
                <button
                    type="button"
                    onClick={handleUploadFile}
                    aria-label="Upload"
                    className="bg-primary text-black px-4 py-2 rounded hover:scale-95 transition-all"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
};

export default Header;
