import React, { memo } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import constants from '../../static/constants.json';

const FileUploader: React.FC = () => {
    const handleUploadFile = (event: React.MouseEvent<HTMLButtonElement>) => {
        // upload file
    };

    return (
        <Tooltip title={constants.TOOLTIP.UPLOAD_FILE} arrow>
            <button
                type="button"
                onClick={handleUploadFile}
                aria-label="Upload"
                className="bg-primary text-black px-4 py-2 rounded hover:scale-95 transition-all"
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </Tooltip>
    );
};

const MemoziedFileUploader = memo(FileUploader);
export default MemoziedFileUploader;
