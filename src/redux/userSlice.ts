import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isAuthenticated: boolean;
}

const initialState: UserState = {
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticatedStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthenticatedStatus } = userSlice.actions;

export default userSlice.reducer;
