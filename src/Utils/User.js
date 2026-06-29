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
        },
        
        updatePost : (state, action) => {
            const { postId, updatedFields } = action.payload
            return {
                ...state,
                posts: state.posts.map((p) =>
                    p._id === postId ? { ...p, ...updatedFields } : p
                ),
            }
        }
    }
})

export default userSlice.reducer
export const { userReducer, clearUser, updatePost } = userSlice.actions