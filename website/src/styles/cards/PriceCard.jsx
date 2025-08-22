const PriceCard = (props) => {
	return (
		<div className="col-11 col-md-4 px-0 px-md-2 px-xl-5 my-3 d-flex">
			<div
				className={
					"bg-primary p-3 pb-3 round-10px price-card-shadow position-relative d-flex justify-content-between flex-column w-100 min-h-445px"
				}
			>
				<div>
					<h1 className="text-white text-center py-3 price-card-title text-capitalize">{props.subscription?.title}</h1>
					<div
						className={`${
							props.classNames && props.classNames[1] && props.classNames[1].lineColor
								? props.classNames[1].lineColor
								: "bg-white"
						} w-100 h-2px`}
					></div>

					<h1
						className={`text-white text-center pt-3 ${
							props.classNames && props.classNames[1] && props.classNames[1].pricePadding
								? props.classNames[1].pricePadding
								: "pt-3"
						}`}
					>
						${props?.subscription?.payment?.price}
					</h1>

					{props?.subscriptionFeatures?.length > 0 &&
						props?.subscriptionFeatures.map((subscriptionFeature, index) => {
							const isSubscribed = subscriptionFeature?.subscriptions?.some(
								(item) => item?._id === props?.subscription?._id
							);
							return (
								isSubscribed && (
									<div className="text-white d-flex align-items-start gap-2 px-0 px-lg-2 py-2" key={index}>
										<i className="fa-regular fa-circle-check mt-1"></i>
										<p className="m-0 ">{subscriptionFeature?.title}</p>
									</div>
								)
							);
						})}
				</div>
				<div className="text-center position-relative bottom-0 mt-5">
					{props?.purchasedSubscription?.subscriptionPlanID?._id === props?.subscription?._id &&
					props?.purchasedSubscription?.isActive &&
					props?.purchasedSubscription?.paymentStatus === "paid" ? (
						<a className="btn btn-primary-dark w-75 py-2 text-nowrap">
							Active Plan <i className="fa-solid fa-check px-1 "></i>
						</a>
					) : (
						<a
							onClick={() => props?.handleBuySubscription(props?.subscription)}
							className="btn btn-primary-dark-price w-75 py-2 text-nowrap"
						>
							Get Started <i className="fa-solid fa-arrow-right px-1 "></i>
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default PriceCard;
