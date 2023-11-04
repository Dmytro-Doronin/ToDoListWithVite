
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {loginThunk} from "../../state/authReducer/authThunks";
import {Navigate} from "react-router-dom";
import c from './loginPage.module.css'

export type LoginType = {
    email: string,
    password: string,
    rememberMe: boolean
}

type FormikErrorType = {
    email?: string,
    password?: string,
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password?.trim().length < 3) {
                errors.password = 'Should be more three symbols ';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(loginThunk(values))
            formik.resetForm()

        }
    })

    if (isLoggedIn) {
        return <Navigate to='/'/>
    }

    return <Grid container className={c.loginPage} justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl >
                    <FormLabel>
                        <p>Use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            // name="email"
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email && formik.touched.email &&
                            <div style={{ color: 'red'}}>{formik.errors.email}</div>
                        }
                        <TextField
                            // name='password'
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password && formik.touched.password &&
                            <div style={{ color: 'red'}}>{formik.errors.password}</div>
                        }
                        <FormControlLabel
                            // name='rememberMe'
                            label={'Remember me'}
                            control={<Checkbox/>}
                            checked={formik.values.rememberMe}
                            {...formik.getFieldProps("rememberMe")}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}