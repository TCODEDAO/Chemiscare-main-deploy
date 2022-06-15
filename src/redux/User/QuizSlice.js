import { createSlice } from "@reduxjs/toolkit"

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        question: {
            questionList: [],
            isFetching: false,
            isSuccess: false,
            isError: false
        },
        score: {
            currentScore: 0,
        },
        time: {
            counter: 0,
        },
        round: {
            currentRound: 1,
        },

    },
    reducers: {
        getQuestionStart: (state) => {
            state.question.isFetching = true
        },
        getQuestionSuccess: (state, action) => {
            state.question.isFetching = false
            state.question.isSuccess = true
            state.question.questionList = action.payload
        },
        getQuestionFailed: (state) => {
            state.question.isFetching = false
            state.question.isError = true
        },
        socreIncrease: (state) => {
            state.score.currentScore = state.score.currentScore += 10
        },
        timeIncrease: (state) => {
            state.time.counter = state.time.counter + 1
        },
        setRound: (state, action) => {
            state.round.currentRound = action.payload
        },
        clearDataToNewRound: (state) => {
            state.score.currentScore = 0
            state.time.counter = 0

        }
    }
})

export const {
    getQuestionStart,
    getQuestionFailed,
    getQuestionSuccess,
    socreIncrease,
    timeIncrease,
    setRound,
    clearDataToNewRound

} = quizSlice.actions

export default quizSlice.reducer