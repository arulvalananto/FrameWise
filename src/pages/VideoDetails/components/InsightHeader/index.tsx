import React from 'react';

import Viewer from './Viewer';

const InsightHeader: React.FC = () => {
    return (
        <div className="bg-secondary p-2 rounded flex flex-row items-center justify-end w-full">
            <Viewer />
        </div>
    );
};

export default InsightHeader;
