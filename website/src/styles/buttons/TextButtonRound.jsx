import React from "react";

const TextButtonRound = ({ Btn = "button", To = "", state, classes, children, type }) => {
	const attributes = {
		className: classes,
		to: To.startsWith("/") ? To : `/${To}`,
		state: state,
	};

	if (type) {
		attributes.type = type;
	}


	return <>{React.createElement(Btn, attributes, children)}</>;
};

export default TextButtonRound;
