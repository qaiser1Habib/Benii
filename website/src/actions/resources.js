import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../middlewares/apis";
import { apiErrorHandler } from "./apiErrorHandler";

export const getResources = createAsyncThunk("resources/fetchAll", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.getResources(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
