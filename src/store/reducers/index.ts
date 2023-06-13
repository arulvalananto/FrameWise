import { combineReducers } from 'redux';

import app from './app';
import videos from './videos';
import videoDetails from './videoDetails';

export default combineReducers({
    app,
    videos,
    videoDetails,
});
