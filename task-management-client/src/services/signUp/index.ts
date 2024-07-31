import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/index";
import { loginInfoTypes } from "../../pages/auth/login/loginController";

export const signUpApi = createApi({
    reducerPath: "signUp",
    baseQuery: fetchBaseQuery({
        baseUrl: config().BASE_URL,
    }),
    tagTypes: ["signUp"],
    endpoints: (builder) => ({
        signUp: builder.mutation < any, {loginInfo: loginInfoTypes} >({
            query: (loginInfo) => ({
                url: "/register",
                method: "POST",
                body: loginInfo
            }),
            invalidatesTags: ["signUp"],
        }),
    }),
});

export const {
    useSignUpMutation
} = signUpApi
