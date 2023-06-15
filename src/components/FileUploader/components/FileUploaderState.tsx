import React, { useMemo } from 'react';
import MemoziedLoader from '../../Loader';

type FileUploaderStateProps = {
    uploadProgressState: number;
};

const FileUploaderState: React.FC<FileUploaderStateProps> = ({
    uploadProgressState,
}) => {
    const message = useMemo(
        () =>
            uploadProgressState === 100
                ? `Almost done...please wait for sec`
                : `Uploading ${Math.round(uploadProgressState)} %`,
        [uploadProgressState]
    );

    return (
        <div className="file-uploader-loader">
            <MemoziedLoader message={message} />
        </div>
    );
};

const MemoziedFileUploaderState = React.memo(FileUploaderState);
export default MemoziedFileUploaderState;
