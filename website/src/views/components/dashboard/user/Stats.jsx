import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import ProgressBar from "../../../../styles/ProgressBar";
import { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import revenueData from "../../../../data/revenueData.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import { setCurrentPage } from "../../../../store/redux/dashboardPreferences";
import { useDispatch } from "react-redux";
import MoodTrackModal from "../../../../styles/modals/MoodTrackModal";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const Stats = () => {
	const swiperBlogRef = useRef(null);
	const swiperProgressRef = useRef(null);
	const [mood, setMood] = useState("");
	const [selectedMood, setSelectedMood] = useState("");
	const dispatch = useDispatch();
	const [showMoodTrackModal, setShowMoodTrackModal] = useState(false);
	const handleMoodChange = (e) => {
		setSelectedMood(e.target.value);
	};

	const moods = ["happy", "good", "normal", "bad", "awful"];

	useEffect(() => {
		const handlePreviousBlog = () => {
			swiperBlogRef.current.swiper.slidePrev();
		};

		const handleNextBlog = () => {
			swiperBlogRef.current.swiper.slideNext();
		};

		const handlePreviousProgress = () => {
			swiperProgressRef.current.swiper.slidePrev();
		};

		const handleNextProgress = () => {
			swiperProgressRef.current.swiper.slideNext();
		};

		document.getElementById("previousBlog").addEventListener("click", handlePreviousBlog);
		document.getElementById("nextBlog").addEventListener("click", handleNextBlog);
		document.getElementById("previousReport").addEventListener("click", handlePreviousProgress);
		document.getElementById("nextReport").addEventListener("click", handleNextProgress);
	}, []);
	const options = {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				grid: {
					display: true,
					color: "#e0e0e0",
				},
			},
			y: {
				beginAtZero: true,
				grid: {
					display: false,
				},
			},
		},
		elements: {
			line: {
				tension: 0.5,
				borderColor: "#6f688d",
				borderWidth: 3.5,
				fill: false,
			},
			point: {
				radius: 0,
			},
		},
	};

	return (
		<div className="row fade-in ">
			<div className=" col-xxxl-8 my-3  mt-xxxl-0">
				<div className="bg-white-50 round-10px py-4 px-4 h-100 dashboard-card-shadow">
					<div className="d-flex justify-content-between">
						<div>
							<h2 className="fs-26px fw-medium mb-4">Track Your Mood</h2>
							<p className="fs-20px fw-semibold text-dashboard-secondary mb-1 pt-2">Complete Today’s log!</p>
							<p className="fs-18px text-secondary-dark fw-medium">How are you feeling?</p>
						</div>

						<div className="dropdown">
							<button
								className="cursor-pointer px-0 bg-transparent border-0 m-0 text-capitalize truncate"
								type="button"
								id="dropdownMenuButton1"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<PiDotsThreeOutlineVerticalBold className="three-dots-large-card fs-4 cursor-pointer" />
							</button>
							<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
								<li>
									<a
										onClick={() => setShowMoodTrackModal(true)}
										className="dropdown-item user-profile-dropdown-item cursor-pointer"
									>
										View Track Report
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="row justify-content-between pt-5">
						{moods.map((moodType, index) => (
							<div key={index} className="col-6 col-sm-4 col-md-2 col-xl-3 col-xxl-2">
								<div className="d-flex align-items-center justify-content-end flex-column">
									<label
										className={`d-flex align-items-center justify-content-center flex-column cursor-pointer ${
											selectedMood === moodType ? "active-mood" : ""
										}`}
									>
										<input type="radio" name="mood" value={moodType} className="d-none" onChange={handleMoodChange} />
										<img
											src={`/assets/images/${moodType}.png`}
											alt={moodType.charAt(0).toUpperCase() + moodType.slice(1)}
											className="w-75 mb-3"
										/>
										<p className="fs-20px text-secondary-dark fw-medium">
											{moodType.charAt(0).toUpperCase() + moodType.slice(1)}
										</p>
									</label>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="col-lg-6  col-xl-12 col-xxl-6 col-xxxl-4 my-3 mt-xxxl-0">
				<div className="bg-white-50 round-10px py-4 pt-5  position-relative h-100 d-flex flex-column  align-items-start dashboard-card-shadow">
					<div className="w-100">
						<Swiper
							ref={swiperBlogRef}
							navigation={true}
							loop={true}
							autoplay={true}
							modules={[Navigation, Autoplay]}
							className="mySwiper swiper-container_3 "
						>
							<SwiperSlide className="d-flex flex-column  align-items-start px-4 pb-4">
								<h2 className="fs-18px fw-medium mb-4">Insights & Recommendations</h2>
								{/* <PiDotsThreeOutlineVerticalBold className="position-absolute three-dots-small-card fs-4 cursor-pointer" /> */}
								<div className="bg-white-50 round-15px py-2 px-3 fw-semibold contact-info-bullet-shadow mt-2 fs-12px  ">
									15 November 23
								</div>
								<div className="bg-white py-3 pt-4 px-3 round-10px dashboard-blog-card mt-3">
									<p className="fs-12px fw-medium text-dark mb-4">The Impact of Stress: Tips for Stress Management</p>
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center gap-2">
											<img src="/assets/images/blog-user_3.png" alt="" width={32} />
											<span className="fw-semibold text-dark fs-14px">Chris Roxin</span>
										</div>
										<Link className="fw-semibold text-primary text-decoration-none fs-14px">Read More</Link>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="d-flex flex-column  align-items-start px-4 pb-4">
								<h2 className="fs-18px fw-medium mb-4">Insights & Recommendations</h2>
								{/* <PiDotsThreeOutlineVerticalBold className="position-absolute three-dots-small-card fs-4 cursor-pointer" /> */}
								<div className="bg-white-50 round-15px py-2 px-3 fw-semibold contact-info-bullet-shadow mt-2 fs-12px">
									15 November 23
								</div>
								<div className="bg-white py-3 pt-4 px-3 round-10px dashboard-blog-card mt-3">
									<p className="fs-12px fw-medium text-dark mb-4">The Impact of Stress: Tips for Stress Management</p>
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center gap-2">
											<img src="/assets/images/blog-user_3.png" alt="" width={32} />
											<span className="fw-semibold text-dark fs-14px">Chris Roxin</span>
										</div>
										<Link className="fw-semibold text-primary text-decoration-none fs-14px">Read More</Link>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="d-flex flex-column  align-items-start px-4 pb-4">
								<h2 className="fs-18px fw-medium mb-4">Insights & Recommendations</h2>
								{/* <PiDotsThreeOutlineVerticalBold className="position-absolute three-dots-small-card fs-4 cursor-pointer" /> */}
								<div className="bg-white-50 round-15px py-2 px-3 fw-semibold contact-info-bullet-shadow mt-2 fs-12px">
									15 November 23
								</div>
								<div className="bg-white py-3 pt-4 px-3 round-10px dashboard-blog-card mt-3">
									<p className="fs-12px fw-medium text-dark mb-4">The Impact of Stress: Tips for Stress Management</p>
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center gap-2">
											<img src="/assets/images/blog-user_3.png" alt="" width={32} />
											<span className="fw-semibold text-dark fs-14px">Chris Roxin</span>
										</div>
										<Link className="fw-semibold text-primary text-decoration-none fs-14px">Read More</Link>
									</div>
								</div>
							</SwiperSlide>
						</Swiper>
					</div>
					<div className="d-flex align-items-center justify-content-between mt-auto pb-3 w-100 px-4">
						<div id="previousBlog" className="d-flex  fs-18px fw-medium text-card-arrow cursor-pointer">
							<FaArrowLeft className="mx-2 mt-1" />
							Previous
						</div>
						<div id="nextBlog" className="d-flex  fs-18px fw-medium text-card-arrow cursor-pointer">
							Next <FaArrowRight className="mx-2 mt-1" />
						</div>
					</div>
				</div>
			</div>
			<div className="col-lg-6 col-xl-12 col-xxl-6 my-3">
				<div className="bg-white-50 round-10px py-4 px-4 position-relative h-100 d-flex flex-column  align-items-start dashboard-card-shadow">
					<div className="d-flex justify-content-between w-100">
						<div>
							<div className="d-flex align-items-start w-100 justify-content-start">
								<img src="/assets/images/progress.png" className="mt-1" width={71} height={90} />
								<div className="px-2 w-100 mt-3">
									<div className="w-100">
										<div className="ps-0">
											<h2 className="fs-26px fw-medium mb-0">Goals Progress</h2>
											<p className="fs-18px fw-medium text-dark  text-secondary-dark mb-4">
												You marked 4 of 5 task done
											</p>
										</div>
										<div className="bg-secondary-light w-100 h-6px round-5px ">
											<div className={`bg-primary h-100 round-5px progress-bar-${"4"}-done`}></div>
										</div>
									</div>
									<div className="mt-5 row">
										<p className="fs-20px fw-semibold text-dashboard-secondary">Current Progress</p>
										<div className="col-6 col-sm-4 col-lg-6 col-xl-4 my-2">
											<div className="d-flex justify-content-start">
												<div className="d-flex align-items-center justify-content-center flex-column">
													<ProgressBar percentage={75} />
													<p className=" fw-medium text-nowrap   text-secondary-dark mb-0 mt-3">Mental health</p>
												</div>
											</div>
										</div>
										<div className="col-6 col-sm-4 col-lg-6 col-xl-4 my-2">
											<div className="d-flex justify-content-start">
												<div className="d-flex align-items-center justify-content-center flex-column">
													<ProgressBar percentage={85} />
													<p className=" fw-medium  text-nowrap text-secondary-dark mb-0 mt-3">Self Care</p>
												</div>
											</div>
										</div>
										<div className="col-6 col-sm-4 col-lg-6 col-xl-4 my-2">
											<div className="d-flex justify-content-start">
												<div className="d-flex align-items-center justify-content-center flex-column">
													<ProgressBar percentage={65} />
													<p className=" fw-medium  text-nowrap text-secondary-dark mb-0 mt-3">Therapy</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="dropdown">
							<button
								className="cursor-pointer px-0 bg-transparent border-0 m-0 text-capitalize truncate"
								type="button"
								id="dropdownMenuButton1"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<PiDotsThreeOutlineVerticalBold className="three-dots-large-card fs-4 cursor-pointer" />
							</button>
							<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
								<li>
									<a
										onClick={() => dispatch(setCurrentPage("goals"))}
										className="dropdown-item user-profile-dropdown-item cursor-pointer"
									>
										View Goal
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="col-lg-6  col-xl-12 col-xxl-6 my-3">
				<div className="bg-white-50 round-10px py-3 pt-4   position-relative h-100 d-flex flex-column  align-items-start dashboard-card-shadow">
					<div className="w-100 px-2">
						<Swiper
							ref={swiperProgressRef}
							navigation={true}
							loop={true}
							autoplay={true}
							modules={[Navigation, Autoplay]}
							className="mySwiper swiper-container_3 "
						>
							<SwiperSlide className="d-flex flex-column  align-items-start px-4 pb-4">
								<div className="d-flex align-items-start w-100 justify-content-start mt-1 ">
									<img src="/assets/images/progress-report.png" alt="" width={71} height={90} />
									<div className="px-2 w-100 mt-3">
										<div className="w-100">
											<div className="ps-0">
												<h2 className="fs-26px fw-medium mb-0">Progress Reports</h2>
												<p className="fs-18px fw-medium text-dark  text-secondary-dark mb-4">
													Summaries of your progress
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center w-100 justify-content-start mt-3">
									<div className="d-flex align-items-center">
										<ProgressBar
											percentage={65}
											statusProgress={"1 of 4"}
											statusText={"Status"}
											statusMargin={"mt-3"}
											barWidth={"150px"}
											content={true}
										/>
										<div className="d-flex  w-100">
											<div className="px-3">
												<h4 className=" fw-semibold  fs-22px text-secondary-dark mb-1 mt-5">Your Progress</h4>
												<div className="fs-12px pe-5 ">
													<p className=" text-secondary">
														Lorem ipsum dolor sit, consectetur elit, sed do adipisicing eiusmod tempor. Lorem ipsum
														dolor sit, consectetur elit, sed do adipisicing eiusmod tempor
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="d-flex flex-column  align-items-start px-4 pb-4">
								<div className="d-flex align-items-start w-100 justify-content-start mt-1 ">
									<img src="/assets/images/progress-report.png" alt="" width={71} height={90} />
									<div className="px-2 w-100 mt-3">
										<div className="w-100">
											<div className="ps-0">
												<h2 className="fs-26px fw-medium mb-0">Progress Reports</h2>
												<p className="fs-18px fw-medium text-dark  text-secondary-dark mb-4">
													Summaries of your progress
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center w-100 justify-content-start mt-3">
									<div className="d-flex align-items-center">
										<ProgressBar
											percentage={50}
											statusProgress={"2 of 4"}
											statusText={"Status"}
											statusMargin={"mt-3"}
											barWidth={"150px"}
											content={true}
										/>
										<div className="d-flex  w-100">
											<div className="px-3">
												<h4 className=" fw-semibold  fs-22px text-secondary-dark mb-1 mt-5">Your Progress</h4>
												<div className="fs-12px pe-5 ">
													<p className=" text-secondary">
														Lorem ipsum dolor sit, consectetur elit, sed do adipisicing eiusmod tempor. Lorem ipsum
														dolor sit, consectetur elit, sed do adipisicing eiusmod tempor
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="d-flex flex-column  align-items-start px-4 pb-4">
								<div className="d-flex align-items-start w-100 justify-content-start mt-1 ">
									<img src="/assets/images/progress-report.png" alt="" width={71} height={90} />
									<div className="px-2 w-100 mt-3">
										<div className="w-100">
											<div className="ps-0">
												<h2 className="fs-26px fw-medium mb-0">Progress Reports</h2>
												<p className="fs-18px fw-medium text-dark  text-secondary-dark mb-4">
													Summaries of your progress
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center w-100 justify-content-start mt-3">
									<div className="d-flex align-items-center">
										<ProgressBar
											percentage={35}
											statusProgress={"3 of 4"}
											statusText={"Status"}
											statusMargin={"mt-3"}
											barWidth={"150px"}
											content={true}
										/>
										<div className="d-flex  w-100">
											<div className="px-3">
												<h4 className=" fw-semibold  fs-22px text-secondary-dark mb-1 mt-5">Your Progress</h4>
												<div className="fs-12px pe-5 ">
													<p className=" text-secondary">
														Lorem ipsum dolor sit, consectetur elit, sed do adipisicing eiusmod tempor. Lorem ipsum
														dolor sit, consectetur elit, sed do adipisicing eiusmod tempor
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="d-flex flex-column  align-items-start px-4 pb-4">
								<div className="d-flex align-items-start w-100 justify-content-start mt-1 ">
									<img src="/assets/images/progress-report.png" alt="" width={71} height={90} />
									<div className="px-2 w-100 mt-3">
										<div className="w-100">
											<div className="ps-0">
												<h2 className="fs-26px fw-medium mb-0">Progress Reports</h2>
												<p className="fs-18px fw-medium text-dark  text-secondary-dark mb-4">
													Summaries of your progress
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center w-100 justify-content-start mt-3">
									<div className="d-flex align-items-center">
										<ProgressBar
											percentage={20}
											statusProgress={"4 of 4"}
											statusText={"Status"}
											statusMargin={"mt-3"}
											barWidth={"150px"}
											content={true}
										/>
										<div className="d-flex  w-100">
											<div className="px-3">
												<h4 className=" fw-semibold  fs-22px text-secondary-dark mb-1 mt-5">Your Progress</h4>
												<div className="fs-12px pe-5 ">
													<p className=" text-secondary">
														Lorem ipsum dolor sit, consectetur elit, sed do adipisicing eiusmod tempor. Lorem ipsum
														dolor sit, consectetur elit, sed do adipisicing eiusmod tempor
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</SwiperSlide>
						</Swiper>
					</div>

					<div className="d-flex align-items-center justify-content-between mt-auto pb-3 w-100 px-4">
						<div id="previousReport" className="d-flex  fs-18px fw-medium text-card-arrow cursor-pointer ps-2">
							<FaArrowLeft className="mx-2 mt-1" />
							Previous
						</div>
						<div id="nextReport" className="d-flex  fs-18px fw-medium text-card-arrow cursor-pointer pe-2">
							Next <FaArrowRight className="mx-2 mt-1" />
						</div>
					</div>
				</div>
			</div>
			<div className="col-12 my-3 " style={{ height: "500px" }}>
				<div className="bg-white-50 h-100 p-5 pb-5 px-4 round-10px position-relative dashboard-card-shadow">
					<h2 className="fs-30px fw-medium mb-0">Activity Feed</h2>
					<Line
						className="pb-3 px-5"
						data={{
							labels: revenueData.map((data) => data.label),
							datasets: [
								{
									label: "Revenue",
									data: revenueData.map((data) => data.revenue),
									backgroundColor: "#6f688d",
									borderColor: "#6f688d",
									fill: false,
								},
							],
						}}
						options={options}
					/>
				</div>
			</div>
			<MoodTrackModal showModal={showMoodTrackModal} setShowModal={setShowMoodTrackModal} />
		</div>
	);
};

export default Stats;
