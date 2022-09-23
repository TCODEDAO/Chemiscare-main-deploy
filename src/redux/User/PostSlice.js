import {  createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        status: 'loading',
        message: '',
        thread: {
            content: []
        },
    },
    reducers: {
        getPostStart: (state) => {
            state.status = 'loading'
        },
        getPostSuccess: (state, action) => {
            state.status = 'success'

            state.posts = action.payload

        },
        addPostSuccess: (state, action) => {
            state.posts = [...state.posts, action.payload]
        },
        getPostFailed: (state) => {
            state.status = 'failed'
        },

        getThreadSuccess: (state, action) => {
            state.thread.content = action.payload
        },
        setThread: (state, action) => {
            console.log('action.payload: ', action.payload)


            state.thread.content = [...state.thread.content, action.payload.data]


        }

    },

})

export const {
    getPostStart,
    getPostSuccess,
    getPostFailed,
    getThreadSuccess,
    setThread,
    addPostSuccess,
} = postSlice.actions

export default postSlice.reducer