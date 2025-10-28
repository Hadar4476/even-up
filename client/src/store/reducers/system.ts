import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISystemState, IRootState } from "@/types";

import commonUtils from "@/utils/common";

const defaultSystemState: ISystemState = {
  isAppLoaded: false,
  language: "en",
  isRTL: false,
};

const system = createSlice({
  name: "system",
  initialState: defaultSystemState,
  reducers: {
    setIsAppLoaded: (state, action: PayloadAction<boolean>) => {
      state.isAppLoaded = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setIsRtl: (state, action: PayloadAction<boolean>) => {
      const isRTL = action.payload;

      document.body.setAttribute("dir", isRTL ? "rtl" : "ltr");

      state.isRTL = isRTL;
    },
  },
});

export const systemActions = system.actions;

export const systemSelector = (state: IRootState) => state.system;

export default system.reducer;
