import React from 'react';

import CustomBrands from './components/CustomBrands';

const Settings: React.FC = () => {
    return (
        <div>
            <h3 className="text-xl md:text-2xl font-bold mt-3 md:mt-0 mb-3">
                Settings
            </h3>
            <CustomBrands />
        </div>
    );
};

export default Settings;
