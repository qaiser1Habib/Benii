import { createSlice } from "@reduxjs/toolkit";
import { getBlogs } from "../../actions/blogs.js";

const blogSlice = createSlice({
	name: "blogs",
	initialState: {
		all: [],
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getBlogs.fulfilled, (state, action) => {
			return { ...state, all: action?.payload || [] };
		});
	},
});

export default blogSlice.reducer;
