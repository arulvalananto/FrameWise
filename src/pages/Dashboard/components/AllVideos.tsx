import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import Video from './Video';
import { videosSelector } from '../../../store/reducers/videos';
import { VideoState } from '../../../store/reducers/videos/index.interface';
import MemoziedLoader from '../../../components/Loader';
import { dynamicSort } from '../../../common/helpers';

const AllVideos: React.FC = () => {
    const { videos, isLoading, sortedBy } = useSelector(videosSelector);

    const sortedVideos = useMemo(() => {
        if (videos.length) {
            return videos?.slice()?.sort(dynamicSort(sortedBy));
        } else return [];
    }, [videos, sortedBy]);

    console.log(sortedVideos.length, sortedVideos);

    if (isLoading) {
        return (
            <div className="container-center">
                <MemoziedLoader />
            </div>
        );
    }

    if (!videos?.length) {
        return (
            <div className="container-center">
                <p className="text-xl">No videos found 🥺</p>
            </div>
        );
    }

    return (
        <div className="mt-20 md:mt-10 flex-1 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-stretch gap-2">
                {sortedVideos?.map((video: VideoState) => (
                    <Video video={video} key={video?.id} />
                ))}
            </div>
        </div>
    );
};

const MemoziedAllVideos = memo(AllVideos);
export default MemoziedAllVideos;
