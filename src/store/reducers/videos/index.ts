import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';

export interface VideosState {
    value: number;
}

const initialState: VideosState = {
    value: 0,
};

export const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {},
});

// export const {  } = videosSlice.actions;
export const videosSelector = (state: RootState) => state.videos;

export default videosSlice.reducer;
