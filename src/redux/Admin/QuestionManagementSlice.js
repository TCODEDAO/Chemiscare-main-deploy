import { createSlice } from '@reduxjs/toolkit'
const questionManagementSlice = createSlice({
    name: 'questionManagement',
    initialState: {
        questionList: [],
        status: '',
    },
    reducers: {
        adminGetQuestionStart(state) {
            state.status = 'Đang tải...'
        },
        adminGetQuestionSuccess(state, action) {
            state.status = 'Hoàn thành'
            state.questionList = action.payload
        },
        adminGetQuestionFailed(state, action) {
            state.status = 'Hoàn thành'
            console.log('error: ', action.payload)
        }
    },
})
export const {
    adminGetQuestionStart,
    adminGetQuestionSuccess,
    adminGetQuestionFailed
} = questionManagementSlice.actions
export default questionManagementSlice.reducer
