import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import useToast from "./store/hooks/useToast";
import { getUser, verifyUserLogin } from "./actions/users";
import { getAppPreferences } from "./actions/appPreferences";

const LazyComponents = {
	Header: lazy(() => import("./views/partials/Header")),
	Footer: lazy(() => import("./views/partials/Footer")),
	Auth: lazy(() => import("./views/Auth")),
	Dashboard: lazy(() => import("./views/Dashboard")),
	Plans: lazy(() => import("./views/Plans")),
	PlanFeatures: lazy(() => import("./views/PlanFeatures")),
	Blogs: lazy(() => import("./views/Blogs")),
	Users: lazy(() => import("./views/Users.jsx")),
	Resources: lazy(() => import("./views/Resources.jsx")),
	Questions: lazy(() => import("./views/Questions.jsx")),
	ChangePassword: lazy(() => import("./views/ChangePassword")),
	Profile: lazy(() => import("./views/Profile")),
	ResetPassword: lazy(() => import("./views/component/auth/ResetPassword")),
};

const LoadingComponent = (
	<div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
		<div className="spinner-grow" role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
	</div>
);

const ProtectedRoute = ({ authStatus }) => {
	return authStatus === true ? <Outlet /> : authStatus === false ? <Navigate to="/auth" /> : null;
};

const GuestRoute = ({ authStatus }) => {
	return authStatus === true ? <Navigate to="/" /> : authStatus === false ? <Outlet /> : null;
};

function App() {
	const dispatch = useDispatch();
	const { notify } = useToast();

	const isLoggedIn = useSelector((state) => state?.users?.isLoggedIn || false);

	const [authStatus, setAuthStatus] = useState(false);

	useEffect(() => {
		dispatch(verifyUserLogin(notify)).then(() => {
			setAuthStatus(isLoggedIn && true);
			if (isLoggedIn) dispatch(getUser(notify));
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn]);

	useEffect(() => {
		dispatch(getAppPreferences({ notify }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="app-default" data-bs-theme="light">
				<div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
					<Suspense fallback={LoadingComponent}>
						<Routes>
							<Route
								path="/"
								element={
									<>
										<LazyComponents.Header setAuthStatus={setAuthStatus} />
										<ProtectedRoute authStatus={authStatus} />
										<LazyComponents.Footer />
									</>
								}
							>
								<Route path="/" element={<LazyComponents.Dashboard />} />
								<Route path="/profile" element={<LazyComponents.Profile />} />
								<Route path="/plans" element={<LazyComponents.Plans />} />
								<Route path="/plan-features" element={<LazyComponents.PlanFeatures />} />
								<Route path="/users" element={<LazyComponents.Users />} />
								<Route path="/blogs" element={<LazyComponents.Blogs />} />
								<Route path="/resources" element={<LazyComponents.Resources />} />
								<Route path="/questions" element={<LazyComponents.Questions />} />
								<Route path="/change-password" element={<LazyComponents.ChangePassword />} />
							</Route>

							<Route path="/" element={<GuestRoute authStatus={authStatus} />}>
								<Route path="/auth" element={<LazyComponents.Auth setAuthStatus={setAuthStatus} />} />
								<Route path="/reset-password" element={<LazyComponents.ResetPassword />} />
							</Route>
						</Routes>
					</Suspense>
				</div>
			</div>
		</>
	);
}

export default App;
