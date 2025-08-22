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

export const createResource = createAsyncThunk("resources/create", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.createResource(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const updateResource = createAsyncThunk("resources/update", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.updateResource(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const deleteResource = createAsyncThunk("resources/delete", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.deleteResource(formData);

		if (payload) {
			notify("success", "Resource deleted");
			return payload;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
