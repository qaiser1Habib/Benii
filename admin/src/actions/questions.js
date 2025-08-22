import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../middlewares/apis";
import { apiErrorHandler } from "./apiErrorHandler";

export const getQuestions = createAsyncThunk("questions/fetchAll", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.getQuestions(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const createQuestion = createAsyncThunk("question/create", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.createQuestion(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const updateQuestion = createAsyncThunk("question/update", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.updateQuestion(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const deleteQuestion = createAsyncThunk("question/delete", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.deleteQuestion(formData);

		if (payload) {
			notify("success", "Question deleted");
			return payload;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
