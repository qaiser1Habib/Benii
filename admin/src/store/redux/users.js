import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUser, getUsers, loginUser, logoutUser, updateUser, verifyUserLogin } from "../../actions/users";

const userSlice = createSlice({
	name: "users",
	initialState: {
		loggedInUserInfo: {},
		isLoggedIn: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.fulfilled, (state, action) => {
				return { ...state, users: action?.payload || [] };
			})
			.addCase(getUser.fulfilled, (state, action) => {
				if (action.payload) return { ...state, loggedInUserInfo: action.payload };
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				if (action.payload) return { ...state, isLoggedIn: action.payload };
			})
			.addCase(verifyUserLogin.fulfilled, (state, action) => {
				if (action.payload) return { ...state, isLoggedIn: action.payload };
			})
			.addCase(logoutUser.fulfilled, (state) => {
				return { ...state, isLoggedIn: false };
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				const payload = action.payload;
				if (!payload._id) return state;

				return {
					...state,
					loggedInUserInfo: payload._id === state.loggedInUserInfo._id ? payload : state.loggedInUserInfo,
				};
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				const payload = action.payload;
				if (!payload?._id) return state;

				return {
					...state,
					loggedInUserInfo: payload._id === state.loggedInUserInfo._id ? {} : state.loggedInUserInfo,
					isLoggedIn: false,
				};
			});
	},
});

export default userSlice.reducer;
