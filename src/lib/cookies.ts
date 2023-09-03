import { setCookie, getCookie } from "cookies-next";

export const AUTH_TOKEN = 'token';
export const AUTH_REFRESH_TOKEN = 'refreshToken';

export const setAuthCookie = (token: string, name: string) => {
  const toBase64 = Buffer.from(token).toString('base64');

  setCookie(name, toBase64, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
};

export const getAuthCookie = (name: string) => {
  const cookie = getCookie(name);

  if (!cookie) return null;

  return Buffer.from(cookie, 'base64').toString('ascii');
};

export const hasValidAuthTokens = () => {
  const token = getAuthCookie(AUTH_TOKEN);
  const refreshToken = getAuthCookie(AUTH_REFRESH_TOKEN);

  if (!token || !refreshToken) return false;

  const now = new Date();
  const tokenDate = new Date(token);
  const refreshTokenDate = new Date(refreshToken);

  // if the token is expired
  if (now > tokenDate) return false;

  // if the refresh token is expired
  if (now > refreshTokenDate) return false;

  return true;
}
