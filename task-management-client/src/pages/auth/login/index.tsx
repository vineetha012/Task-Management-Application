import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useCustomNavigate } from '../../../reduxStore/hooks/hooks';
import { setEmailErrorMessage, setPasswordErrorMessage } from '../../../reduxStore/reducer/errorMessageReducer';
import { checkErrorsLogin, emptyLoginErrorMessages, loginFieldErrorValidation, loginInfoInitialState, loginInfoTypes } from './loginController';
import { doValidateEmail, doValidatePassword } from '../../../utils/errorsHandler';
import { useLoginMutation } from '../../../services/login';
import { toast } from 'react-toastify';
import { PATH } from '../../../constants/path';
// import { loginUser } from '../../redux/slices/authSlice';

const Login: React.FC = () => {
    const [loginInfo, setLoginInfo] = useState<loginInfoTypes>(loginInfoInitialState);
    const dispatch: any = useAppDispatch();
    const navigate = useCustomNavigate()
    const { emailErrorMessage, passwordErrMessage } = useAppSelector((state) => state.errorMessageReducer);
    const [LoginApi, {
        data: loginApiResponse,
        isError: loginApiError,
        isLoading: loginApiIsLoading,
        isFetching: loginApiIsFetching,
        isSuccess: loginApiIsSuccess,
        error: loginError,
    },
    ]: any = useLoginMutation();
    const loginHandler = async (event: any) => {
        event.preventDefault();
        if (checkErrorsLogin(dispatch, loginInfo)) {
            await LoginApi(loginInfo).unwrap()
                .then((payload: any) => {
                    setLoginInfo(loginInfoInitialState)
                    emptyLoginErrorMessages(dispatch)
                    localStorage.setItem('app-token', payload?.data?.token)
                    toast.success(payload?.message||'Login successful')
                    navigate(PATH.TASKLIST)
                }).catch((error: any) => toast.error(error?.data?.error?.message || 'Login successful'))
        }
    };

    const doGetLoginInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginInfo((prevState) => ({
            ...prevState,
            [name]: value.trim(),
        }));
        loginFieldErrorValidation(event, dispatch)
    }
    useEffect(() => {
        return () => {
            setLoginInfo(loginInfoInitialState)
            emptyLoginErrorMessages(dispatch)
        }
    }, [])
    return (
        <>
            <div className={styles.container}>

                <div className={styles['login-container']}>
                    <div className={styles['image-container']}></div>
                    <div className={styles['form-container']}>
                        <h2 className={styles.header}>Login</h2>
                        <Form >
                            <Form.Group className={styles['form-group']} controlId="formBasicEmail">
                                <Form.Label>Email address*</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={loginInfo.email}
                                    onChange={doGetLoginInfo}
                                    onBlur={(event) => doValidateEmail(event.target.value, dispatch)}
                                />
                                {emailErrorMessage && <div className={styles['error-message']}>{emailErrorMessage}</div>}

                            </Form.Group>

                            <Form.Group className={styles['form-group']} controlId="formBasicPassword">
                                <Form.Label>Password*</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={loginInfo.password}
                                    onChange={doGetLoginInfo}
                                    onBlur={(event) => doValidatePassword(event.target.value, dispatch)}
                                />
                                {passwordErrMessage && <div className={styles['error-message']}>{passwordErrMessage}</div>}
                            </Form.Group>

                            <Button variant="primary" disabled={loginApiIsLoading} type="submit" onClick={loginHandler} className={styles['btn-primary']}>
                                {loginApiIsLoading ? 'Loading..' : 'Login'}

                            </Button>
                            <div className="mt-3 text-center">
                                Don't have an account? <Link to="/signup">Sign up</Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Login;
