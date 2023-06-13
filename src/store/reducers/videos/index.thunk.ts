import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAllVideos } from '../../../api/videos';
import { VideoFullFillState, VideoState } from './index.interface';

export const fetchAllVideos = createAsyncThunk(
    'videos/fetchAllVideos',
    async (_payload, thunkAPI) => {
        try {
            const videos: VideoState[] = await getAllVideos();
            const data: VideoFullFillState = { videos };
            return thunkAPI.fulfillWithValue(data);
        } catch (error) {
            return thunkAPI.rejectWithValue('');
        }
    }
);
