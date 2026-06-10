import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {},
    reducers : {
        userReducer : (state, action) => {
            return action.payload
        },
        clearUser : () => {
            return {} 
        }
    }
})

export default userSlice.reducer
export const { userReducer, clearUser } = userSlice.actions