import { createSlice } from "@reduxjs/toolkit";
import { getSubscriptions, createSubscription, deleteSubscription, updateSubscription } from "../../actions/subscriptions";

const initialState = {
	all: [],
};

const subscriptionSlice = createSlice({
	name: "subscriptions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getSubscriptions.fulfilled, (state, action) => {
				if (Array.isArray(action.payload)) state.all = action.payload;
			})
			.addCase(createSubscription.fulfilled, (state, action) => {
				state.all.push(action.payload);
			})
			.addCase(updateSubscription.fulfilled, (state, action) => {
				state.all = state.all.map((item) => (item._id === action.payload._id ? action.payload : item));
			})
			.addCase(deleteSubscription.fulfilled, (state, action) => {
				console.log(action);
				state.all = state.all.filter((item) => item._id !== action.payload._id);
			});
	},
});

export default subscriptionSlice.reducer;
