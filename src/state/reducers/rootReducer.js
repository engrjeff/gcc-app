import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import cellGroupReducer from "./cellGroupReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  profile: profileReducer,
  cellgroup: cellGroupReducer,
});

export default rootReducer;
