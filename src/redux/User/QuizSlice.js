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
        task: { currentTask: 1 },
        result: [],
        allResultHistory: [],
        resultAllUser: []
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
            console.log(action.payload);
            state.round.currentRound = action.payload
        },
        setTask: (state, action) => {
            state.task.currentTask = action.payload
        },
        setResult: (state, action) => {
            state.result = action.payload
        },
        setHistoryResult: (state, action) => {
            state.allResultHistory = action.payload
        },
        clearDataToNewRound: (state) => {
            state.score.currentScore = 0
            state.time.counter = 0

        },
        setResultAllUser: (state, action) => {
            state.resultAllUser = action.payload

        },
        addResultAllUser: (state, action) => {
            state.resultAllUser = [action.payload, ...state.resultAllUser]
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
    clearDataToNewRound,
    setResult,
    setTask,
    setHistoryResult,
    setResultAllUser,
    addResultAllUser

} = quizSlice.actions

export default quizSlice.reducer