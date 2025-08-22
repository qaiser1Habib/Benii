import { createSlice } from "@reduxjs/toolkit";
import { getBlogs, createBlog, deleteBlog, updateBlog } from "../../actions/blogs";

const blogSlice = createSlice({
	name: "blogs",
	initialState: {
		all: [],
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getBlogs.fulfilled, (state, action) => {
				return { ...state, all: action?.payload || [] };
			})
			.addCase(createBlog.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: [...state.all, payload] };
			})
			.addCase(updateBlog.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: state.all.map((item) => (item._id === payload._id ? payload : item)) };
			})
			.addCase(deleteBlog.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: state.all.filter((item) => item._id !== payload._id) };
			});
	},
});

export default blogSlice.reducer;
