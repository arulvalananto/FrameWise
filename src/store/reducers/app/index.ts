import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { getAllSupportedLanguages } from './index.thunk';
import { AppInitialState } from './index.interface';

const initialState: AppInitialState = {
    defaultLanguageCode: 'en-US',
    supportedLanguages: [],
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeLanguageCode: (state, action) => {
            state.defaultLanguageCode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllSupportedLanguages.fulfilled, (state, action) => {
            state.supportedLanguages = action.payload;
        });
    },
});

export const { changeLanguageCode } = appSlice.actions;
export const appSelector = (state: RootState) => state.app;

export default appSlice.reducer;
