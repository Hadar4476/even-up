import { combineReducers } from "@reduxjs/toolkit";

import auth from "./reducers/auth";
import system from "./reducers/system";

const rootReducer = combineReducers({
  auth,
  system,
});

export default rootReducer;
