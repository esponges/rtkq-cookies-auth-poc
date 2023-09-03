import { LoginResponse } from "@/pages/api/login";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";

const initialState: Partial<LoginResponse> = {};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log("authApi.endpoints.login.matchFulfilled", payload);
        return payload;
      }
    );
  }
});

export const authReducer = slice.reducer;
