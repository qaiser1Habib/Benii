import { createSlice } from "@reduxjs/toolkit";
import { getSubscriptionFeatures } from "../../actions/subscriptionFeatures";

const initialState = {
	all: [],
};

const subscriptionFeatureSlice = createSlice({
	name: "subscriptionFeatures",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getSubscriptionFeatures.fulfilled, (state, action) => {
			if (Array.isArray(action.payload)) state.all = action.payload;
		});
	},
});

export default subscriptionFeatureSlice.reducer;
