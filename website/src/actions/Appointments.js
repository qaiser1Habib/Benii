import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../middlewares/apis";
import { apiErrorHandler } from "./apiErrorHandler";

export const getAppointments = createAsyncThunk("appointments/fetchAll", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.getAppointments(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const createAppointment = createAsyncThunk("appointment/create", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.createAppointment(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
export const updateAppointment = createAsyncThunk("appointment/update", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.updateAppointment(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
export const deleteAppointment = createAsyncThunk("appointment/delete", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.deleteAppointment(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
