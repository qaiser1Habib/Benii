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
