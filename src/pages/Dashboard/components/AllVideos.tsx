import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import Video from './Video';
import { dynamicSort } from '../../../common/helpers';
import MemoziedLoader from '../../../components/Loader';
import { videosSelector } from '../../../store/reducers/videos';
import { VideoState } from '../../../store/reducers/videos/index.interface';

const AllVideos: React.FC = () => {
    const { videos, isLoading, sortedBy, searchText } =
        useSelector(videosSelector);

    const sortedVideos = useMemo(() => {
        if (videos.length) {
            return videos?.slice()?.sort(dynamicSort(sortedBy));
        } else return [];
    }, [videos, sortedBy]);

    const filteredVideos = useMemo(() => {
        return sortedVideos?.filter((video) =>
            video?.name?.toLowerCase()?.includes(searchText)
        );
    }, [sortedVideos, searchText]);

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
                {filteredVideos?.map((video: VideoState) => (
                    <Video video={video} key={video?.id} />
                ))}
            </div>
        </div>
    );
};

const MemoziedAllVideos = memo(AllVideos);
export default MemoziedAllVideos;
