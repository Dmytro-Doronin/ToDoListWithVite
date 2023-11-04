import {AppThunkDispatchType, AppRootStateType} from "../state/store/store";
import {handleServerAppError, hendleServerNetworkError} from "./error-utils";
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import {appActions} from "../state/appReducer/appReducer";

import {ResponseType} from "../serverApi/todoListsApi";
import {todoActions} from "../state/todoReducer/todoReducer";

export const thunkTryCatch = async (
    thunkAPI: BaseThunkAPI<AppRootStateType, any, AppThunkDispatchType, null | ResponseType>,
    logic: Function,

) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setStatus({status: 'loading'}))
    try {
        return await logic()
    } catch (e) {
        const error = (e as {message: string})
        hendleServerNetworkError(error, dispatch)
        // dispatch(appActions.setError({error: e.message}))
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setStatus({status: 'idle'}))

    }
}