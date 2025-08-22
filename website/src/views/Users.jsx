import { useEffect, useState } from "react";
import DeleteModal from "../styles/modals/deleteModal";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../store/hooks/useToast";
import { deleteUser, getUsers, updateUser } from "../actions/users";

import Modal from "react-bootstrap/Modal";
import { InputSwitch } from "primereact/inputswitch";
import { Link } from "react-router-dom";
import BreadCrumb from "./partials/breadCrumb";

const Users = () => {
	const dispatch = useDispatch();
	const { notify } = useToast();
	const [isFetchingApi, setIsFetchingApi] = useState(false);

	const [formData, setFormData] = useState();
	const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);

	const [showAddModal, setShowAddModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const users = useSelector((state) => state?.users?.users || []);

	const page = 1;
	const limit = 100;

	useEffect(() => {
		dispatch(getUsers({ formData: { page: page, limit: limit, userRole: "user" }, notify }));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleEditItemButton = (user) => {
		setFormData(user);
		setIsUpdatingRecord(true);
		setShowAddModal(true);
	};

	const handleDeleteItemButton = (user) => {
		setFormData(user);
		setShowDeleteModal(true);
	};

	const handleSwitch = (e, formData) => {
		setIsFetchingApi(true);
		setIsUpdatingRecord(true);

		dispatch(updateUser({ formData: formData, notify })).then(() => {
			dispatch(getUsers({ formData: { page: page, limit: limit, userRole: "user" }, notify }));
			setIsFetchingApi(false);
		});
	};

	const handleSubmit = (e) => {
		setIsFetchingApi(true);

		e.preventDefault();

		isUpdatingRecord &&
			dispatch(updateUser({ formData: formData, notify })).then(({ payload }) => payload?._id && setShowAddModal(false));

		setIsFetchingApi(false);
	};

	const handleDelete = () => {
		dispatch(deleteUser({ formData: { _id: formData?._id }, notify })).then(() => {
			dispatch(getUsers({ formData: { page: page, limit: limit, userRole: "seller" }, notify }));
			setShowDeleteModal(false);
		});
	};

	return (
		<>
			<div className="fade-in">
				<BreadCrumb pageNames={["Users"]} />

				<div className="container-fluid px-0">
					<div>
						<div className="container-xxl ">
							<div className="row">
								<div className="d-flex flex-wrap flex-stack my-4">
									<div className="d-flex flex-wrap flex-stack">
										<div className="fw-bolder fs-4">All Users</div>
										<span className="badge badge-square badge-success ms-2">{users?.length}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="kt_content_container" className="d-flex flex-column-fluid align-items-start container-xxl">
					<div className="container">
						<div className="row">
							{users?.length ? (
								users.map((user, index) => (
									<div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex ">
										<div className="card shadow-sm mb-6 mb-xl-9 d-flex flex-column w-100">
											<div className="card-body py-3 px-3 card-scroll">
												<div className="text-center mb-2">
													<img
														className="w-100 img-fluid h-300px rounded"
														alt=""
														loading="lazy"
														src={`${import.meta.env.VITE_APP_API_URL}/v1/guests/media?filename=${
															user?.about?.profileImage?.filename
														}&mimetype=${user?.about?.profileImage?.mimetype}&width=500`}
														style={{ objectFit: "cover" }}
													/>
												</div>
											</div>

											<div className="card-body p-1 px-4 card-scroll">
												<div className="banner banner-light fs-2">
													{user?.firstName && user?.lastName
														? `${user.firstName} ${user.lastName}`
														: user?.firstName || user?.lastName || ""}
												</div>
												<div className="my-5">
													<p className="fs-6 fw-bold text-gray-600 m-0">Email: {user?.email}</p>
												</div>
												<div className="d-flex justify-content-between">
													<p className="fs-6 fw-bold text-gray-600 m-0">Approved:</p>
													<InputSwitch
														checked={user?.isApproved}
														onChange={(e) => handleSwitch(e, { ...user, isApproved: e.value })}
													/>
												</div>
											</div>

											<div className="card-footer p-1 px-4 d-flex w-100 justify-content-between  text-start mt-auto py-3">
												<div>
													{/* <i
													className="fas fa-edit svg-icon svg-icon-5 svg-icon-gray-500 p-2 pe-5 pb-3 pt-3 cursor-pointer"
													onClick={() => handleEditItemButton(user)}
												/> */}
													<Link to={`/user-info/${user._id}`}>
														<i className="fas fa-eye svg-icon svg-icon-5 svg-icon-gray-500 p-2 pe-5 pb-3 pt-3 cursor-pointer" />
													</Link>
													<i className="fas fa-trash cursor-pointer" onClick={() => handleDeleteItemButton(user)} />
												</div>

												<div>
													<InputSwitch
														checked={user?.isActive}
														onChange={(e) => handleSwitch(e, { ...user, isActive: e.value })}
													/>
												</div>
											</div>
										</div>
									</div>
								))
							) : (
								<>No Users Found</>
							)}
						</div>
					</div>
				</div>

				<Modal
					show={showAddModal}
					onHide={() => setShowAddModal(false)}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">User</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							<div className="col-md-4">
								<div className="fv-row mb-7 px-2">
									<img
										className="w-auto img-fluid h-200px rounded border"
										alt=""
										loading="lazy"
										src={`${import.meta.env.VITE_APP_API_URL}/v1/users/image?filename=${
											formData?.profileImage
										}&width=500`}
									/>
									<div className="d-flex flex-column px-2 mt-3">
										<p className="fw-bold fs-6 mb-2">Name: {formData?.firstName + " " + formData?.lastName}.</p>
										<p className="fw-bold fs-6 mb-2">
											Bio: <span className="fw-light">{formData?.bio}</span>
										</p>
									</div>
								</div>
							</div>
							<div className="col-md-8">
								<div className="d-flex flex-column px-2">
									<div className="d-flex mt-5">
										<div className="me-3 d-flex align-items-center">
											<label className="me-3">Is Paid & Active</label>
											<InputSwitch checked={formData?.subscription?.isActive} disabled />
										</div>

										<div className="me-3 d-flex align-items-center">
											<label className="me-3">Force Activate</label>
											<InputSwitch
												checked={formData?.subscription?.isActiveByAdmin}
												onChange={(e) =>
													setFormData({
														...formData,
														subscription: { ...formData.subscription, isActiveByAdmin: e.value },
													})
												}
											/>
											{!formData?.subscription?.subscriptionPlanID && <label>No subscription is selected</label>}
										</div>
									</div>
								</div>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<div className="w-100 d-flex justify-content-between flex-wrap flex-row-reverse">
							<button
								className="btn btn-primary ms-10 "
								disabled={isFetchingApi}
								data-kt-indicator={isFetchingApi}
								onClick={handleSubmit}
							>
								<span className="indicator-label " style={{ color: "white" }}>
									Submit
								</span>
								{isFetchingApi && (
									<span className="indicator-progress">
										Please wait...
										<span className="spinner-border spinner-border-sm align-middle ms-2" />
									</span>
								)}
							</button>
							<button type="button" className="btn btn-light" onClick={() => setShowAddModal(false)}>
								Close
							</button>
						</div>
					</Modal.Footer>
				</Modal>

				<DeleteModal handleDelete={handleDelete} showModal={showDeleteModal} setShowModal={setShowDeleteModal} />
			</div>
		</>
	);
};
export default Users;
