import secureLocalStorage from "react-secure-storage";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiErrorHandler } from "./apiErrorHandler";

export const getAppPreferences = createAsyncThunk("appPreferences/fetch", async (notify, { dispatch }) => {
	try {
		const payload = await secureLocalStorage.getItem("appPreferences");

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
		return null;
	}
});

export const updateAppPreferences = createAsyncThunk("appPreferences/update", async ({ formData, notify }, { dispatch }) => {
	try {
		const payload = secureLocalStorage.getItem("appPreferences");
		await secureLocalStorage.setItem("appPreferences", { ...payload, ...formData });

		if (payload) return { ...payload, ...formData };
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
		return null;
	}
});
