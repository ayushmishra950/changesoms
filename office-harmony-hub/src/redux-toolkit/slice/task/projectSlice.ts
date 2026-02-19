import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    projects: []
}


const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        getProjects: (state, action: PayloadAction<any[]>) => {
            state.projects = action.payload;
        }
    }
});


export const { getProjects } = projectSlice.actions;
export default projectSlice.reducer;