import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    departments: []
}


const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {
        getDepartment: (state, action: PayloadAction<any[]>) => {
            state.departments = action.payload;
        }
    }
});

export const { getDepartment } = departmentSlice.actions;

export default departmentSlice.reducer;