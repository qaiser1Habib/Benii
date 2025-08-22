import { createSlice } from "@reduxjs/toolkit";
import { getQuestions } from "../../actions/questions.js";

const questionSlice = createSlice({
	name: "questions",
	initialState: {
		all: [],
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getQuestions.fulfilled, (state, action) => {
			return { ...state, all: action?.payload || [] };
		});
	},
});

export default questionSlice.reducer;
