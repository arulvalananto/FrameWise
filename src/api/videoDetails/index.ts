/* eslint-disable no-async-promise-executor */
import { AxiosError } from 'axios';

import axiosInstance from '..';
import { checkTokenExpiry } from '../helpers';
import constants from '../../static/constants.json';
import { VideoDetails } from '../../store/reducers/videoDetails/index.interface';

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
                `/trial/Accounts/${
                    import.meta.env.VITE_AZURE_ACCOUNT_ID
                }/Videos/${videoId}/Index?language=${language}`
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
 * Get video transcript
 * @param {*} videoId
 * @param {*} language
 * @returns
 */
export const getVideoTranscript = (
    videoId: string,
    language: string
): Promise<Blob> => {
    return new Promise(async (resolve, reject) => {
        try {
            await checkTokenExpiry();

            const response = await axiosInstance.get(
                `/trial/Accounts/${
                    import.meta.env.VITE_AZURE_ACCOUNT_ID
                }/Videos/${videoId}/captions?format=txt&includeAudioEffects=false&includeSpeakers=true&language=${language}`,
                {
                    responseType: 'blob',
                }
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
