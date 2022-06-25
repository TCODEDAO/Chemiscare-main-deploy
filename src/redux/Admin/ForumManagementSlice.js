import { createSlice } from '@reduxjs/toolkit'
const forumManagementSlice = createSlice({
    name: 'forumManagementSlice',
    initialState: {
        threads: [],
        posts: [],

    },
    reducers: {
        adminGetThreadSuccess: (state, action) => {
            state.threads = action.payload
        },
        adminGetPostsSuccess: (state, action) => {
            state.posts = action.payload
        },
        addPostRealtime: (state, action) => {
            state.posts = [action.payload, ...state.posts]
        }
    },
})
export const {
    adminGetThreadSuccess,
    adminGetPostsSuccess,
    addPostRealtime
} = forumManagementSlice.actions
export default forumManagementSlice.reducer
