
import {Dispatch} from "redux";
import {appActions} from "../state/appReducer/appReducer";
import axios, {AxiosError} from "axios";

export const handleServerAppError = (data: any, dispatch: Dispatch): void => {
    if (data.messages.length) {
        dispatch(appActions.setError({error: data.messages[0]}))
    } else {
        dispatch(appActions.setError({error: 'some error accured'}))
    }
    // dispatch(setErrorAC('failed'))appActions.
}


export const hendleServerNetworkError = (e: { message: string }, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(appActions.setError({error}))
    } else {
        dispatch(appActions.setError({error: `Native error ${err.message}`}))
    }
    dispatch(appActions.setStatus({status: 'failed'}))
}