import { setEmailErrorMessage, setNameErrorMessage, setPasswordErrorMessage, setTaskTitleErrorMessage } from "../../../reduxStore/reducer/errorMessageReducer";
import { doValidateEmail, doValidateName, doValidatePassword, doValidateTaskTitle } from "../../../utils/errorsHandler";
export interface taskIntrface {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    deadline: Date | null;
    status: 'to-do' | 'inprogress' | 'under-review' | 'completed';
}

export const taskInfoInitialState: taskIntrface = {
    title: '',
    description: '',
    priority: 'high',
    deadline: null,
    status: 'to-do'
};
export const taskFieldErrorValidation = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    dispatch: any
) => {
    const { name, value }: any = event.target;
    switch (name) {
        case "title":
            if (value === "") {
                dispatch(setTaskTitleErrorMessage("Title field should not be empty"));
            } else {
                dispatch(setTaskTitleErrorMessage(""));
            }
            break;
    }
};

export const checkErrorstask = (dispatch: any, data: taskIntrface) => {
    doValidateTaskTitle(data.title, dispatch)
    if (doValidateTaskTitle(data.title, dispatch)){
        return true;
    }
    return false;
};

export const emptytaskErrorMessages = (dispatch: any) => {
    dispatch(setNameErrorMessage(""))
    dispatch(setEmailErrorMessage(""))
    dispatch(setPasswordErrorMessage(""))
}
