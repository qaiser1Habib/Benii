import { getToken } from "./auth";
import axiosHandler from "./axiosHandler";

let defaultHeaders = {};
let multipartHeaders = {};

async function refreshAuthToken() {
	const authToken = await getToken();

	defaultHeaders = { Authorization: `Bearer ${authToken}`, "ngrok-skip-browser-warning": "69420" };
	multipartHeaders = { ...defaultHeaders, "Content-Type": "multipart/form-data" };
}

const apiMethods = {
	get: async (endpoint, formData) => {
		await refreshAuthToken();
		return axiosHandler.get(endpoint, { params: formData, headers: defaultHeaders });
	},
	post: async (endpoint, formData, isMultipart = false, uploadProgress) => {
		await refreshAuthToken();
		return axiosHandler.post(endpoint, formData, {
			headers: isMultipart ? multipartHeaders : defaultHeaders,
			onUploadProgress: uploadProgress,
		});
	},
	put: async (endpoint, formData, isMultipart = false, uploadProgress) => {
		await refreshAuthToken();
		return axiosHandler.put(endpoint, formData, {
			headers: isMultipart ? multipartHeaders : defaultHeaders,
			onUploadProgress: uploadProgress,
		});
	},
	patch: async (endpoint, formData, isMultipart = false, uploadProgress) => {
		await refreshAuthToken();
		return axiosHandler.patch(endpoint, formData, {
			headers: isMultipart ? multipartHeaders : defaultHeaders,
			onUploadProgress: uploadProgress,
		});
	},
	delete: async (endpoint, formData) => {
		await refreshAuthToken();
		return axiosHandler.delete(endpoint, { params: formData, headers: defaultHeaders });
	},
};

// Users APIs
export const getUsers = (formData) => apiMethods.get("/v1/users", formData);
export const registerUser = (formData) => apiMethods.post("/v1/users", formData, true);
export const loginUser = (formData) => apiMethods.post("/v1/users/login", formData);
export const updateUser = (formData) => apiMethods.put("/v1/users", formData, true);
export const updatePassword = (formData) => apiMethods.post("/v1/users/password", formData);
export const sendPasswordResetEmail = (formData) => apiMethods.post("/v1/users/send-password-reset-email", formData);
export const resetPassword = (formData) => apiMethods.patch("/v1/users/password", formData);
export const sendUserVerificationEmail = (formData) => apiMethods.get("/v1/users/verify/email", formData);
export const verifyUserEmailByOTP = (formData) => apiMethods.post("/v1/users/verify/otp", formData);

// chats APIs
export const getChats = (formData) => apiMethods.get("/v1/chats/get-chats", formData);
export const getChatMessages = (formData) => apiMethods.get("/v1/chats", formData);
export const sendMessage = (formData) => apiMethods.post("/v1/chats", formData);
export const createThread = (formData) => apiMethods.post("/v1/chats/create-thread", formData);
export const createChat = (formData) => apiMethods.post("/v1/chats/create-chat", formData);
export const deleteChat = (formData) => apiMethods.delete("/v1/chats", formData);

// client APIs
export const createClientByTherapist = (formData) => apiMethods.post("/v1/clients", formData);
export const removeClientByTherapist = (formData) => apiMethods.delete("/v1/clients", formData);

// Subscriptions APIs
export const getSubscriptions = (formData) => apiMethods.get("/v1/subscriptions", formData);
export const getSubscriptionFeatures = (formData) => apiMethods.get("/v1/subscriptions/features", formData);

// Questions APIs
export const getQuestions = (formData) => apiMethods.get("/v1/questions", formData);

// Payment Apis
export const getPaymentCheckoutSession = (formData) => apiMethods.get("/v1/payments/session", formData);
export const cancelSubscriptionPlan = (formData) => apiMethods.delete("/v1/payments/subscription", formData);

// appointment APIs
export const getAppointments = (formData) => apiMethods.get("/v1/appointments", formData);
export const createAppointment = (formData) => apiMethods.post("/v1/appointments", formData);
export const updateAppointment = (formData) => apiMethods.put("/v1/appointments", formData);
export const deleteAppointment = (formData) => apiMethods.delete("/v1/appointments", formData);

// services APIs
export const getServices = (formData) => apiMethods.get("/v1/services", formData);
export const createService = (formData) => apiMethods.post("/v1/services", formData);
export const updateService = (formData) => apiMethods.put("/v1/services", formData);
export const deleteService = (formData) => apiMethods.delete("/v1/services", formData);

// Blogs APIs
export const getBlogs = (formData) => apiMethods.get("/v1/blogs", formData);

// Resources APIs
export const getResources = (formData) => apiMethods.get("/v1/resources", formData);
