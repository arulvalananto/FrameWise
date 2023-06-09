import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { fetchVideoDetails } from './index.thunk';
import { VideoDetailsState } from './index.interface';

const initialState: VideoDetailsState = {
    isLoading: true,
    insights: {
        brands: [],
        labels: [],
        keywords: [],
        emotions: [],
        namedLocations: [],
        namedPeople: [],
        faces: [],
        topics: [],
    },
    videoDetails: {
        name: '',
        userName: '',
        id: '',
        durationInSeconds: 0,
    },
    currentStartTime: 0,
    selectedInsight: {
        keyword: null,
        label: null,
        namedLocation: null,
        topic: null,
        brand: null,
        face: null,
        emotion: null,
        namedPerson: null,
    },
};

export const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        changeStartTime: (state, action) => {
            const { time } = action.payload;
            state.currentStartTime = time;
        },
        changeSelectedInsight: (state, action) => {
            const { key, value } = action.payload;
            if (key === 'keyword') {
                state.selectedInsight.keyword = value;
            } else if (key === 'label') {
                state.selectedInsight.label = value;
            } else if (key === 'namedLocation') {
                state.selectedInsight.namedLocation = value;
            } else if (key === 'topic') {
                state.selectedInsight.topic = value;
            } else if (key === 'brand') {
                state.selectedInsight.brand = value;
            } else if (key === 'face') {
                state.selectedInsight.face = value;
            } else if (key === 'emotion') {
                state.selectedInsight.emotion = value;
            } else if (key === 'namedPerson') {
                state.selectedInsight.namedPerson = value;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideoDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchVideoDetails.fulfilled, (state, action) => {
                const { videoDetails, insights } = action.payload;

                state.videoDetails = videoDetails;
                state.isLoading = false;

                state.insights = insights ? insights : null;
                state.selectedInsight = {
                    keyword: insights?.keywords?.length
                        ? insights?.keywords[0]
                        : null,
                    label: insights?.labels?.length
                        ? insights?.labels[0]
                        : null,
                    topic: insights?.topics?.length
                        ? insights?.topics[0]
                        : null,
                    brand: insights?.brands?.length
                        ? insights?.brands[0]
                        : null,
                    face: insights?.faces?.length ? insights?.faces[0] : null,
                    emotion: insights?.emotions?.length
                        ? insights?.emotions[0]
                        : null,
                    namedPerson: insights?.namedPeople?.length
                        ? insights?.namedPeople[0]
                        : null,
                    namedLocation: insights?.namedLocations?.length
                        ? insights?.namedLocations[0]
                        : null,
                };
            })
            .addCase(fetchVideoDetails.rejected, (state) => {
                state.videoDetails = null;
                state.isLoading = false;
            });
    },
});

export const { changeStartTime, changeSelectedInsight } = videosSlice.actions;
export const videoDetailsSelector = (state: RootState) => state.videoDetails;

export default videosSlice.reducer;
