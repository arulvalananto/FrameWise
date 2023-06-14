import React from 'react';

import Viewer from './components/Viewer';
import LanguageSelector from './components/LanguageSelector';

const InsightHeader: React.FC = () => {
    return (
        <div className="bg-secondary p-2 rounded flex flex-row items-center justify-end w-full">
            <LanguageSelector />
            <Viewer />
        </div>
    );
};

const MemoziedInsightHeader = React.memo(InsightHeader);
export default MemoziedInsightHeader;
