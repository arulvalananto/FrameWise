import AuthAPI from './auth';
import constants from '../static/constants.json';
import { isTokenExpired } from '../common/helpers';

/**
 * Check Token is expiry or not
 */
export const checkTokenExpiry = async () => {
    const token = localStorage.getItem(constants.TOKEN_NAME);
    if ((token && isTokenExpired(token)) || !token) {
        await AuthAPI.getAuthToken();
    }
};
