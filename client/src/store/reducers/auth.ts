import { IAuthState, IRootState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultAuthState: IAuthState = {
  isLoggedIn: false,
  token: null,
  expiryDate: null,
  user: null,
};

const auth = createSlice({
  name: "auth",
  initialState: defaultAuthState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<IAuthState>) => {
      const { isLoggedIn, token, expiryDate, user } = action.payload;

      state.isLoggedIn = isLoggedIn;
      state.token = token;
      state.expiryDate = expiryDate;
      state.user = user;
    },
  },
});

export const authActions = auth.actions;

export const authSelector = (state: IRootState) => state.auth;

export default auth.reducer;
