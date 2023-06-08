import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { fetchAllVideos } from './index.thunk';
import { VideoDeleteState, VideoState, VideosState } from './index.interface';

const initialState: VideosState = {
    isLoading: true,
    videos: [],
    sortedBy: '-lastModified',
    searchText: '',
};

export const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        changeSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        changeSortBy: (state, action) => {
            state.sortedBy = action.payload;
        },
        deleteByVideoId: (state, action) => {
            const { videoId }: VideoDeleteState = action.payload;
            const filteredVideos = state?.videos?.filter(
                (video: VideoState) => video?.id !== videoId
            );

            state.videos = filteredVideos;
        },
        updateVideoProcessingState: (state, action) => {
            const { videoId, videoProcessingState, videoState } =
                action.payload;
            const updatedVideos = state.videos?.map((video: VideoState) =>
                video.id === videoId
                    ? {
                          ...video,
                          processingProgress: videoProcessingState,
                          state: videoState,
                      }
                    : video
            );

            state.videos = updatedVideos;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllVideos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllVideos.fulfilled, (state, action) => {
                const { videos } = action.payload;
                state.videos = videos;
                state.isLoading = false;
            })
            .addCase(fetchAllVideos.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const {
    changeSearchText,
    changeSortBy,
    deleteByVideoId,
    updateVideoProcessingState,
} = videosSlice.actions;
export const videosSelector = (state: RootState) => state.videos;

export default videosSlice.reducer;
