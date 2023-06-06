import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAllVideos } from '../../../api/helpers';

export const fetchAllVideos = createAsyncThunk(
    'videos/fetchAllVideos',
    async (_payload, thunkAPI) => {
        try {
            const videos = await getAllVideos();
            return { videos };
        } catch (error) {
            return thunkAPI.rejectWithValue('');
        }
    }
);
