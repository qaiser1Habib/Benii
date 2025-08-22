import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../middlewares/apis";
import { getToken, setToken } from "../middlewares/auth";
import { apiErrorHandler } from "./apiErrorHandler";

export const getUsers = createAsyncThunk("users/fetchAll", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.getUsers(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const getUser = createAsyncThunk("users/getInfo", async (notify, { dispatch }) => {
	try {
		const { payload } = await api.getUsers();

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
		return null;
	}
});

export const registerUser = createAsyncThunk("user/register", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.registerUser(formData);

		if (payload) {
			notify("success", "Successfully Registered. Now signing you in");
			return payload;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const loginUser = createAsyncThunk("user/login", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.loginUser(formData);

		if (payload?.token) {
			await setToken(payload.token);

			notify("success", "Login successful");
			return true;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
		return null;
	}
});

export const verifyUserLogin = createAsyncThunk("user/verifyLogin", async (notify, { dispatch }) => {
	try {
		const payload = getToken();

		return payload ? true : false;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
		return null;
	}
});

export const updateUser = createAsyncThunk("user/update", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.updateUser(formData);

		if (payload) {
			dispatch(getUser({ notify }));
			notify("success", "Profile Updated Successfully");
			return payload;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
		return null;
	}
});

export const sendPasswordResetEmail = createAsyncThunk(
	"user/sendPasswordResetEmail",
	async ({ formData, notify }, { dispatch }) => {
		try {
			const { payload } = await api.sendPasswordResetEmail(formData);

			if (payload?.accepted?.length) {
				notify("success", "email sent to " + payload?.accepted?.[0]);
				return true;
			}
		} catch (error) {
			dispatch(apiErrorHandler(error, notify));
		}
	}
);

export const resetPassword = createAsyncThunk("user/resetPassword", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.resetPassword(formData);

		if (payload) {
			notify("success", "Password Set::success");
			return true;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
		return null;
	}
});

export const updatePassword = createAsyncThunk("user/update/password", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.updatePassword(formData);

		if (payload) {
			dispatch(getUser({ notify }));
			notify("success", "Password Changed Successfully");
			return true;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
		return null;
	}
});

export const logoutUser = createAsyncThunk("user/logout", async (notify, { dispatch }) => {
	try {
		localStorage.clear();
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
		return null;
	}
});

export const sendUserVerificationEmail = createAsyncThunk("user/verify/email", async ({ notify }, { dispatch }) => {
	try {
		const { payload } = await api.sendUserVerificationEmail();

		if (payload?.accepted?.length) {
			notify("success", "Email sent to " + payload?.accepted?.[0]);
			return true;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const verifyUserEmailByOTP = createAsyncThunk("user/verify/otp", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.verifyUserEmailByOTP(formData);

		if (payload?._id) {
			notify("success", "User Verified Successfully");
			dispatch(getUser({ formData: { _id: payload?.id }, notify })).then(() => console.log("-"));

			return true;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
