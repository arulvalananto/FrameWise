import React from 'react';
import { useSelector } from 'react-redux';

import Viewer from './components/Viewer';
import LanguageSelector from './components/LanguageSelector';
import { appSelector } from '../../../../store/reducers/app';
import { getVideoTranscript } from '../../../../api/videoDetails';
import FileDownloader from '../../../../components/FileDownloader';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const InsightHeader: React.FC = () => {
    const { videoDetails } = useSelector(videoDetailsSelector);
    const { defaultLanguageCode } = useSelector(appSelector);

    const handleDownloadTranscript = async () => {
        try {
            const response = await getVideoTranscript(
                videoDetails.id,
                defaultLanguageCode
            );

            const link = document.createElement('a');
            link.target = '_blank';
            link.download = videoDetails.name.split('.')[0];
            link.href = URL.createObjectURL(
                new Blob([response], { type: response.type })
            );
            link.click();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-secondary p-2 rounded flex flex-row items-center justify-end gap-2 w-full">
            <LanguageSelector />
            <FileDownloader
                handleFileDownload={handleDownloadTranscript}
                title="Download"
            />
            <Viewer />
        </div>
    );
};

const MemoziedInsightHeader = React.memo(InsightHeader);
export default MemoziedInsightHeader;
