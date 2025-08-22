import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../middlewares/apis";
import { apiErrorHandler } from "./apiErrorHandler";

export const getSubscriptions = createAsyncThunk("subscriptions/fetchAll", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.getSubscriptions(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const createSubscription = createAsyncThunk(
	"subscriptions/create",
	async ({ formData, notify, uploadProgress }, { dispatch }) => {
		try {
			const { payload } = await api.createSubscription(formData, uploadProgress);

			if (payload) return payload;
		} catch (error) {
			dispatch(apiErrorHandler(error, notify));
		}
	}
);

export const updateSubscription = createAsyncThunk(
	"subscriptions/update",
	async ({ formData, notify, uploadProgress }, { dispatch }) => {
		try {
			const { payload } = await api.updateSubscription(formData, uploadProgress);

			if (payload) return payload;
		} catch (error) {
			dispatch(apiErrorHandler(error, notify));
		}
	}
);

export const deleteSubscription = createAsyncThunk("subscriptions/delete", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.deleteSubscription(formData);

		if (payload) {
			notify("success", "Subscription deleted");
			return payload;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
