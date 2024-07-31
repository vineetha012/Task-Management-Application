import { setEmailErrorMessage, setNameErrorMessage, setPasswordErrorMessage } from "../../../reduxStore/reducer/errorMessageReducer";
import { doValidateEmail, doValidateName, doValidatePassword } from "../../../utils/errorsHandler";

export interface signupInfoTypes {
    userName: string,
    email: string;
    password: string;
}
export const signupInfoInitialState = { userName:'', email: '', password: '' };
export const signUpFieldErrorValidation = (
    event: React.ChangeEvent<HTMLInputElement>,
    dispatch: any
) => {
    const { name, value }: any = event.target;
    switch (name) {
        case "userName":
            if (value === "") {
                dispatch(setNameErrorMessage("User Name field should not be empty"));
            } else {
                dispatch(setNameErrorMessage(""));
            }
            break;
        case "email":
            if (value === "") {
                dispatch(
                    setEmailErrorMessage("Email field is required")
                );
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

export const checkErrorssignUp = (dispatch: any, data: signupInfoTypes) => {
    doValidateName(data.userName, dispatch)
    doValidateEmail(data.email, dispatch);
    doValidatePassword(data.password, dispatch);

    if (
        doValidateName(data.userName, dispatch)&&
        doValidateEmail(data.email, dispatch) &&
        doValidatePassword(data.password, dispatch)
    ) {
        return true;
    }
    return false;
};

export const emptySignUpErrorMessages = (dispatch: any) => {
    dispatch(setNameErrorMessage(""))
    dispatch(setEmailErrorMessage(""))
    dispatch(setPasswordErrorMessage(""))
}
