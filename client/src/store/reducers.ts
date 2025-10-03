import { combineReducers } from "@reduxjs/toolkit";

import system from "./reducers/system";
import auth from "./reducers/auth";
import groups from "./reducers/groups";

const rootReducer = combineReducers({
  system,
  auth,
  groups,
});

export default rootReducer;
