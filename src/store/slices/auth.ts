import { LoginResponse } from '@/pages/api/login';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';
import { AUTH_REFRESH_TOKEN, AUTH_TOKEN, expireCookies, getAuthCookie, removeCookies, setAuthCookie } from '@/lib/cookies';
import { userApi } from '../services/user';

const initialState: Partial<LoginResponse> = {};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      // remove the token and refreshToken
      removeCookies([AUTH_TOKEN, AUTH_REFRESH_TOKEN]);
      return initialState;
    },
    expireToken: (state, action: PayloadAction<string[]>) => {
      expireCookies(action.payload);
      const token = getAuthCookie(AUTH_TOKEN);
      const refreshToken = getAuthCookie(AUTH_REFRESH_TOKEN);

      state.token = token;
      state.refreshToken = refreshToken;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (_state, { payload }) => {
          // set the token and refreshToken
          setAuthCookie(payload.token, AUTH_TOKEN);
          setAuthCookie(payload.refreshToken, AUTH_REFRESH_TOKEN);

          return payload;
        }
      )
      .addMatcher(
        userApi.endpoints.userDetails.matchFulfilled,
        (_state, { payload }) => {
          // optional:
          // depending on the api response we could also set cookies again here
          return payload;
        }
      );
  },
});

export const authReducer = slice.reducer;
export const { logout, expireToken } = slice.actions;
