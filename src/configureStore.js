import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import createSagaMiddleware, { END } from "redux-saga";

import { sagas } from "sagas";
import { verifyAuth } from "./actions/";
import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(persistedState) {
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunkMiddleware, sagaMiddleware, logger)
  );

  store.dispatch(verifyAuth());

  sagas.forEach(saga => sagaMiddleware.run(saga));
  return store;
}
