import React from 'react';
import { Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';

import './index.css';

type FileDownloaderProps = {
    title: string;
    className?: string;
    handleFileDownload: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const FileDownloader: React.FC<FileDownloaderProps> = ({
    title,
    className = '',
    handleFileDownload,
    ...props
}) => {
    return (
        <Tooltip title={title} arrow placement="top">
            <button
                type="button"
                onClick={handleFileDownload}
                className={`fileDownloader ${className}`}
                {...props}
            >
                <FontAwesomeIcon icon={faCloudArrowDown} />
                <span>{title}</span>
            </button>
        </Tooltip>
    );
};

export default FileDownloader;
