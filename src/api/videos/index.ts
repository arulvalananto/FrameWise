/* eslint-disable no-async-promise-executor */
import { AxiosError } from 'axios';

import axiosInstance from '..';
import { checkTokenExpiry } from '../helpers';
import constants from '../../static/constants.json';
import { VideoState } from '../../store/reducers/videos/index.interface';
/**
 * Get All Videos
 */
export const getAllVideos = (): Promise<VideoState[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            await checkTokenExpiry();

            const response = await axiosInstance.get(
                `/trial/accounts/${
                    import.meta.env.VITE_AZURE_ACCOUNT_ID
                }/videos`
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
                `/trial/accounts/${
                    import.meta.env.VITE_AZURE_ACCOUNT_ID
                }/videos/${videoId}/thumbnails/${thumbnailId}?format=Base64`
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
 *
 * Post Video to video indexer
 * @param {*} fileName
 * @param {*} url
 */
export const indexVideo = async (
    fileName: string,
    url: string
): Promise<VideoState> => {
    return new Promise(async (resolve, reject) => {
        try {
            await checkTokenExpiry();

            const response = await axiosInstance.post(
                `/trial/Accounts/${
                    import.meta.env.VITE_AZURE_ACCOUNT_ID
                }/Videos?name=${fileName}&privacy=Private&language=en-US&videoUrl=${url}&indexingPreset=Default&streamingPreset=SingleBitrate`
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
                `/trial/Accounts/${
                    import.meta.env.VITE_AZURE_ACCOUNT_ID
                }/Videos/${videoId}`
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

/**
 *
 * Post Video to video indexer
 * @param {string} videoId
 */
export const reIndexVideo = async (videoId: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            await checkTokenExpiry();

            const response = await axiosInstance.put(
                `https://api.videoindexer.ai/trial/accounts/${
                    import.meta.env.VITE_AZURE_ACCOUNT_ID
                }/videos/${videoId}/reIndex/?indexingPreset=Default&sourceLanguage=en-US&streamingPreset=SingleBitrate`
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
