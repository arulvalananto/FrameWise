import { createAsyncThunk } from '@reduxjs/toolkit';

import { getSupportedLanguages } from '../../../api/helpers';

export const getAllSupportedLanguages = createAsyncThunk(
    'app/getAllSupportedLanguages',
    async (_payload, thunkAPI) => {
        try {
            const languages = await getSupportedLanguages();
            return thunkAPI.fulfillWithValue(languages);
        } catch (error) {
            return thunkAPI.rejectWithValue('');
        }
    }
);
