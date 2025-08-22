import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../middlewares/apis";
import { apiErrorHandler } from "./apiErrorHandler";

export const getBlogs = createAsyncThunk("blogs/fetchAll", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.getBlogs(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const createBlog = createAsyncThunk("blogs/create", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.createBlog(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const updateBlog = createAsyncThunk("blogs/update", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.updateBlog(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const deleteBlog = createAsyncThunk("blogs/delete", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.deleteBlog(formData);

		if (payload) {
			notify("success", "Blog deleted");
			return payload;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
