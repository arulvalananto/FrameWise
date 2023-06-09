import React from 'react';
import MemoziedLoader from '../../Loader';

interface FileUploaderStateProps {
    uploadProgressState: number;
}

const FileUploaderState: React.FC<FileUploaderStateProps> = ({ uploadProgressState }) => {
    return (
        <div className="text-white h-48 flex flex-col items-center justify-center">
            <MemoziedLoader />
            {uploadProgressState === 100
                ? `Almost done...please wait for sec`
                : `Uploading ${Math.round(uploadProgressState)} %`}
        </div>
    );
};

const MemoziedFileUploaderState = React.memo(FileUploaderState);
export default MemoziedFileUploaderState;
