import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAllBrands, getSupportedLanguages } from '../../../api/settings';

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

export const getCustomBrands = createAsyncThunk(
    'app/getCustomBrands',
    async (_payload, thunkAPI) => {
        try {
            const brands = await getAllBrands();
            return thunkAPI.fulfillWithValue(brands);
        } catch (error) {
            return thunkAPI.rejectWithValue('');
        }
    }
);
