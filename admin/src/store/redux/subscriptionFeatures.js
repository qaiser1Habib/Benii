import { createSlice } from "@reduxjs/toolkit";
import {
	getSubscriptionFeatures,
	createSubscriptionFeature,
	deleteSubscriptionFeature,
	updateSubscriptionFeature,
} from "../../actions/subscriptionFeatures";

const initialState = {
	all: [],
};

const subscriptionFeatureSlice = createSlice({
	name: "subscriptionFeatures",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getSubscriptionFeatures.fulfilled, (state, action) => {
				if (Array.isArray(action.payload)) state.all = action.payload;
			})
			.addCase(createSubscriptionFeature.fulfilled, (state, action) => {
				state.all.push(action.payload);
			})
			.addCase(updateSubscriptionFeature.fulfilled, (state, action) => {
				state.all = state.all.map((item) => (item._id === action.payload._id ? action.payload : item));
			})
			.addCase(deleteSubscriptionFeature.fulfilled, (state, action) => {
				state.all = state.all.filter((item) => item._id !== action.payload._id);
			});
	},
});
export default subscriptionFeatureSlice.reducer;
