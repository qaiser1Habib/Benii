import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../middlewares/apis";
import { apiErrorHandler } from "./apiErrorHandler";

export const getServices = createAsyncThunk("services/fetchAll", async ({ formData }, { dispatch }) => {
	try {
		const { payload } = await api.getServices(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const createService = createAsyncThunk("service/create", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.createService(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
export const updateService = createAsyncThunk("service/update", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.updateService(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
export const deleteService = createAsyncThunk("service/delete", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.deleteService(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
