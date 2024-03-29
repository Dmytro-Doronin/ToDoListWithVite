import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {appActions} from "../../state/appReducer/appReducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomizedSnackbars = () =>  {
    const error = useAppSelector<null | string>(state => state.app.error)
    const dispatch = useAppDispatch()
    // @ts-ignore
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(appActions.setError({error: null}))

    };

    return (
        <Snackbar open={!!error} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    );
}

