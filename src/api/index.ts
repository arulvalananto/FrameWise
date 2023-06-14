import axios, { AxiosInstance } from 'axios';

import constants from '../static/constants.json';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://api.videoindexer.ai',
    timeout: 5000,
    timeoutErrorMessage: 'Timeout error',
});

axiosInstance.interceptors.request.use(async (config) => {
    try {
        const token = localStorage.getItem(constants.TOKEN_NAME);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch (error) {
        return config;
    }
});

export const headerConfig = {
    headers: {
        'Ocp-Apim-Subscription-Key':
            constants.AZURE_VIDEO_INDEXER.SUBSCRIPTION_KEY,
    },
};

export default axiosInstance;
