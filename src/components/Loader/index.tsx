import React, { memo } from 'react';

import './index.css';
import spinner from '../../assets/spinner.svg';

type LoaderProps = {
    message?: string;
};

const Loader: React.FC<LoaderProps> = ({ message }) => {
    return (
        <div className="loader-container">
            <div className="loader-wrapper">
                <img src={spinner} alt="framewise spinner" className="loader" />
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

const MemoziedLoader = memo(Loader);
export default MemoziedLoader;
