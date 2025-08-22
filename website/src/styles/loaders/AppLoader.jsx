const AppLoader = () => {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
			<div className="spinner-grow" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
};

export default AppLoader;
