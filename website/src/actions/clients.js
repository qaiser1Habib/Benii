import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../middlewares/apis";
import { apiErrorHandler } from "./apiErrorHandler";

export const createClientByTherapist = createAsyncThunk("user/client/register", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.createClientByTherapist(formData);

		if (payload) {
			notify("success", "Successfully Created!");
			return payload;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const removeClientByTherapist = createAsyncThunk("user/remove", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.removeClientByTherapist(formData);

		if (payload) {
			notify("success", "User deleted successfully");
			return payload;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
		return null;
	}
});
