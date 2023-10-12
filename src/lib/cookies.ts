import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const AUTH_TOKEN = 'token';
export const AUTH_REFRESH_TOKEN = 'refreshToken';

export const setAuthCookie = (token: string, name: string) => {
  const toBase64 = Buffer.from(token).toString('base64');

  setCookie(name, toBase64, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    // more security options here
    // sameSite: 'strict',
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  });
};

export const getAuthCookie = (name: string) => {
  const cookie = getCookie(name);

  if (!cookie) return undefined;

  return Buffer.from(cookie, 'base64').toString('ascii');
};

export const removeCookies = (cookies: string[]) => {
  cookies.forEach((cookie) => {
    deleteCookie(cookie);
  });
};

export const expireCookies = (cookies: string[]) => {
  cookies.forEach((cookie) => {
    setCookie(cookie, '', {
      maxAge: 0,
      path: '/',
    });
  });
};

export const getValidAuthTokens = (t?: string, rT?: string) => {
  const token = t || getAuthCookie(AUTH_TOKEN);
  const refreshToken = rT || getAuthCookie(AUTH_REFRESH_TOKEN);

  const now = new Date();
  const tokenDate = new Date(token || 0);
  const refreshTokenDate = new Date(refreshToken || 0);

  return {
    token: now < tokenDate ? token : undefined,
    refreshToken: now < refreshTokenDate ? refreshToken : undefined,
  };
};

export const isTokenExpired = (expiryDate?: string) => {
  if (!expiryDate) return true;

  const now = new Date();
  const expiry = new Date(expiryDate);

  return now.getTime() > expiry.getTime();
};
