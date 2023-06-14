/* eslint-disable no-async-promise-executor */

import { AxiosError } from 'axios';

import axiosInstance from '..';
import { checkTokenExpiry } from '../helpers';
import constants from '../../static/constants.json';
import {
    CustomBrand,
    Language,
} from '../../store/reducers/app/index.interface';

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
 * @returns {Promise<CustomBrand[]}
 */
export const getAllBrands = (): Promise<CustomBrand[]> => {
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

/**
 * create new custom brand
 * @param {CustomBrand} brand
 * @returns {Promise<CustomBrand[]>}
 */
export const createNewCustomBrand = (
    brand: CustomBrand
): Promise<CustomBrand[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            await checkTokenExpiry();

            const response = await axiosInstance.post(
                `/trial/accounts/${constants.AZURE_VIDEO_INDEXER.ACCOUNT_ID}/customization/brands/`,
                brand
            );
            if (response?.status === 201 && response?.data) {
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
 * delete custom brand
 * @returns
 */
export const deleteCustomBrand = (customBrandId: number): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            await checkTokenExpiry();

            const response = await axiosInstance.delete(
                `/trial/accounts/${constants.AZURE_VIDEO_INDEXER.ACCOUNT_ID}/customization/brands/${customBrandId}`
            );
            if (response?.status === 204) {
                resolve('ok');
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
