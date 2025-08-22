import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentPage: "stats",
};

const dashboardPreferenceSlice = createSlice({
	name: "dashboardPreferences",
	initialState,
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action?.payload;
		},
	},
});

export const { setCurrentPage } = dashboardPreferenceSlice.actions;

export default dashboardPreferenceSlice.reducer;
