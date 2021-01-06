import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";
import { authReducer } from "./reducers";
import { existingMarkersReducer } from "./existingMarkersReducer";

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
// const composeEnhancers = compose;

const rootReducer = combineReducers({
  authStore: authReducer,
  existingMarkersStore: existingMarkersReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);