import React, { memo } from 'react';

import spinner from '../../assets/spinner.svg';

type LoaderProps = {
    message?: string;
};

const Loader: React.FC<LoaderProps> = ({ message }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-20 h-20">
                <img
                    src={spinner}
                    alt="framewise spinner"
                    className="w-full h-full "
                />
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

const MemoziedLoader = memo(Loader);
export default MemoziedLoader;
