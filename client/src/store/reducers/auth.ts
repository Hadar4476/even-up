import { IAuthState, IRootState, IUser } from "@/types";
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
    // AUTH
    setLoggedInUser: (state, action: PayloadAction<IAuthState>) => {
      const { isLoggedIn, token, expiryDate, user } = action.payload;

      state.isLoggedIn = isLoggedIn;
      state.token = token;
      state.expiryDate = expiryDate;
      state.user = user;
    },
    // USER
    updateProfile: (state, action: PayloadAction<IUser>) => {
      const { name, phoneNumber, email } = action.payload;

      if (state.user) {
        state.user.name = name;
        state.user.phoneNumber = phoneNumber;
        state.user.email = email;
      }
    },
  },
});

export const authActions = auth.actions;

export const authSelector = (state: IRootState) => state.auth;

export default auth.reducer;
