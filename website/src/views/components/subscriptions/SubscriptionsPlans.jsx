import { useEffect, useState } from "react";
import PriceCard from "../../../styles/cards/PriceCard.jsx";
import useToast from "../../../store/hooks/useToast.js";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "../../../actions/subscriptions.js";
import { getSubscriptionFeatures } from "../../../actions/subscriptionFeatures.js";
import { getPaymentCheckoutSession } from "../../../actions/payment.js";
import ActionModalWithAnimatedIcon from "../../../styles/modals/ActionModalWithAnimatedIcon.jsx";
import { logoutUser } from "../../../actions/users.js";
import { useNavigate } from "react-router-dom";
const SubscriptionsPlans = (props) => {
	const dispatch = useDispatch();
	const { notify } = useToast();
	const navigate = useNavigate();
	const [subscriptionDuration, setSubscriptionDuration] = useState("month");
	const [formData, setFormData] = useState({});
	const [checkoutURL, setCheckoutURL] = useState(null);
	const [isPaymentCheckoutModalOpen, setIsPaymentCheckoutModalOpen] = useState(false);
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

	const subscriptions = useSelector((state) => state?.subscriptions?.all || []);
	const subscriptionFeatures = useSelector((state) => state?.subscriptionFeatures?.all || []);
	const loggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo);

	const page = 1;
	const limit = 100;

	useEffect(() => {
		dispatch(getSubscriptions({ formData: { page: page, limit: limit }, notify }));
		dispatch(getSubscriptionFeatures({ formData: { page: page, limit: limit }, notify }));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const filteredSubscriptions = subscriptions.filter((subscription) =>
		subscriptionDuration === "month" ? subscription?.duration?.type === "month" : subscription?.duration?.type === "year"
	);

	const handleBuySubscription = async (item) => {
		setIsPaymentCheckoutModalOpen(true);
		if (loggedInUserInfo?._id) {
			setFormData(item);
			setCheckoutURL(null);
			setIsSubmittingRequest(true);
			await dispatch(
				getPaymentCheckoutSession({
					formData: { gateway: "stripe", product: { type: "subscription", id: item?._id } },
					notify,
				})
			).then(({ payload }) => {
				if (payload?.url) setCheckoutURL(payload.url);
				setIsSubmittingRequest(false);
			});
		}
	};

	const handleLogout = () => {
		dispatch(logoutUser()).then(() => {
			navigate("/");
			window.location.reload();
		});
	};

	return (
		<>
			<div className="container pt-5 pb-5">
				{subscriptions?.length > 0 ? (
					<>
						<p className="text-primary fw-medium fs-lg-4">Subscription</p>
						<h1 className="fw-medium">Select a Affordable Plans for You.</h1>
						<div className="row mt-4">
							<div className="col-12">
								<div className="row justify-content-center">
									<div className=" col-12 col-sm-9 col-md-8 col-lg-6 col-xl-4">
										<div className="row justify-content-center">
											<div className="col-xs-10 col-sm-10 col-md-10 col-lg-9 col-xl-8 col-xxl-7">
												<div className="position-relative p-1   my-3 d-flex justify-content-between subscription-btn-card  overflow-hidden">
													<button
														className={`subscription-btn  subscription-btn-toggle  z-3 fw-medium   px-4 px-xs-4  fs-22px w-50 ${
															subscriptionDuration === "month" ? "active" : ""
														}`}
														onClick={() => setSubscriptionDuration("month")}
													>
														<span className="px-2">Monthly</span>
													</button>
													<button
														className={`subscription-btn  z-3 fw-medium   px-4 px-xs-4 fs-22px  w-50  ${
															subscriptionDuration === "year" ? "active" : ""
														}`}
														onClick={() => setSubscriptionDuration("year")}
													>
														<span className="px-2">Annual</span>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							{props?.userFromDashboard?._id && props?.userFromDashboard?.userRole === "therapist" && (
								<div className="col-12 text-center mt-2">
									<div className="py-1 ">
										To access features, please purchase a plan or
										<a className="text-danger cursor-pointer" style={{ textDecoration: "none" }} onClick={handleLogout}>
											&nbsp;Logout
										</a>
									</div>
								</div>
							)}
							<div className="col-12 mb-5">
								<div className="row justify-content-center">
									{filteredSubscriptions?.length > 0 &&
										filteredSubscriptions.map((subscription, index) => {
											const purchasedSubscription = loggedInUserInfo?.subscription;
											return (
												<PriceCard
													classNames={{ lineColor: "bg-secondary-light" }}
													subscription={subscription}
													subscriptionFeatures={subscriptionFeatures}
													purchasedSubscription={purchasedSubscription}
													handleBuySubscription={handleBuySubscription}
													key={index}
												/>
											);
										})}
								</div>
							</div>
						</div>
					</>
				) : (
					<>No subscriptions Found</>
				)}
			</div>

			<ActionModalWithAnimatedIcon
				icon="shopping"
				title={loggedInUserInfo?._id ? "Buy Subscription" : "Login"}
				heading={
					loggedInUserInfo?._id ? <>{`Buy ${formData?.title} for $${formData?.payment?.price}`}</> : "You are not logged in."
				}
				description={
					loggedInUserInfo?._id ? (
						<>{`You are buying this subscription. you will be charged ${
							formData?.payment?.type === "recurring" ? `every  ${formData?.duration?.type}` : "once"
						}`}</>
					) : (
						"You need to login to your account to buy a subscription."
					)
				}
				isOpen={isPaymentCheckoutModalOpen}
				setIsOpen={setIsPaymentCheckoutModalOpen}
				isSubmittingRequest={isSubmittingRequest}
				handleSubmit={checkoutURL ? () => (window.location.href = checkoutURL) : null}
				userInfo={loggedInUserInfo}
			/>
		</>
	);
};

export default SubscriptionsPlans;
