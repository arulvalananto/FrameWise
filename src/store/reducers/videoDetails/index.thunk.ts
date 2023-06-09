import { createAsyncThunk } from '@reduxjs/toolkit';

import { getVideoIndexDetails } from '../../../api/helpers';
import { VideoDetails, fetchVideoDetailsPayload } from './index.interface';

export const fetchVideoDetails = createAsyncThunk(
    'videoDetails/fetchVideoDetails',
    async (payload: fetchVideoDetailsPayload, thunkAPI) => {
        try {
            const response: VideoDetails = await getVideoIndexDetails(
                payload?.id
            );

            const videoDetails = response;
            const insights = videoDetails.videos
                ? videoDetails?.videos[0]?.insights
                : null;

            return { videoDetails, insights };
        } catch (error) {
            return thunkAPI.rejectWithValue('');
        }
    }
);
