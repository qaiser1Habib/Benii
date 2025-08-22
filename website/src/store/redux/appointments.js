import { createSlice } from "@reduxjs/toolkit";
import { createAppointment, deleteAppointment, getAppointments, updateAppointment } from "../../actions/Appointments";

const initialState = { all: [] };

const appointmentSlice = createSlice({
	name: "appointments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAppointments.fulfilled, (state, action) => {
				return { ...state, all: action?.payload || [] };
			})
			.addCase(createAppointment.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: [...state.all, action.payload] };
			})
			.addCase(updateAppointment.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: state.all.map((item) => (item._id === payload?._id ? payload : item)) };
			})
			.addCase(deleteAppointment.fulfilled, (state, action) => {
				const payload = action?.payload || null;
				return payload?._id && { ...state, all: state.all.filter((item) => item._id !== payload) };
			});
	},
});

export default appointmentSlice.reducer;