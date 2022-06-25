import { createSlice } from "@reduxjs/toolkit";
import socket from "../configSocket";




const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: socket,
        status: ''
    },
    reducers: {
        createSocketSuccess: (state) => {
            state.status = 'success'
        }
    }
})

export default socketSlice.reducer