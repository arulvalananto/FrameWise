import { AxiosError } from 'axios';

import { checkTokenExpiry } from '../helpers';
import axiosInstance, { headerConfig } from '..';
import constants from '../../static/constants.json';

class AuthAPI {
    accountId: string;
    urlPrefix: string;

    constructor() {
        this.accountId = constants.AZURE_VIDEO_INDEXER.ACCOUNT_ID;
        this.urlPrefix = `/auth/trial/accounts/${this.accountId}`;
    }

    /**
     * Generate Access Token
     */
    getAuthToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            axiosInstance
                .get(
                    `${this.urlPrefix}/AccessToken?allowEdit=true`,
                    headerConfig
                )
                .then((response) => {
                    if (response?.status === 200 && response?.data) {
                        localStorage.setItem(
                            constants.TOKEN_NAME,
                            response?.data
                        );
                        const token: string = response?.data;
                        resolve(token);
                    } else {
                        throw new Error(
                            constants.ERROR_MESSAGE.SOMETHING_WENT_WRONG
                        );
                    }
                })
                .catch((error: unknown) => {
                    if (error instanceof Error) reject(error?.message);
                    else if (error instanceof AxiosError)
                        reject(error?.response?.data?.message);
                });
        });
    }

    /**
     * Get access token for video streaming service
     * @param videoId
     * @returns
     */
    getVideoAccessToken(videoId: string): Promise<string> {
        return new Promise((resolve, reject) => {
            checkTokenExpiry()
                .then(() => {
                    axiosInstance
                        .get(
                            `${this.urlPrefix}/Videos/${videoId}/AccessToken?allowEdit=true`,
                            headerConfig
                        )
                        .then((response) => {
                            if (response?.data) {
                                resolve(response?.data);
                            } else {
                                reject(
                                    constants.ERROR_MESSAGE.SOMETHING_WENT_WRONG
                                );
                            }
                        });
                })
                .catch((error: unknown) => {
                    if (error instanceof Error) reject(error?.message);
                    else if (error instanceof AxiosError)
                        reject(error?.response?.data?.message);
                });
        });
    }
}

const AuthAPIInstance = new AuthAPI();
export default AuthAPIInstance;
