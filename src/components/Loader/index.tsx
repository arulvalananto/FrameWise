import React, { memo } from 'react';

import spinner from '../../assets/spinner.svg';

const Loader: React.FC = () => {
    return (
        <div className="w-20 h-20">
            <img
                src={spinner}
                alt="framewise spinner"
                className="w-full h-full "
            />
        </div>
    );
};

const MemoziedLoader = memo(Loader);
export default MemoziedLoader;
