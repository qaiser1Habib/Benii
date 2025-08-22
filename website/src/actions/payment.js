import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../middlewares/apis";
import { apiErrorHandler } from "./apiErrorHandler";

export const getPaymentCheckoutSession = createAsyncThunk("payments/purchase", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.getPaymentCheckoutSession(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
		return null;
	}
});

export const cancelSubscriptionPlan = async (formData, notify, dispatch) => {
	try {
		const { payload } = await api.cancelSubscriptionPlan(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
};
