import { createSlice } from "@reduxjs/toolkit";
import { getQuestions, createQuestion, updateQuestion, deleteQuestion } from "../../actions/questions";

const questionSlice = createSlice({
	name: "questions",
	initialState: {
		all: [],
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getQuestions.fulfilled, (state, action) => {
				return { ...state, all: action?.payload || [] };
			})
			.addCase(createQuestion.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: [...state.all, payload] };
			})
			.addCase(updateQuestion.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: state.all.map((item) => (item._id === payload._id ? payload : item)) };
			})
			.addCase(deleteQuestion.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: state.all.filter((item) => item._id !== payload._id) };
			});
	},
});

export default questionSlice.reducer;
