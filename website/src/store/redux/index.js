import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./users";
import dashboardPreferenceSlice from "./dashboardPreferences";
import blogSlice from "./Blogs";
import resourcesSlice from "./resources";
import subscriptionSlice from "./subscriptions";
import subscriptionFeatureSlice from "./subscriptionFeatures";
import appointmentSlice from "./appointments";
import serviceSlice from "./services";
import chatSlice from "./chats";
import questionSlice from "./question";

const store = configureStore({
	reducer: {
		users: userSlice,
		dashboardPreferences: dashboardPreferenceSlice,
		blogs: blogSlice,
		resources: resourcesSlice,
		subscriptions: subscriptionSlice,
		subscriptionFeatures: subscriptionFeatureSlice,
		appointments: appointmentSlice,
		services: serviceSlice,
		chats: chatSlice,
		questions: questionSlice,
	},
});

export default store;
