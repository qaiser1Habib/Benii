import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../middlewares/apis";
import { apiErrorHandler } from "./apiErrorHandler";

export const createUserThread = createAsyncThunk("chats/createThread", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.createThread(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const createNewChat = createAsyncThunk("chats/create", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.createChat(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const deleteChat = createAsyncThunk("chats/delete", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.deleteChat(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const getUserChats = createAsyncThunk("chats/fetchAll", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.getChats(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const getChatMessages = createAsyncThunk("messages/fetchAll", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.getChatMessages(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const getNewChatMessages = createAsyncThunk("messages/fetchNewChatMessages", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.getChatMessages(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const sendMessage = createAsyncThunk("messages/send", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.sendMessage(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
