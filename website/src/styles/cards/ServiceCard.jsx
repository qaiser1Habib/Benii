import { Link } from "react-router-dom";

const ServiceCard = (props) => {
	return (
		<div className="col-md-6 col-xxl-4 my-3 ">
			<div className="position-relative">
				<div className="choose-us-blur-circle top-0 start-0  d-flex align-items-center justify-content-center position-absolute shadow-sm">
					<img src={props.image} alt="" className="img-fluid w-50 " />
				</div>
				<div className="home-service-card pt-4 overflow-hidden shadow ">
					<h5 className="mt-5 pt-5 px-4 ">{props.title}</h5>
					<p className="px-4 text-secondary">{props.description}</p>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;
