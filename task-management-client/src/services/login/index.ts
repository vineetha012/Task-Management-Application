import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/index";
import { loginInfoTypes } from "../../pages/auth/login/loginController";

export const loginApi = createApi({
    reducerPath: "login",
    baseQuery: fetchBaseQuery({
        baseUrl: config().BASE_URL,
    }),
    tagTypes: ["login"],
    endpoints: (builder) => ({
        login: builder.mutation < any, {loginInfo: loginInfoTypes} >({
            query: (loginInfo) => ({
                url: "/user-login",
                method: "POST",
                body: loginInfo
            }),
            invalidatesTags: ["login"],
        }),
    }),
});

export const {
    useLoginMutation
} = loginApi
