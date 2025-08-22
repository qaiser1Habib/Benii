import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
	return (
		<div className="container-fluid bg-bread-crumb py-4">
			<div className="container">
				<div className="d-flex align-items-center justify-content-start gap-2">
					<Link to="/" className="fw-medium  text-primary text-decoration-none">
						Home
					</Link>
					<span className="text-primary">|</span>
					<span className="fw-medium ">{props?.title}</span>
				</div>
			</div>
		</div>
	);
};

export default BreadCrumb;
