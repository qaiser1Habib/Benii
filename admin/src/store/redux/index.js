import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./users";
import blogSlice from "./blogs";
import resourcesSlice from "./resources";
import subscriptionSlice from "./subscriptions";
import subscriptionFeatureSlice from "./subscriptionFeatures";
import questionSlice from "./question";

const store = configureStore({
	reducer: {
		blogs: blogSlice,
		resources: resourcesSlice,
		users: userSlice,
		subscriptions: subscriptionSlice,
		subscriptionFeatures: subscriptionFeatureSlice,
		questions: questionSlice,
	},
});

export default store;
