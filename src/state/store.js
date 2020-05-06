import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import apiMiddleware from "./middleware/apiMiddleware";
import rootReducer from "./reducers/rootReducer";

const initialState = {};

const middleware = [thunk, apiMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
