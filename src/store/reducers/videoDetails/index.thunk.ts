import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { getVideoIndexDetails } from '../../../api/videoDetails';
import { VideoDetails, fetchVideoDetailsPayload } from './index.interface';

export const fetchVideoDetails = createAsyncThunk(
    'videoDetails/fetchVideoDetails',
    async (payload: fetchVideoDetailsPayload, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const response: VideoDetails = await getVideoIndexDetails(
                payload?.id,
                state.app.defaultLanguageCode
            );

            const videoDetails = response;
            const insights = videoDetails.videos[0].insights;

            return { videoDetails, insights };
        } catch (error) {
            return thunkAPI.rejectWithValue('');
        }
    }
);

export const fetchInsightsDetails = createAsyncThunk(
    'videoDetails/fetchInsightsDetails',
    async (payload: fetchVideoDetailsPayload, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const response: VideoDetails = await getVideoIndexDetails(
                payload?.id,
                state.app.defaultLanguageCode
            );

            const insights = response.videos[0].insights;

            return { insights };
        } catch (error) {
            return thunkAPI.rejectWithValue('');
        }
    }
);
