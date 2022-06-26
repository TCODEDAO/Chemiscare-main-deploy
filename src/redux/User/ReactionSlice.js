import { createSlice } from "@reduxjs/toolkit"



const reactionSlice = createSlice({
    name: 'reaction',
    initialState: {
        count: {
            comments: 0,
            votes: 0
        },
        comments: []
    },
    reducers: {
        setCountComments: (state, action) => {
            state.count.comments = action.payload
        },
        setCountVotes: (state, action) => {
            state.count.votes = action.payload
        },
        setComments: (state, action) => {
            state.comments = action.payload
        },
        addOneComment: (state, action) => {
            state.comments = [action.payload, ...state.comments]
        }
    },

})

export const {
    setCountComments,
    setCountVotes,
    setComments,
    addOneComment
} = reactionSlice.actions

export default reactionSlice.reducer