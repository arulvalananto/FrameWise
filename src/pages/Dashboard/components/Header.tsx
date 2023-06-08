import React, { memo } from 'react';

import { sorterOptions } from '../../../static/data';
import MemoziedSorter from '../../../components/Sorter';
import MemoziedSearchbox from '../../../components/Searchbox';
import MemoziedFileUploader from '../../../components/FileUploader';

const Header: React.FC = () => {
    return (
        <div className="flex items-center justify-between flex-col md:flex-row gap-4 h-14 flex-none">
            <MemoziedSearchbox />
            <div className="flex flex-row gap-3 items-center self-end md:self-center">
                <MemoziedSorter options={sorterOptions} />
                <MemoziedFileUploader />
            </div>
        </div>
    );
};

const MemoziedHeader = memo(Header);
export default MemoziedHeader;
