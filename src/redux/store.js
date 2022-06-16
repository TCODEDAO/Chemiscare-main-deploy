
import { combineReducers } from "redux";

import { persistStore } from "redux-persist"
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage"
import { configureStore } from '@reduxjs/toolkit'
//Slice
import AuthSlice from "./User/AuthSlice"
import QuizSlice from "./User/QuizSlice"
import QuestionManagementSlice from "./Admin/QuestionManagementSlice";
const rootReducer = combineReducers({
    auth: AuthSlice,
    quiz: QuizSlice,
    questionManagement: QuestionManagementSlice
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
export const persistor = persistStore(store)