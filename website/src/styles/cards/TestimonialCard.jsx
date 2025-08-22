const TestimonialCard = ({ title, text, img }) => {
	return (
		<div className="d-flex align-items-start   flex-column flex-sm-row gap-3 bg-white-30 mx-4 p-4 round-10px shadow-sm">
			<img
				src={`/assets/images/user-${img}`}
				className="object-fit-cover"
				style={{ width: "70px", height: "70px", borderRadius: "100%" }}
				alt={title}
			/>
			<div className="mt-4">
				<h5 className="fw-medium">{title}</h5>
				<p>{text}</p>
			</div>
			<img src="/assets/images/qoutes.png" alt="" height={48} />
		</div>
	);
};

export default TestimonialCard;
