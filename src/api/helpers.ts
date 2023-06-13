/* eslint-disable no-async-promise-executor */
import { AxiosError } from 'axios';

import axiosInstance, { headerConfig } from '.';
import constants from '../static/constants.json';
import { isTokenExpired } from '../common/helpers';
import { Language } from '../store/reducers/app/index.interface';
import { VideoState } from '../store/reducers/videos/index.interface';
import { VideoDetails } from '../store/reducers/videoDetails/index.interface';

/**
 * Check Token is expiry or not
 */
const checkTokenExpiry = async () => {
    const token = localStorage.getItem(constants.TOKEN_NAME);
    if ((token && isTokenExpired(token)) || !token) {
        await getAuthToken();
    }
};

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

/**
 * Get All Videos
 */
export const getAllVideos = (): Promise<VideoState[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            await checkTokenExpiry();

            const response = await axiosInstance.get(
                `/trial/accounts/${constants.AZURE_VIDEO_INDEXER.ACCOUNT_ID}/videos`
            );

            if (response?.status === 200 && response?.data?.results) {
                const videos: VideoState[] = response.data?.results;
                resolve(videos);
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
 * Get the video thumbnail by video id and thumbnail id
 * @param {string} videoId
 * @param {string} thumbnailId
 * @returns
 */
export const getThumbnail = (
    videoId: string,
    thumbnailId: string
): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            await checkTokenExpiry();

            const response = await axiosInstance.get(
                `/trial/accounts/${constants.AZURE_VIDEO_INDEXER.ACCOUNT_ID}/videos/${videoId}/thumbnails/${thumbnailId}?format=Base64`
            );

            if (response) {
                resolve(response?.data);
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
 * Get Video Details by video id
 * @param {*} videoId
 * @returns
 */
export const getVideoIndexDetails = (
    videoId: string,
    language: string
): Promise<VideoDetails> => {
    return new Promise(async (resolve, reject) => {
        try {
            await checkTokenExpiry();

            const response = await axiosInstance.get(
                `/trial/Accounts/${constants.AZURE_VIDEO_INDEXER.ACCOUNT_ID}/Videos/${videoId}/Index?language=${language}`
            );
            if (response?.status === 200 && response.data) {
                resolve(response.data);
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

/**
 *
 * Post Video to video indexer
 * @param {*} fileName
 * @param {*} url
 */
export const uploadVideo = async (
    fileName: string,
    url: string
): Promise<VideoState> => {
    return new Promise(async (resolve, reject) => {
        try {
            await checkTokenExpiry();

            const response = await axiosInstance.post(
                `/trial/Accounts/${constants.AZURE_VIDEO_INDEXER.ACCOUNT_ID}/Videos?name=${fileName}&privacy=Private&language=en-US&videoUrl=${url}&indexingPreset=Default&streamingPreset=SingleBitrate`
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
 * Delete video
 * @param {*} videoId
 * @returns
 */
export const deleteVideo = (videoId: string): Promise<{ status: number }> => {
    return new Promise(async (resolve, reject) => {
        try {
            await checkTokenExpiry();

            const response = await axiosInstance.delete(
                `/trial/Accounts/${constants.AZURE_VIDEO_INDEXER.ACCOUNT_ID}/Videos/${videoId}`
            );
            if (response?.status === 204) {
                resolve({ status: response?.status });
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
