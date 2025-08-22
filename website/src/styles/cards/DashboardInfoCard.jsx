import { Link } from "react-router-dom";

const DashboardInfoCard = (props) => {
	return (
		<div className="col-lg-4 col-md-12 col-sm-12">
			<div className="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5 text-center">
				<div className="symbol symbol-30px mb-8">
					<Link to={`/${props.page}`}>
						<img src={`assets/${props.image}`} />
					</Link>
				</div>
				<div className="d-flex m-0">
					<div className="mx-auto">
						<h2 className="sml_screen_text_center ">
							<Link to={`/${props.page}`} className="text-black">
								{props.title}
							</Link>
						</h2>
					</div>
					{props?.count && <h2 className="sml_screen_text_center">{props?.count}</h2>}
				</div>
			</div>
		</div>
	);
};

export default DashboardInfoCard;
