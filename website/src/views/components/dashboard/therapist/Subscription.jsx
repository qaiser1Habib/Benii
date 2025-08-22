import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSubscriptionFeatures } from "../../../../actions/subscriptionFeatures";
import useToast from "../../../../store/hooks/useToast";
import ActionModalWithAnimatedIcon from "../../../../styles/modals/ActionModalWithAnimatedIcon";
import { cancelSubscriptionPlan } from "../../../../actions/payment";
import { getUser } from "../../../../actions/users";
import { convertToDate } from "../../../../utils/helpers";

const Subscription = () => {
	const dispatch = useDispatch();
	const { notify } = useToast();

	const LoggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo || false);
	const subscription = LoggedInUserInfo?.subscription || {};
	const subscriptionFeatures = useSelector((state) => state?.subscriptionFeatures?.all || []);
	const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] = useState(false);
	const [subscriptionToCancel, setSubscriptionToCancel] = useState({});
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

	const page = 1;
	const limit = 100;
	useEffect(() => {
		dispatch(getSubscriptionFeatures({ formData: { page: page, limit: limit }, notify }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const handleSubscriptionCancelButtonClick = async (item) => {
		setSubscriptionToCancel(item);
		setIsCancelSubscriptionModalOpen(true);
	};

	const handleCancelSubscription = async () => {
		setIsSubmittingRequest(true);

		await cancelSubscriptionPlan({ productID: subscriptionToCancel?._id }, notify, dispatch).then(() => {
			dispatch(getUser(notify));
			setIsCancelSubscriptionModalOpen(false);
			setIsSubmittingRequest(false);
			window.location.reload();
		});
	};

	return (
		<>
			<div className=" bg-white-50 round-10px fade-in dashboard-card-shadow p-5 h-100">
				<h2 className="fs-36px fw-medium mb-3 ps-0 mt-2">Subscription</h2>

				<div className="col-12">
					{subscription?.subscriptionPlanID?._id && LoggedInUserInfo?.subscription?.paymentID ? (
						<div className="row justify-content-center">
							<div className="col-sm-10 col-md-8 col-lg-7 col-xl-11 col-xxl-5 px-0 px-md-2 px-lg-5 my-3 ">
								<div className="bg-primary p-3  pb-3 round-10px price-card-shadow position-relative d-flex justify-content-between  flex-column min-h-492px">
									<div>
										<h1 className="text-white text-center  mt-2 text-capitalize">
											{subscription?.subscriptionPlanID?.title}
										</h1>
										<h1 className={"text-white text-center"}>${subscription?.subscriptionPlanID?.payment?.price}</h1>

										<div className="w-full text-center">
											<span
												className="badge rounded-pill bg-white text-dark text-capitalize py-2 px-4 mb-2"
												style={{ fontSize: "14px" }}
											>
												Valid Until : {convertToDate(subscription?.schedule?.end, "dd-MM-yyyy")}
											</span>
										</div>
										<div className={`bg-white w-100 h-2px my-2`} />

										{subscriptionFeatures?.length > 0 &&
											subscriptionFeatures.map((subscriptionFeature, index) => {
												const isSubscribed = subscriptionFeature?.subscriptions?.some(
													(item) => item?._id === subscription?.subscriptionPlanID?._id
												);
												return (
													isSubscribed && (
														<div
															className="text-white d-flex align-items-center align-items-md-start gap-2 px-0 px-lg-2 py-2  "
															key={index}
														>
															<i className="fa-regular fa-circle-check mt-2"></i>
															<p className="m-0">{subscriptionFeature?.title}</p>
														</div>
													)
												);
											})}
									</div>
									<div className="d-flex text-center">
										<Link to="/subscription" className="btn btn-primary-dark py-2 me-2 w-50 text-white">
											<FaEdit /> Upgrade
										</Link>
										<a
											onClick={() => handleSubscriptionCancelButtonClick(subscription?.subscriptionPlanID)}
											className="btn btn-primary-dark py-2 text-white w-50"
										>
											<IoMdClose />
											Cancel
										</a>
									</div>
								</div>
							</div>
						</div>
					) : (
						"No Active Plan"
					)}
				</div>
			</div>

			<ActionModalWithAnimatedIcon
				icon="cancel"
				title="Cancel Subscription"
				heading={`Cancel "${subscriptionToCancel?.title}" Subscription`}
				description="You are cancelling this subscription. you will no longer be charged from now on."
				isOpen={isCancelSubscriptionModalOpen}
				setIsOpen={setIsCancelSubscriptionModalOpen}
				isSubmittingRequest={isSubmittingRequest}
				handleSubmit={handleCancelSubscription}
				userInfo={LoggedInUserInfo}
			/>
		</>
	);
};

export default Subscription;
