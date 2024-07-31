import { setEmailErrorMessage, setTaskTitleErrorMessage, setNameErrorMessage, setPasswordErrorMessage } from "../reduxStore/reducer/errorMessageReducer";

export const doValidateEmail = (fieldValue: any, dispatch: any) => {
    let emailRegEx: RegExp =
        /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/i;
    if (fieldValue) {
        if (emailRegEx.test(fieldValue)) {
            dispatch(setEmailErrorMessage(""));
            return true;
        } else {
            dispatch(setEmailErrorMessage("Email is not valid"));
        }
    } else {
        dispatch(setEmailErrorMessage("Email field is required"));
    }
};
export const doValidatePassword = (password: any, dispatch: any) => {
    if (password) {
        if (password.length < 8) {
            dispatch(setPasswordErrorMessage("Password must be at least 8 characters long"));
        } else {
            return true;
        }
    } else {
        dispatch(setPasswordErrorMessage("Kindly enter the Password"));
    }
};
export const doValidateName = (fieldValue: any, dispatch: any) => {
    if (fieldValue) {
        return true;
    } else {
        dispatch(setNameErrorMessage("User Name field should not be empty"));
    }
}; 
export const doValidateTaskTitle = (fieldValue: any, dispatch: any) => {
    if (fieldValue) {
        return true;
    } else {
        dispatch(setTaskTitleErrorMessage("Title field should not be empty"));
    }
};