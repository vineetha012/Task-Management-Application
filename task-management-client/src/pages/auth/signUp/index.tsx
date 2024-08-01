import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import styles from '../login/login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useCustomNavigate } from '../../../reduxStore/hooks/hooks';
import { setEmailErrorMessage, setPasswordErrorMessage } from '../../../reduxStore/reducer/errorMessageReducer';
import { checkErrorssignUp, emptySignUpErrorMessages, signUpFieldErrorValidation, signupInfoInitialState, signupInfoTypes } from './signupController';
import { doValidateEmail, doValidateName, doValidatePassword } from '../../../utils/errorsHandler';
import { useLoginMutation } from '../../../services/login';
import { toast } from 'react-toastify';
import { PATH } from '../../../constants/path';
import { useSignUpMutation } from '../../../services/signUp';
// import { loginUser } from '../../redux/slices/authSlice';

const Login: React.FC = () => {
    const [signupInfo, setsignupInfo] = useState<signupInfoTypes>(signupInfoInitialState);
    const dispatch: any = useAppDispatch();
    const navigate = useCustomNavigate()
    const { nameErrorMessage, emailErrorMessage, passwordErrMessage } = useAppSelector((state) => state.errorMessageReducer);
    const [signupApi, { isLoading: signUpApiIsLoading }]: any = useSignUpMutation();
    const loginHandler = async (event: any) => {
        event.preventDefault();
        if (checkErrorssignUp(dispatch, signupInfo)) {
            await signupApi(signupInfo).unwrap()
                .then((payload: any) => {
                    navigate(PATH.LOGIN)
                    toast.success(payload?.message||'register successful')
                })

                .catch((error: any) => toast.error(error?.data?.error?.message || 'Login successful'))
        }
    };

    const doGetsignupInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setsignupInfo((prevState) => ({
            ...prevState,
            [name]: value.trim(),
        }));
        signUpFieldErrorValidation(event, dispatch)
    }
    useEffect(() => {
        return () => {
            setsignupInfo(signupInfoInitialState)
            emptySignUpErrorMessages(dispatch)
        }
    }, [])
    return (
        <>
            <div className={styles.container}>
                <h2 className={styles['task-manager-header']}>Task Manager</h2>

                <div className={styles['login-container']}>
                    <div className={styles['image-container']}></div>
                    <div className={styles['form-container']}>
                        <h2 className={styles.header}>SignUp</h2>
                        <Form >
                            <Form.Group className={styles['form-group']} controlId="formBasicEmail">
                                <Form.Label>User Name*</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="userName"
                                    placeholder="Enter User Name"
                                    value={signupInfo.userName}
                                    onChange={doGetsignupInfo}
                                    onBlur={(event) => doValidateName(event.target.value, dispatch)}
                                />
                                {nameErrorMessage && <div className={styles['error-message']}>{nameErrorMessage}</div>}

                            </Form.Group>
                            <Form.Group className={styles['form-group']} controlId="formBasicEmail">
                                <Form.Label>Email address*</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={signupInfo.email}
                                    onChange={doGetsignupInfo}
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
                                    value={signupInfo.password}
                                    onChange={doGetsignupInfo}
                                    onBlur={(event) => doValidatePassword(event.target.value, dispatch)}
                                />
                                {passwordErrMessage && <div className={styles['error-message']}>{passwordErrMessage}</div>}
                            </Form.Group>

                            <Button variant="primary" disabled={signUpApiIsLoading} type="submit" onClick={loginHandler} className={styles['btn-primary']}>
                                {signUpApiIsLoading?'Loading..':'SignUp'}
                            </Button>
                            <div className="mt-3 text-center">
                                Don't have an account? <Link to="/">Login</Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Login;
