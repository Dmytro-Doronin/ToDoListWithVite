import {LoginType} from "../../pages/login/Login";
import {AppThunk} from "../store/store";
import {Dispatch} from "redux";
import {appActions} from "../appReducer/appReducer";
import {authApi} from "../../serverApi/todoListsApi";
import {handleServerAppError, hendleServerNetworkError} from "../../utils/error-utils";
import {todoActions} from "../todoReducer/todoReducer";
import {authActions} from "./authReducer";

export const loginThunk = (data: LoginType): AppThunk => async (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    try {
        const response = await authApi.login(data)
        if (response.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
            dispatch(appActions.setStatus({status: 'successed'}))
        } else {
            handleServerAppError(response.data, dispatch)
            dispatch(appActions.setStatus({status: 'successed'}))
        }

    } catch (e) {
        const error = (e as {message: string})
        hendleServerNetworkError(error, dispatch)
    }
}

export const meThunk = (): AppThunk => async (dispatch: Dispatch) => {
    try {
        const response = await authApi.me()
        if (response.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
            dispatch(appActions.setStatus({status: 'successed'}))
        } else {
            // handleServerAppError(response.data, dispatch)
            dispatch(appActions.setStatus({status: 'successed'}))
        }

    } catch (e) {
        const error = (e as {message: string})
        hendleServerNetworkError(error, dispatch)
        console.log(error)
    }
    finally {
        dispatch(appActions.setIsInitialized({isInitialized: true}))
    }
}

export const logOutThunk = (): AppThunk => async (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    try {
        const response = await authApi.logOut()
        if (response.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
            dispatch(todoActions.clearData())
            dispatch(appActions.setStatus({status: 'successed'}))
        } else {
            handleServerAppError(response.data, dispatch)
            dispatch(appActions.setStatus({status: 'successed'}))
        }

    } catch (e) {
        const error = (e as {message: string})
        hendleServerNetworkError(error, dispatch)
    }
}