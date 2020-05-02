import { combineReducers } from "redux";
import uiReducer from "./uiReducer";
import cellGroupReducer from "./cellGroupReducer";

const rootReducer = combineReducers({
  ui: uiReducer,
  cellgroup: cellGroupReducer,
});

export default rootReducer;
