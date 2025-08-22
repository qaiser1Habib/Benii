export const HTTP_STATUS_CODES = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOTFOUND: 404,
	NOT_ACCEPTABLE: 406,
	CONFLICT: 409,
	GONE: 410,
	UNPROCESSABLE_ENTITY: 422,
	INVALID_TOKEN: 498,
	INTERNAL_SERVER_ERROR: 500,
};

export const MODAL_VARIANT_CONFIGS = {
	hidden: { opacity: 0, scale: 0.7 },
	visible: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.1 },
};

export const ACCESSIBLE_ROUTES = [
	{ value: "plans", label: "Plans", icon: "paper-plane.png" },
	{ value: "plan-features", label: "Plan Features", icon: "paper-plane.png" },
	{ value: "blogs", label: "Blogs", icon: "blog.png" },
	{ value: "Users", label: "users", icon: "user.png" },
	{ value: "resources", label: "Resources", icon: "Resources.png" },
	{ value: "questions", label: "Questions", icon: "blog.png" },
];
