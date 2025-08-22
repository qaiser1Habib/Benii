import { createSlice } from "@reduxjs/toolkit";
import { getServices, createService, updateService, deleteService } from "../../actions/services.js";

const initialState = { all: [] };

const serviceSlice = createSlice({
	name: "services",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getServices.fulfilled, (state, action) => {
				return { ...state, all: action?.payload || [] };
			})
			.addCase(createService.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: [...state.all, action.payload] };
			})
			.addCase(updateService.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: state.all.map((item) => (item._id === payload?._id ? payload : item)) };
			})
			.addCase(deleteService.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: state.all.filter((item) => item._id !== payload._id) };
			});
	},
});

export default serviceSlice.reducer;
