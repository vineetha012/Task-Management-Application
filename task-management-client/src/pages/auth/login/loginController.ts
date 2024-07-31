import { setEmailErrorMessage, setPasswordErrorMessage } from "../../../reduxStore/reducer/errorMessageReducer";
import { doValidateEmail, doValidatePassword } from "../../../utils/errorsHandler";

export interface loginInfoTypes {
    email: string;
    password: string;
}
export const loginInfoInitialState = { email: '', password: '' };
export const loginFieldErrorValidation = (
    event: React.ChangeEvent<HTMLInputElement>,
    dispatch: any
) => {
    const { name, value }: any = event.target;
    switch (name) {
        case "email":
            if (value === "") {
                dispatch(setEmailErrorMessage("User Name field should not be empty"));

            } else {
                dispatch(setEmailErrorMessage(""));
            }
            break;
        case "password":
            if (value === "") {
                dispatch(setPasswordErrorMessage("Password field should not be empty"));
            } else {
                dispatch(setPasswordErrorMessage(""));
                return true;
            }
            break

    }
};

export const checkErrorsLogin = (dispatch: any, data: loginInfoTypes) => {
    doValidateEmail(data.email, dispatch);
    doValidatePassword(data.password, dispatch);

    if (
        doValidateEmail(data.email, dispatch) &&
        doValidatePassword(data.password, dispatch)
    ) {
        return true;
    }
    return false;
};

export const emptyLoginErrorMessages = (dispatch: any) => {
    dispatch(setEmailErrorMessage(""))
    dispatch(setPasswordErrorMessage(""))
}
