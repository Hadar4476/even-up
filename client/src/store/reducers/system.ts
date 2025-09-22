import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISystemState, IRootState } from "@/types";

import commonUtils from "@/utils/common";

const defaultSystemState: ISystemState = {
  isAppLoaded: false,
  language: "en",
};

const system = createSlice({
  name: "system",
  initialState: defaultSystemState,
  reducers: {
    setIsAppLoaded: (state, action: PayloadAction<boolean>) => {
      state.isAppLoaded = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      const language = action.payload;

      const isRTL = commonUtils.isRTL(language);

      document.body.setAttribute("dir", isRTL ? "rtl" : "ltr");

      state.language = action.payload;
    },
  },
});

export const systemActions = system.actions;

export const systemSelector = (state: IRootState) => state.system;

export default system.reducer;
