import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: null,
    loggedInAdmin : false,
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers:{
        logIn:(state, action)=>{
            state.admin = action.payload;
            state.loggedInAdmin = true;
        },
        logout:(state,action)=>{
            state.admin = null;
            state.loggedInAdmin = false;
        },
    },
});

export const {logIn, logout} = adminSlice.actions;
export default adminSlice.reducer;