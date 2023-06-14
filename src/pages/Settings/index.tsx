import React from 'react';

import './index.css';
import CustomBrands from './components/CustomBrands';

const Settings: React.FC = () => {
    return (
        <div>
            <h3 className="settings">Settings</h3>
            <CustomBrands />
        </div>
    );
};

export default Settings;
