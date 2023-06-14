import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { VideoDetailsState } from './index.interface';
import { sortInsightByInstances } from '../../../common/helpers';
import { fetchInsightsDetails, fetchVideoDetails } from './index.thunk';

const videoDetailsInitialState = {
    name: '',
    userName: '',
    id: '',
    durationInSeconds: 0,
    videos: [],
};

const initialState: VideoDetailsState = {
    isLoading: true,
    isInsightsLoading: false,
    insights: {
        brands: [],
        labels: [],
        keywords: [],
        emotions: [],
        namedLocations: [],
        namedPeople: [],
        faces: [],
        topics: [],
        sentiments: [],
    },
    videoDetails: videoDetailsInitialState,
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
        sentiment: null,
    },
    show: {
        keyword: true,
        face: true,
        brand: true,
        emotion: true,
        sentiment: true,
        place: true,
        topic: true,
        label: false,
        mention: false,
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
            state.selectedInsight[key] = value;
        },
        changeShowInsightState: (state, action) => {
            const { key, value } = action.payload;
            state.show[key] = value;
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

                const sortedKeywords = sortInsightByInstances(
                    insights.keywords
                );
                const sortedLabels = sortInsightByInstances(insights.labels);
                const filteredLocations = insights?.namedLocations?.filter(
                    (location) => location.description
                );
                const filteredTopics = insights?.topics?.filter(
                    (topic) => topic.referenceUrl
                );

                state.insights = insights;
                state.insights.keywords = sortedKeywords;
                state.insights.labels = sortedLabels;
                state.insights.namedLocations = filteredLocations;
                state.insights.topics = filteredTopics;

                state.selectedInsight = {
                    keyword: sortedKeywords?.length ? sortedKeywords[0] : null,
                    label: sortedLabels?.length ? sortedLabels[0] : null,
                    topic: filteredTopics?.length ? filteredTopics[0] : null,
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
                    namedLocation: filteredLocations?.length
                        ? filteredLocations[0]
                        : null,
                    sentiment: insights?.sentiments?.length
                        ? insights?.sentiments[0]
                        : null,
                };
            })
            .addCase(fetchVideoDetails.rejected, (state) => {
                state.videoDetails = videoDetailsInitialState;
                state.isLoading = false;
            })
            .addCase(fetchInsightsDetails.pending, (state) => {
                state.isInsightsLoading = true;
            })
            .addCase(fetchInsightsDetails.fulfilled, (state, action) => {
                const { insights } = action.payload;

                state.isInsightsLoading = false;

                const sortedKeywords = sortInsightByInstances(
                    insights.keywords
                );
                const sortedLabels = sortInsightByInstances(insights.labels);

                state.insights = insights;
                state.insights.keywords = sortedKeywords;
                state.insights.labels = sortedLabels;

                state.selectedInsight = {
                    keyword: sortedKeywords?.length ? sortedKeywords[0] : null,
                    label: sortedLabels?.length ? sortedLabels[0] : null,
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
                    sentiment: insights?.sentiments?.length
                        ? insights?.sentiments[0]
                        : null,
                };
            })
            .addCase(fetchInsightsDetails.rejected, (state) => {
                state.isInsightsLoading = false;
            });
    },
});

export const {
    changeStartTime,
    changeSelectedInsight,
    changeShowInsightState,
} = videosSlice.actions;
export const videoDetailsSelector = (state: RootState) => state.videoDetails;

export default videosSlice.reducer;
