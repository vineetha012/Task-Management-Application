import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import errorMessageReducer from "../reducer/errorMessageReducer";
import { taskApi } from "../../services/task";
import { loginApi } from "../../services/login";
import { signUpApi } from "../../services/signUp";

const rootReducer = combineReducers({
  errorMessageReducer: errorMessageReducer,
  
  [taskApi.reducerPath]: taskApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [signUpApi.reducerPath]: signUpApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat([
      loginApi.middleware,
      signUpApi.middleware,
      taskApi.middleware,
    ])
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;