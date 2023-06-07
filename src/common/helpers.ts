import jwtDecode from 'jwt-decode';

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
