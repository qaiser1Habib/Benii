import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import useToast from "./store/hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import { getUser, verifyUserLogin } from "./actions/users";
import AppLoader from "./styles/loaders/AppLoader";

const Header = lazy(() => import("./views/partials/Header"));
const Footer = lazy(() => import("./views/partials/Footer"));
const LazyComponents = {
	Home: lazy(() => import("./views/Home")),
	About: lazy(() => import("./views/About")),
	VirtualCounselor: lazy(() => import("./views/VirtualCounselor")),
	Resources: lazy(() => import("./views/Resources")),
	BlogDetail: lazy(() => import("./views/components/blog/BlogDetail")),
	ResourceDetail: lazy(() => import("./views/components/resource/ResourceDetail")),
	Subscription: lazy(() => import("./views/Subscription")),
	Faqs: lazy(() => import("./views/Faqs")),
	Contact: lazy(() => import("./views/Contact")),
	Auth: lazy(() => import("./views/Auth")),
	Login: lazy(() => import("./views/components/auth/Login")),
	ForgotPassword: lazy(() => import("./views/components/auth/ForgotPassword")),
	ResetPassword: lazy(() => import("./views/components/auth/ResetPassword")),
	SetPassword: lazy(() => import("./views/components/auth/SetPassword")),
	EmailOTPVerification: lazy(() => import("./views/components/auth/EmailOTPVerification")),
	Register: lazy(() => import("./views/components/auth/Register")),
	ProfileSetup: lazy(() => import("./views/components/dashboard/therapist/ProfileSetup")),
	Dashboard: lazy(() => import("./views/Dashboard")),
	ErrorPage: lazy(() => import("./views/ErrorPage")),
};

const ProtectedRoute = ({ authStatus }) => {
	return authStatus === true ? <Outlet /> : authStatus === false ? <Navigate to="/auth" /> : null;
};

const GuestRoute = ({ authStatus, isUserVerified, isLoggedIn }) => {
	return authStatus === true ? (
		isUserVerified && isLoggedIn ? (
			<Navigate to="/dashboard" />
		) : (
			!isUserVerified && <Navigate to="/email-verification" />
		)
	) : authStatus === false ? (
		<Outlet />
	) : null;
};

function App() {
	const [authStatus, setAuthStatus] = useState(null);
	const [isUserVerified, setIsUserVerified] = useState(false);
	const [isFetchingAndVerifyingUser, setIsFetchingAndVerifyingUser] = useState(true);
	const dispatch = useDispatch();
	const { notify } = useToast();
	const isLoggedIn = useSelector((state) => state?.users?.isLoggedIn || false);
	const loggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo || {});

	useEffect(() => {
		dispatch(verifyUserLogin(notify)).then(() => {
			setAuthStatus(isLoggedIn && true);
			if (isLoggedIn) dispatch(getUser(notify));
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn]);

	useEffect(() => {
		if (loggedInUserInfo?._id && isLoggedIn) {
			setIsUserVerified(loggedInUserInfo?.isVerified?.status);
			setIsFetchingAndVerifyingUser(false);
		}
	}, [loggedInUserInfo, isLoggedIn]);

	return (
		<>
			<div className="d-flex flex-column h-100" style={{ minHeight: "100vh" }}>
				<Header />
				<Suspense fallback={<AppLoader />}>
					<Routes>
						<Route path="/" element={<LazyComponents.Home />} />
						<Route path="/about" element={<LazyComponents.About />} />
						<Route path="/virtual-counselor" element={<LazyComponents.VirtualCounselor />} />
						<Route path="/resources" element={<LazyComponents.Resources />} />
						<Route path="/resource-detail" element={<LazyComponents.ResourceDetail />} />
						<Route path="/blog-detail" element={<LazyComponents.BlogDetail />} />
						<Route path="/subscription" element={<LazyComponents.Subscription />} />
						<Route path="/faqs" element={<LazyComponents.Faqs />} />
						<Route path="/contact" element={<LazyComponents.Contact />} />

						{/* Guest routes for users not logged in */}
						<Route
							path="/"
							element={<GuestRoute authStatus={authStatus} isUserVerified={isUserVerified} isLoggedIn={isLoggedIn} />}
						>
							<Route path="/auth" element={<LazyComponents.Auth />} />
							<Route path="/register" element={<LazyComponents.Register />} />
							<Route path="/login" element={<LazyComponents.Login />} />
							<Route path="/forgot-password" element={<LazyComponents.ForgotPassword />} />
							<Route path="/reset-password" element={<LazyComponents.ResetPassword />} />
							<Route path="/set-password" element={<LazyComponents.SetPassword />} />
						</Route>

						{/* Protected routes for logged in users */}
						<Route path="/" element={<ProtectedRoute authStatus={authStatus} />}>
							<Route path="/dashboard" element={<LazyComponents.Dashboard />} />

							<Route
								path="/email-verification"
								element={<LazyComponents.EmailOTPVerification isFetchingAndVerifyingUser={isFetchingAndVerifyingUser} />}
							/>
						</Route>

						<Route path="*" element={<LazyComponents.ErrorPage />} />
					</Routes>
				</Suspense>
				<Footer />
			</div>
		</>
	);
}

export default App;
