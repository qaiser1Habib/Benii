import { createSlice } from "@reduxjs/toolkit";
import { getResources, createResource, updateResource, deleteResource } from "../../actions/resources";

const resourceSlice = createSlice({
	name: "resources",
	initialState: {
		all: [],
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getResources.fulfilled, (state, action) => {
				return { ...state, all: action?.payload || [] };
			})
			.addCase(createResource.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: [...state.all, payload] };
			})
			.addCase(updateResource.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: state.all.map((item) => (item._id === payload._id ? payload : item)) };
			})
			.addCase(deleteResource.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: state.all.filter((item) => item._id !== payload._id) };
			});
	},
});

export default resourceSlice.reducer;
