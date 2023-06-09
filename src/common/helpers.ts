import jwtDecode from 'jwt-decode';

import constants from '../static/constants.json';
import { Instance } from '../store/reducers/videoDetails/index.interface';
interface IJWTToken {
    exp: number;
}

export const isTokenExpired = (token: string): boolean => {
    const decoded: IJWTToken = jwtDecode(token);
    return decoded?.exp < +new Date() / 1000;
};

export const fancyTimeFormat = (duration: number): string => {
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    let ret = '';

    if (hrs > 0) {
        ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;

    return ret;
};

export const trimStr = (str: string, maxLength = 30): string => {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

export const dynamicSort = (property: string) => {
    let sortOrder = 1;
    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substring(1);
    }
    return function (a: any, b: any) {
        const result =
            a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    };
};

export const getVideoPlayerURL = (
    videoId: string,
    videoAccessToken: string
): string => {
    return `https://www.videoindexer.ai/embed/player/${constants.AZURE_VIDEO_INDEXER.ACCOUNT_ID}/${videoId}/?accessToken=${videoAccessToken}&autoplay=true`;
};

export const getVideoSpecificTime = (
    startTime: number,
    currentStartTime: number
): number => {
    const time = startTime ? startTime : 0.1; // for re-rendering, change value 0 to 1
    const updatedTime = currentStartTime === time ? time + 0.1 : time; // for re-rendering

    return updatedTime;
};

export const getTimeInSeconds = (time: string): number => {
    if (time) {
        const timeline = time?.split(':');

        const seconds =
            +timeline[0] * 60 * 60 + +timeline[1] * 60 + +timeline[2];
        return seconds;
    } else {
        return 0;
    }
};

export const getSeenDuration = (
    instances: Instance[] | undefined,
    totalDuration: number | undefined
): number => {
    if (instances?.length && totalDuration) {
        const duration = instances?.reduce((prev, cur) => {
            const start = getTimeInSeconds(cur?.start);
            const end = getTimeInSeconds(cur?.end);
            return prev + (end - start);
        }, 0);
        return (duration / totalDuration) * 100;
    } else {
        return 0;
    }
};

export const getTimelineInfo = (insight: Instance) => {
    const start = getTimeInSeconds(insight?.start);
    const end = getTimeInSeconds(insight?.end);
    const totalLength = end - start;

    return {
        start,
        end,
        width: totalLength < 1 ? totalLength + 2 : totalLength,
        period: `${insight?.start} - ${insight?.end}`,
    };
};
