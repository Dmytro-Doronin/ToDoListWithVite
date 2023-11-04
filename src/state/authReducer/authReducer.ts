
import {Dispatch} from "redux";
import {LoginType} from "../../pages/login/Login";
import {authApi} from "../../serverApi/todoListsApi";
import {handleServerAppError, hendleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store/store";
import {appActions} from "../appReducer/appReducer";
import {todoActions} from "../todoReducer/todoReducer";

type LoginFlagType = {
    isLoggedIn: boolean
}

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn: (state: LoginFlagType, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions


// export const loginThunk = (data: LoginType): AppThunk => async (dispatch: Dispatch) => {
//     dispatch(appActions.setStatus({status: 'loading'}))
//     try {
//         const response = await authApi.login(data)
//         if (response.data.resultCode === 0) {
//             dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
//             dispatch(appActions.setStatus({status: 'successed'}))
//         } else {
//             handleServerAppError(response.data, dispatch)
//             dispatch(appActions.setStatus({status: 'successed'}))
//         }
//
//     } catch (e) {
//         const error = (e as {message: string})
//         hendleServerNetworkError(error, dispatch)
//     }
// }
//
// export const meThunk = (): AppThunk => async (dispatch: Dispatch) => {
//     try {
//         const response = await authApi.me()
//         if (response.data.resultCode === 0) {
//             dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
//             dispatch(appActions.setStatus({status: 'successed'}))
//         } else {
//             // handleServerAppError(response.data, dispatch)
//             dispatch(appActions.setStatus({status: 'successed'}))
//         }
//
//     } catch (e) {
//         const error = (e as {message: string})
//         hendleServerNetworkError(error, dispatch)
//         console.log(error)
//     }
//     finally {
//         dispatch(appActions.setIsInitialized({isInitialized: true}))
//     }
// }
//
// export const logOutThunk = (): AppThunk => async (dispatch: Dispatch) => {
//     dispatch(appActions.setStatus({status: 'loading'}))
//     try {
//         const response = await authApi.logOut()
//         if (response.data.resultCode === 0) {
//             dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
//             dispatch(todoActions.clearData())
//             dispatch(appActions.setStatus({status: 'successed'}))
//         } else {
//             handleServerAppError(response.data, dispatch)
//             dispatch(appActions.setStatus({status: 'successed'}))
//         }
//
//     } catch (e) {
//         const error = (e as {message: string})
//         hendleServerNetworkError(error, dispatch)
//     }
// }
