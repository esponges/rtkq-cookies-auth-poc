import { setCookie, getCookie } from "cookies-next";

const AUTH_COOKIE_NAME = 'auth';

export const setAuthCookie = (token: string) => {
  setCookie(AUTH_COOKIE_NAME, token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
  console.log('setAuthCookie', token);
};

export const getAuthCookie = () => {
  console.log('getAuthCookie', getCookie(AUTH_COOKIE_NAME));
  return getCookie(AUTH_COOKIE_NAME);
};
