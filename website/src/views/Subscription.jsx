import BreadCrumb from "./partials/BreadCrumb";
import SubscriptionsPlans from "./components/subscriptions/SubscriptionsPlans";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Subscription = () => {
	const location = useLocation();
	const user = location?.state?.user || null;
	const loggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo);

	return (
		<div className="fade-in">
			{!loggedInUserInfo?._id || loggedInUserInfo?.userRole === "therapist" ? (
				<>
					<BreadCrumb title="Subscriptions" />
					<div className="my-5">
						<div className="about-page-blur-bg d-none d-xl-block ">
							<div className="blur-box resource-box position-absolute"></div>
						</div>
						<div className="all-blur-bg d-none d-xl-block">
							<div className="blur-box resource-box position-absolute d-none d-xl-block top-0 end-0"></div>
						</div>
						<SubscriptionsPlans userFromDashboard={user} />
					</div>
				</>
			) : (
				<Navigate to="/" />
			)}
		</div>
	);
};

export default Subscription;
