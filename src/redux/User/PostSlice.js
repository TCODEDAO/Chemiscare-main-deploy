import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        status: 'loading',
        message: ''
    },
    reducers: {
        getPostStart: (state) => {
            state.status = 'loading'
        },
        getPostSuccess: (state, action) => {
            state.status = 'success'
            state.posts = [...action.payload, ...state.posts]
        },
        getPostFailed: (state) => {
            state.status = 'failed'

        }
    },

})

export const {
    getPostStart,
    getPostSuccess,
    getPostFailed

} = postSlice.actions

export default postSlice.reducer