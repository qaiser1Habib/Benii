import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../middlewares/apis";
import { apiErrorHandler } from "./apiErrorHandler";

export const getSubscriptionFeatures = createAsyncThunk(
	"subscriptions/features/fetchAll",
	async ({ formData, notify }, { dispatch }) => {
		try {
			const { payload } = await api.getSubscriptionFeatures(formData);

			if (payload) return payload;
		} catch (error) {
			dispatch(apiErrorHandler(error, notify));
		}
	}
);

export const createSubscriptionFeature = createAsyncThunk(
	"subscriptions/features/create",
	async ({ formData, notify, uploadProgress }, { dispatch }) => {
		try {
			const { payload } = await api.createSubscriptionFeature(formData, uploadProgress);

			if (payload) return payload;
		} catch (error) {
			dispatch(apiErrorHandler(error, notify));
		}
	}
);

export const updateSubscriptionFeature = createAsyncThunk(
	"subscriptions/features/update",
	async ({ formData, notify, uploadProgress }, { dispatch }) => {
		try {
			const { payload } = await api.updateSubscriptionFeature(formData, uploadProgress);

			if (payload) return payload;
		} catch (error) {
			dispatch(apiErrorHandler(error, notify));
		}
	}
);

export const deleteSubscriptionFeature = createAsyncThunk(
	"subscriptions/features/delete",
	async ({ formData, notify }, { dispatch }) => {
		try {
			const { payload } = await api.deleteSubscriptionFeature(formData);

			if (payload) {
				notify("success", "Subscription Feature deleted");
				return payload;
			}
		} catch (error) {
			dispatch(apiErrorHandler(error, notify));
		}
	}
);
