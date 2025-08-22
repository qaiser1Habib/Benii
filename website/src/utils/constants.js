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
	{ value: "category-types", label: "Category Types", icon: "media/user.png" },
	{ value: "categories", label: "Categories", icon: "media/options.png" },
	{ value: "coupons", label: "Coupons", icon: "media/coupon.png" },
	{ value: "plans", label: "Plans", icon: "media/send.png" },
	{ value: "plan-features", label: "Plan Features", icon: "media/paper-plane.png" },
	{ value: "plan-features-content", label: "Plan Features Content", icon: "media/settings.png" },
	{ value: "resources", label: "Resources", icon: "media/newspaper.png" },
	{ value: "newsletters", label: "Newsletters", icon: "media/send.png" },
	{ value: "chat", label: "Chat", icon: "media/user-group.png" },
	{ value: "subscribers", label: "Subscribers", icon: "media/team.png" },
	{ value: "users", label: "Users", icon: "media/team.png" },
	{ value: "sub-admins", label: "Sub Admins", icon: "media/user-group.png" },
];
