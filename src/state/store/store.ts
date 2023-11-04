import {taskReducer} from "../taskReducer/tasksReducer";
import {todoReducer} from "../todoReducer/todoReducer";
import {appReducer} from "../appReducer/appReducer";
import { combineReducers, AnyAction} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

import {authReducer} from "../authReducer/authReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    task: taskReducer,
    todo: todoReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk<ReturnType= void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
// export const AppDispatch = () => useDispatch<AppThunkDispatchType>()
// export type AppDispatch = typeof store.dispatch