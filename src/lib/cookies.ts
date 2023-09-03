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
