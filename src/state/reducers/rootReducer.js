import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import cellGroupReducer from "./cellGroupReducer";
import cellMemberReducer from "./cellMemberReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  user: userReducer,
  profile: profileReducer,
  member: cellMemberReducer,
  cellgroup: cellGroupReducer,
});

export default rootReducer;
