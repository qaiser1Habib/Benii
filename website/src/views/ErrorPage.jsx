import { Link } from "react-router-dom";

const ErrorPage = () => {
	return (
		<div className="container my-5">
			<div className="row justify-content-center">
				<div className="col-md-8 col-xl-5">
					<div className="signup-screen-wrap rounded-4">
						<div className="signup-screen-single">
							<div className="text-center">
								<h1 className="m-3">Oops!</h1>
							</div>
							<div className="row">
								<div className="col-12">
									<p className="opt-text text-center mb-0">404</p>
									<p className="opt-text text-center">Page Not Found</p>
									<p className="text-center">
										The page you are looking for might have been removed, had its name changed, or is temporarily
										unavailable.
									</p>

									<div className="row justify-content-center ">
										<div className="text-center">
											<Link to="/" class="btn btn-primary rounded-2 px-3 py-2  my-1">
												Go To Home Page
											</Link>
										</div>
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

export default ErrorPage;
