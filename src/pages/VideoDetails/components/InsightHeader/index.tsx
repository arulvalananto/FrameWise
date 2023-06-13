import React from 'react';

import Viewer from './Viewer';
import LanguageSelector from './LanguageSelector';

const InsightHeader: React.FC = () => {
    return (
        <div className="bg-secondary p-2 rounded flex flex-row items-center justify-end w-full">
            <LanguageSelector />
            <Viewer />
        </div>
    );
};

export default InsightHeader;
