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
export const createSubAdmin = (formData) => apiMethods.post("/v1/users/sub-admin", formData);
export const registerUser = (formData) => apiMethods.post("/v1/users", formData, true);
export const loginUser = (formData) => apiMethods.post("/v1/users/login", formData);
export const updateUser = (formData) => apiMethods.put("/v1/users", formData, true);
export const updatePassword = (formData) => apiMethods.post("/v1/users/password", formData);
export const sendPasswordResetEmail = (formData) => apiMethods.post("/v1/users/send-password-reset-email", formData);
export const resetPassword = (formData) => apiMethods.patch("/v1/users/password", formData);
export const deleteUser = (formData) => apiMethods.delete("/v1/users", formData);

// Blogs APIs
export const getBlogs = (formData) => apiMethods.get("/v1/blogs", formData);
export const createBlog = (formData) => apiMethods.post("/v1/blogs", formData, true);
export const updateBlog = (formData) => apiMethods.put("/v1/blogs", formData, true);
export const deleteBlog = (formData) => apiMethods.delete("/v1/blogs", formData);

// Resource APIs
export const getResources = (formData) => apiMethods.get("/v1/resources", formData);
export const createResource = (formData) => apiMethods.post("/v1/resources", formData, true);
export const updateResource = (formData) => apiMethods.put("/v1/resources", formData, true);
export const deleteResource = (formData) => apiMethods.delete("/v1/resources", formData);

// Questions APIs
export const getQuestions = (formData) => apiMethods.get("/v1/questions", formData);
export const createQuestion = (formData) => apiMethods.post("/v1/questions", formData);
export const updateQuestion = (formData) => apiMethods.put("/v1/questions", formData);
export const deleteQuestion = (formData) => apiMethods.delete("/v1/questions", formData);

// Subscriptions APIs
export const getSubscriptions = (formData) => apiMethods.get("/v1/subscriptions", formData);
export const createSubscription = (formData, uploadProgress) =>
	apiMethods.post("/v1/subscriptions", formData, false, uploadProgress);
export const updateSubscription = (formData, uploadProgress) =>
	apiMethods.put("/v1/subscriptions", formData, false, uploadProgress);
export const deleteSubscription = (formData) => apiMethods.delete("/v1/subscriptions", formData);

// Subscriptions Features APIs
export const getSubscriptionFeatures = (formData) => apiMethods.get("/v1/subscriptions/features", formData);
export const createSubscriptionFeature = (formData, uploadProgress) =>
	apiMethods.post("/v1/subscriptions/features", formData, false, uploadProgress);
export const updateSubscriptionFeature = (formData, uploadProgress) =>
	apiMethods.put("/v1/subscriptions/features", formData, false, uploadProgress);
export const deleteSubscriptionFeature = (formData) => apiMethods.delete("/v1/subscriptions/features", formData);
