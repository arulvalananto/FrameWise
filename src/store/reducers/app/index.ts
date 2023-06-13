import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { AppInitialState } from './index.interface';
import { getAllSupportedLanguages, getCustomBrands } from './index.thunk';

const initialState: AppInitialState = {
    defaultLanguageCode: 'en-US',
    customBrandSearchText: '',
    supportedLanguages: [],
    customBrands: [],
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeLanguageCode: (state, action) => {
            state.defaultLanguageCode = action.payload;
        },
        changeCustomBrandSearchText: (state, action) => {
            state.customBrandSearchText = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllSupportedLanguages.fulfilled, (state, action) => {
                state.supportedLanguages = action.payload;
            })
            .addCase(getCustomBrands.fulfilled, (state, action) => {
                state.customBrands = action.payload;
            });
    },
});

export const { changeLanguageCode, changeCustomBrandSearchText } =
    appSlice.actions;
export const appSelector = (state: RootState) => state.app;

export default appSlice.reducer;
