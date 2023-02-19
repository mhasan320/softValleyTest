import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    role: string;
  name: string;
  email: string;
}

const initialState: UserState = {
  role: '',
  name: "",
  email: "",
};

export const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    userSliceData: (state: any, action: PayloadAction<UserState>) => {
      (state.role = action.payload.role),
        (state.name = action.payload.name),
        (state.email = action.payload.email);
    },
  },
});

// Action creators are generated for each case reducer function
export const { userSliceData } = userSlice.actions;

export default userSlice.reducer;