import React from 'react';
import { Tooltip } from '@mui/material';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Viewer: React.FC = () => {
    return (
        <Tooltip title="Change view" arrow placement="top">
            <button
                type="button"
                className="flex flex-row items-center gap-3 bg-primary text-black px-2 py-2 rounded"
                aria-label="view"
            >
                <FontAwesomeIcon icon={faEye} />
            </button>
        </Tooltip>
    );
};

export default Viewer;
