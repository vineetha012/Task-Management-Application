import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/index";

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({
        baseUrl: config().BASE_URL,
        prepareHeaders: (headers: any) => {
            headers.set(
                "Authorization",
                `Bearer ${localStorage.getItem("app-token")}`
            );
            return headers;
        },
    }),
    tagTypes: ["task"],
    endpoints: (builder) => ({
        getTasksList: builder.query<any, void>({
            query: () => ({
                url: "/task",
                method: "GET",
            }),
            providesTags: ["task"],
        }),
        createTask: builder.mutation<any, {task:any}>({
            query: (task) => ({
                url: "/task",
                method: "POST",
                body: task
            }),
            invalidatesTags: ["task"],
        }),
        editTask: builder.mutation<any,any>({
            query: ({task,id}) => ({
                url: `/task/${id}`,
                method: "PUT",
                body: task
            }),
            invalidatesTags: ["task"],
        }),
        deleteTask: builder.mutation<any,any>({
            query: (id) => ({
                url: `/task/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["task"],
        }),
    }),
});

export const {
    useGetTasksListQuery,
    useCreateTaskMutation,
    useEditTaskMutation,
    useDeleteTaskMutation
} = taskApi;
