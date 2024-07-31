import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
export const Adminreset = createAction("counter/reset");

type InitialState = {
  nameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrMessage: string,
  taskTitleErrMessage: string,
};
const initialState: InitialState = {
  nameErrorMessage: '',
  emailErrorMessage: '',
  passwordErrMessage: '',
  taskTitleErrMessage: '',

};

const errorSlice = createSlice({
  name: "errorSlice",
  initialState,
  reducers: {
    setNameErrorMessage: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.nameErrorMessage = action.payload;
    },
    setEmailErrorMessage: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.emailErrorMessage = action.payload;
    },
    setPasswordErrorMessage: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.passwordErrMessage = action.payload;
    },
    setTaskTitleErrorMessage: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.taskTitleErrMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Adminreset, (state) => {
      return initialState;
    });
  },

});
export default errorSlice.reducer;
export const {
 setNameErrorMessage,
 setEmailErrorMessage,
 setPasswordErrorMessage,
  setTaskTitleErrorMessage
} = errorSlice.actions;

