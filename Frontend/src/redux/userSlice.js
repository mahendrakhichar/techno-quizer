import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // No user logged in initially
  loggedIn: false, // User is not logged in initially
};

const userSlice = createSlice({
  name: "user", // Consistent with the reducer name in the store
  initialState,
  reducers: {
    // Login action: Sets the user and marks them as logged in
    logIn: (state, action) => {
      state.user = action.payload; // Assign the payload (user data) to the state
      console.log("redux",action.payload)
      state.loggedIn = true; // Mark the user as logged in
    },

    // Logout action: Clears the user and marks them as logged out
    logout: (state) => {
      state.user = null; // Clear the user data
      state.loggedIn = false; // Mark the user as logged out
    },
  },
});

export const { logIn, logout } = userSlice.actions; // Exporting actions to be dispatched

export default userSlice.reducer; // Export the reducer to be used in the store
