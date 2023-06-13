/* eslint-disable no-async-promise-executor */
// https://api.videoindexer.ai/trial/accounts/dd73ffe1-6a72-4af9-b565-7bec166593af/customization/brands/

// https://api.videoindexer.ai/trial/accounts/dd73ffe1-6a72-4af9-b565-7bec166593af/customization/brands/

import { AxiosError } from 'axios';

import axiosInstance from '..';
import { checkTokenExpiry } from '../helpers';
import constants from '../../static/constants.json';
import { Language } from '../../store/reducers/app/index.interface';

/**
 * Get all supported languages
 * @returns {Promise<Language[]>}
 */
export const getSupportedLanguages = (): Promise<Language[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            await checkTokenExpiry();

            const response = await axiosInstance.get(
                `/trial/SupportedLanguages`
            );
            if (response?.status === 200 && response?.data) {
                resolve(response.data);
            } else {
                reject({
                    message: constants.ERROR_MESSAGE.SOMETHING_WENT_WRONG,
                });
            }
        } catch (error: unknown) {
            if (error instanceof Error) reject(error?.message);
            else if (error instanceof AxiosError)
                reject(error?.response?.data?.message);
        }
    });
};

/**
 * Get All custom brands
 * @returns
 */
export const getAllBrands = (): Promise<string[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            await checkTokenExpiry();

            const response = await axiosInstance.get(
                `/trial/accounts/${constants.AZURE_VIDEO_INDEXER.ACCOUNT_ID}/customization/brands/`
            );
            if (response?.status === 200 && response?.data) {
                resolve(response.data);
            } else {
                reject({
                    message: constants.ERROR_MESSAGE.SOMETHING_WENT_WRONG,
                });
            }
        } catch (error: unknown) {
            if (error instanceof Error) reject(error?.message);
            else if (error instanceof AxiosError)
                reject(error?.response?.data?.message);
        }
    });
};
