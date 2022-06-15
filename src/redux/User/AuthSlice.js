import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isSuccess: false,
            isError: false,
            isFetching: false,
        },
        register: {
            isFetching: false,
            isError: false,
            isSuccess: false,
        },
        logout: {
            isFetching: false,
            isError: false,
            isSuccess: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.isSuccess = true
            state.login.currentUser = action.payload
            state.login.isError = false
        },
        loginFailed: (state) => {
            state.login.isError = true
            state.login.isFetching = false
        },
        registerStart: (state) => {
            state.register.isFetching = true
        },
        registerSuccess: (state) => {
            state.register.isFetching = false
            state.register.isSuccess = true
            state.register.isError = false
        },
        registerFailed: (state) => {
            state.register.isFetching = false
            state.register.isSuccess = false
            state.register.isError = true
        },
        logOutStart: (state) => {
            state.logout.isFetching = true
        },
        logOutSuccess: (state) => {
            state.logout.isFetching = false
            state.login.currentUser = null
            state.logout.isSuccess = true
            state.logout.isError = false
        },
        logOutFailed: (state) => {
            state.logout.isError = true
            state.logout.isSuccess = false
            state.logout.isFetching = false
        },
    }
})

export const {
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    loginFailed,
    registerFailed,
    registerStart,
    registerSuccess,

} = authSlice.actions

export default authSlice.reducer