/* eslint-disable no-async-promise-executor */
import { AxiosError } from 'axios';

import { checkTokenExpiry } from '../helpers';
import axiosInstance, { headerConfig } from '..';
import constants from '../../static/constants.json';

/**
 * Generate Access Token
 */
export const getAuthToken = (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.get(
                `/auth/trial/accounts/${constants.AZURE_VIDEO_INDEXER.ACCOUNT_ID}/AccessToken?allowEdit=true`,
                headerConfig
            );
            if (response?.status === 200 && response?.data) {
                localStorage.setItem(constants.TOKEN_NAME, response?.data);
                const token: string = response?.data;
                resolve(token);
            } else {
                throw new Error(constants.ERROR_MESSAGE.SOMETHING_WENT_WRONG);
            }
        } catch (error: unknown) {
            if (error instanceof Error) reject(error?.message);
            else if (error instanceof AxiosError)
                reject(error?.response?.data?.message);
        }
    });
};

/**
 * Get access token for video streaming service
 * @param videoId
 * @returns
 */
export const getVideoAccessToken = (videoId: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            await checkTokenExpiry();

            const response = await axiosInstance.get(
                `/Auth/trial/Accounts/${constants.AZURE_VIDEO_INDEXER.ACCOUNT_ID}/Videos/${videoId}/AccessToken?allowEdit=true`,
                headerConfig
            );

            if (response?.data) {
                resolve(response?.data);
            } else {
                reject(constants.ERROR_MESSAGE.SOMETHING_WENT_WRONG);
            }
        } catch (error: unknown) {
            if (error instanceof Error) reject(error?.message);
            else if (error instanceof AxiosError)
                reject(error?.response?.data?.message);
        }
    });
};
