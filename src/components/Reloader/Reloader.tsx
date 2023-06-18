import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@mui/material';
import React from 'react';

type ReloadProps = {
    handleReload: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    title?: string;
};

const Reloader: React.FC<ReloadProps> = ({
    handleReload,
    className = '',
    title = 'Reload Videos',
}) => {
    return (
        <Tooltip title={title} arrow placement="bottom">
            <button
                data-testid={title}
                type="button"
                onClick={handleReload}
                aria-label={title}
                className={`bg-red-500 px-4 py-3 rounded flex items-center justify-center ${className}`}
            >
                <FontAwesomeIcon icon={faRotateRight} />
            </button>
        </Tooltip>
    );
};

export default Reloader;
