import { useEffect, useState } from "react";
import useToast from "../store/hooks/useToast";
import DashboardInfoCard from "../styles/cards/DashboardInfoCard";
import BreadCrumb from "./partials/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../actions/blogs";
import { getSubscriptions } from "../actions/subscriptions";
import { getSubscriptionFeatures } from "../actions/subscriptionFeatures";
import { getQuestions } from "../actions/questions";
import { getResources } from "../actions/resources";

const Dashboard = () => {
	const { notify } = useToast();
	const dispatch = useDispatch();
	const [totalBlogs, setTotalBlogs] = useState();
	const [totalResources, setTotalResources] = useState();
	const [totalPlans, setTotalPlans] = useState();
	const [totalPlanFeatures, setTotalPlanFeatures] = useState();
	const [totalQuestions, setTotalQuestions] = useState();

	useEffect(() => {
		dispatch(getBlogs({ formData: { count: true }, notify })).then(({ payload }) => setTotalBlogs(payload?.total));
		dispatch(getResources({ formData: { count: true }, notify })).then(({ payload }) => setTotalResources(payload?.total));
		dispatch(getQuestions({ formData: { count: true }, notify })).then(({ payload }) => setTotalQuestions(payload?.total));
		dispatch(getSubscriptions({ formData: { count: true }, notify })).then(({ payload }) => setTotalPlans(payload?.total));
		dispatch(getSubscriptionFeatures({ formData: { count: true }, notify })).then(({ payload }) =>
			setTotalPlanFeatures(payload?.total)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const currentLoggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo || {});
	return (
		<div className="fade-in">
			<BreadCrumb pageNames={["Dashboard"]} />
			<div className="container-xxl">
				<div className="row">
					<div className="col-xl-12 mb-5 mb-xl-10">
						<div className="card card-flush h-xl-100">
							<div
								className="card-header justify-content-center rounded bgi-no-repeat bgi-size-cover bgi-position-y-bottom bgi-position-x-center align-items-start h-250px"
								style={{ background: "#6f688d" }}
							>
								<h3 className="card-title align-items-start flex-column text-white pt-15 mb-10 text-center ">
									<span className="d-block fs-2x fw-bolder mb-3 w-100">
										Hello,{" "}
										{currentLoggedInUserInfo?.about?.firstName
											? `${currentLoggedInUserInfo?.about.firstName}`
											: currentLoggedInUserInfo?.about?.firstName ||
											  currentLoggedInUserInfo?.about?.lastName ||
											  "Admin"}
									</span>
									<div className="d-block fs-3tx text-white mb-3 w-100">Welcome To Dashboard</div>
								</h3>
							</div>

							<div className="card-body mt-n10">
								<div className="mt-n20 position-relative">
									<div className="row g-3 g-lg-6 justify-content-center">
										<DashboardInfoCard title="Plans" icon="fa-window-restore" count={totalPlans} page="plans" />
										<DashboardInfoCard
											title="Plan Features"
											icon="fa-paper-plane"
											count={totalPlanFeatures}
											page="plan-features"
										/>
										<DashboardInfoCard title="Blogs" icon="fa-images" count={totalBlogs} page="blogs" />
										<DashboardInfoCard
											title="Resources"
											icon="fa-laptop-file"
											count={totalResources}
											page="resources"
										/>
										<DashboardInfoCard
											title="Questions"
											icon="fa-circle-question"
											count={totalQuestions}
											page="questions"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
