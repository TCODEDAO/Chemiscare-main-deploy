import { createSlice } from '@reduxjs/toolkit'
const PermissionSlice = createSlice({
    name: 'PermissionSlice',
    initialState: {
        isAdmin:false
    },
    reducers: {
        checkPermissison:(state,action)=>{
state.isAdmin = action.payload
        }
    },
})
export const {
checkPermissison
} = PermissionSlice.actions
export default PermissionSlice.reducer
