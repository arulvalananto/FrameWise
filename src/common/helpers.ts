import jwtDecode from 'jwt-decode';

interface IJWTToken {
    exp: number;
}

export const isTokenExpired = (token: string): boolean => {
    const decoded: IJWTToken = jwtDecode(token);
    return decoded?.exp < +new Date() / 1000;
};
