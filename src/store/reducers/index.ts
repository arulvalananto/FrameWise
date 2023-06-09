import { combineReducers } from 'redux';

import videos from './videos';
import videoDetails from './videoDetails';

export default combineReducers({
    videos,
    videoDetails,
});
