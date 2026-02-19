import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Setting } from "@/types";

export interface SettingState {
  setting: Setting | null;
}

const initialState: SettingState = {
  setting: null,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    getSetting: (state, action: PayloadAction<Setting>) => {
      state.setting = action.payload;
    },
    clearSetting: (state) => {
      state.setting = null;
    }
  },
});

export const { getSetting, clearSetting } = settingSlice.actions;
export default settingSlice.reducer;
