import { createSlice } from "@reduxjs/toolkit";
import { getResources } from "../../actions/resources.js";

const resourceSlice = createSlice({
	name: "resources",
	initialState: {
		all: [],
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getResources.fulfilled, (state, action) => {
			return { ...state, all: action?.payload || [] };
		});
	},
});

export default resourceSlice.reducer;
