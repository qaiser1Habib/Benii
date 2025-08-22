// import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import ProgressBar from "../../../../styles/ProgressBar";
import { Chart, defaults } from "chart.js/auto";
// import { Line } from "react-chartjs-2";
// import revenueData from "../../../../data/revenueData.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef } from "react";
import EventCalender from "../../../../styles/slider/EventCalendar";
import BarChart from "../../../../styles/BarChart";
import { MdOutlineStar } from "react-icons/md";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const Stats = () => {
	const swiperBlogRef = useRef(null);
	const swiperProgressRef = useRef(null);

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

	const cardData = [
		{
			imgSrc: "/assets/images/therapist-icon-1.png",
			title: "Active Services",
			change: "+4.2%",
			changeClass: "text-success",
			description: "va last Month",
			value: "12",
		},
		{
			imgSrc: "/assets/images/therapist-icon-2.png",
			title: "New Services",
			change: "-1.2%",
			changeClass: "text-danger",
			description: "va last Month",
			value: "02",
		},
		{
			imgSrc: "/assets/images/therapist-icon-3.png",
			title: "Avg Reviews",
			change: "+3.4%",
			changeClass: "text-success",
			description: "va last Month",
			value: "20",
		},
		{
			imgSrc: "/assets/images/therapist-icon-4.png",
			title: "Avg Reply Time",
			change: "+3.4%",
			changeClass: "text-success",
			description: "va last Month",
			value: "15 min",
		},
	];

	return (
		<div className="row fade-in">
			<div className="col-12 ps-3">
				<div className="row">
					{cardData.map((card, index) => (
						<div key={index} className="col-sm-6 col-lg-4 col-xl-6 col-xxl-4 col-xxxl-3 px-2 mb-3">
							<div className="bg-white-50 px-4 pt-2 my-3 my-xxxl-0 round-10px dashboard-card-shadow h-100 d-flex flex-column ">
								<div className="d-flex gap-3">
									<div className="mt-3">
										<img src={card.imgSrc} alt="" width={35} />
									</div>
									<div>
										<p className="fw-medium fs-18px mb-1 mt-3">{card.title}</p>
										<p className="fe-medium fs-14px text-secondary-dark mb-2">
											<span className={card.changeClass}>{card.change} </span>
											{card.description}
										</p>
									</div>
								</div>
								<p className="fs-26px text-primary fw-medium text-center pb-2  mt-auto">{card.value}</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className=" col-xl-12 col-xxxl-8 my-3  mt-xxxl-0 ps-3">
				<div className="bg-white-50 round-10px py-5 px-5 position-relative h-100 dashboard-card-shadow">
					<h2 className="fs-26px fw-medium ">Client Demographic</h2>
					<div>
						<BarChart />
					</div>
				</div>
			</div>
			<div className="col-lg-6  col-xl-12 col-xxl-6 col-xxxl-4 my-3 mt-xxxl-0">
				<div className="bg-white-50 round-10px py-4   position-relative h-100 d-flex flex-column  align-items-start dashboard-card-shadow">
					<h2 className="fs-22px fw-medium px-4 mb-0">Today&apos;s Appointments</h2>
					<div className="w-100">
						<Swiper
							ref={swiperBlogRef}
							navigation={true}
							loop={true}
							autoplay={true}
							modules={[Navigation, Autoplay]}
							className="mySwiper swiper-container_3 "
						>
							<SwiperSlide className="d-flex flex-column   px-4 pb-4">
								{" "}
								<div className="bg-white py-3  px-3 round-10px dashboard-blog-card mt-3">
									<p className="fs-14px fw-medium text-dark mb-3">
										Psychotic Disorders: Including schizophrenia, schizoaffective disorder, and delusional disorder.
									</p>
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center gap-2">
											<img src="/assets/images/blog-user_3.png" alt="" width={32} />
											<span className="fw-semibold text-dark fs-14px">Chris Roxin</span>
										</div>
									</div>
								</div>
								<EventCalender />
							</SwiperSlide>
							<SwiperSlide className="d-flex flex-column   px-4 pb-4">
								{" "}
								<div className="bg-white py-3  px-3 round-10px dashboard-blog-card mt-3">
									<p className="fs-14px fw-medium text-dark mb-3">
										Psychotic Disorders: Including schizophrenia, schizoaffective disorder, and delusional disorder.
									</p>
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center gap-2">
											<img src="/assets/images/blog-user_3.png" alt="" width={32} />
											<span className="fw-semibold text-dark fs-14px">Chris Roxin</span>
										</div>
									</div>
								</div>
								<EventCalender />
							</SwiperSlide>
							<SwiperSlide className="d-flex flex-column   px-4 pb-4">
								{" "}
								<div className="bg-white py-3  px-3 round-10px dashboard-blog-card mt-3">
									<p className="fs-14px fw-medium text-dark mb-3">
										Psychotic Disorders: Including schizophrenia, schizoaffective disorder, and delusional disorder.
									</p>
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center gap-2">
											<img src="/assets/images/blog-user_3.png" alt="" width={32} />
											<span className="fw-semibold text-dark fs-14px">Chris Roxin</span>
										</div>
									</div>
								</div>
								<EventCalender />
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
			<div className="col-lg-6  col-xl-12 col-xxl-6 my-3">
				<div className="bg-white-50 round-10px py-3 pt-4   position-relative h-100 d-flex flex-column  align-items-start dashboard-card-shadow">
					<div className="w-100 px-4">
						<div className="d-flex align-items-start w-100 justify-content-start">
							<img src="/assets/images/client-satisfaction.png" alt="" width={71} height={90} />
							<div className="px-2 w-100">
								<div className="w-100">
									<div className="ps-1">
										<h2 className="fs-26px fw-medium mb-0">Client Satisfaction</h2>
										<p className="fs-16px fw-medium text-dark  text-secondary-dark mb-4">
											7 of 5 patients improving the quality of health
										</p>
									</div>
									<div className="bg-secondary-light w-100 h-6px round-5px">
										<div className={`bg-primary h-100 round-5px progress-bar-${"3"}-done`}></div>
									</div>
								</div>
							</div>
						</div>
						<Swiper
							ref={swiperProgressRef}
							navigation={true}
							loop={true}
							autoplay={true}
							modules={[Navigation, Autoplay]}
							className="mySwiper swiper-container_3 "
						>
							<SwiperSlide className="d-flex flex-column  align-items-start px-1 pb-5">
								<div className="d-flex align-items-center w-100 justify-content-start mt-0">
									<div className="d-flex align-items-center">
										<img src="/assets/images/user-1.png" alt="" className="mt-2" />
										<div className="d-flex  w-100">
											<div className="px-3">
												<h4 className=" fw-medium  fs-21px text-dark mb-1 mt-5">Isabella</h4>
												<div className=" pe-xl-5 ">
													<p className=" text-dark mb-2">
														What I love most about Benii is the convenience. It's always there when I need to talk,
														and its personalized advice has been incredibly helpful for my mental health journey.
													</p>
												</div>
												<div className="fs-20px d-flex  gap-1">
													<MdOutlineStar className="text-warning" />
													<MdOutlineStar className="text-warning" />
													<MdOutlineStar className="text-warning" />
													<MdOutlineStar className="text-warning" />
													<MdOutlineStar className="text-secondary" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="d-flex flex-column  align-items-start px-1 pb-5">
								<div className="d-flex align-items-center w-100 justify-content-start mt-0">
									<div className="d-flex align-items-center">
										<img src="/assets/images/user-1.png" alt="" className="mt-2" />
										<div className="d-flex  w-100">
											<div className="px-3">
												<h4 className=" fw-medium  fs-21px text-dark mb-1 mt-5">Isabella</h4>
												<div className=" pe-xl-5 ">
													<p className=" text-dark mb-2">
														What I love most about Benii is the convenience. It's always there when I need to talk,
														and its personalized advice has been incredibly helpful for my mental health journey.
													</p>
												</div>
												<div className="fs-20px d-flex  gap-1">
													<MdOutlineStar className="text-warning" />
													<MdOutlineStar className="text-warning" />
													<MdOutlineStar className="text-warning" />
													<MdOutlineStar className="text-warning" />
													<MdOutlineStar className="text-secondary" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="d-flex flex-column  align-items-start px-1 pb-5">
								<div className="d-flex align-items-center w-100 justify-content-start mt-0">
									<div className="d-flex align-items-center">
										<img src="/assets/images/user-1.png" alt="" className="mt-2" />
										<div className="d-flex  w-100">
											<div className="px-3">
												<h4 className=" fw-medium  fs-21px text-dark mb-1 mt-5">Isabella</h4>
												<div className=" pe-xl-5 ">
													<p className=" text-dark mb-2">
														What I love most about Benii is the convenience. It's always there when I need to talk,
														and its personalized advice has been incredibly helpful for my mental health journey.
													</p>
												</div>
												<div className="fs-20px d-flex  gap-1">
													<MdOutlineStar className="text-warning" />
													<MdOutlineStar className="text-warning" />
													<MdOutlineStar className="text-warning" />
													<MdOutlineStar className="text-warning" />
													<MdOutlineStar className="text-secondary" />
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
			<div className="col-lg-6 col-xl-12 col-xxl-6 my-3">
				<div className="bg-white-50 round-10px py-4  px-4 position-relative h-100 dashboard-card-shadow">
					<div className="d-flex align-items-start w-100 justify-content-start mt-1">
						<img src="/assets/images/bought-package.png" alt="" width={71} height={90} />
						<div className="px-2 w-100">
							<div className="w-100">
								<div className="ps-0">
									<h2 className="fs-26px fw-medium mb-0">Most Bought Package</h2>
									<p className="fs-16px fw-medium text-dark  text-secondary-dark mb-4">
										Summaries of your most bought packges
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-4 row ps-2">
						<div className="col-12 col-sm-4 col-lg-6  col-xl-4 col-xxl-5 col-xxxl-4 mt-5">
							<div className="d-flex justify-content-center justify-content-sm-start">
								<div className="d-flex align-items-center justify-content-center flex-column">
									<ProgressBar
										percentage={60}
										statusProgress={"60%"}
										content={true}
										barWidth={"70px"}
										circleMarginTop={15}
										statusMargin={"mb-4 pb-2"}
									/>
									<p className=" fw-semibold fs-14px text-center text-nowrap   text-dashboard-secondary mb-0 mt-0">
										Stress Management{" "}
									</p>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-4 col-lg-6 col-xl-4 col-xxl-5 col-xxxl-4 mt-5">
							<div className="d-flex justify-content-center justify-content-sm-start">
								<div className="d-flex align-items-center justify-content-center flex-column">
									<ProgressBar
										percentage={75}
										statusProgress={"75%"}
										content={true}
										barWidth={"90px"}
										statusMargin={"mb-2"}
									/>
									<p className=" fw-semibold fs-14px   text-dashboard-secondary mb-0 mt-3 text-center text-nowrap">
										Career Counseling
									</p>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-4 col-lg-6 col-xl-4 col-xxl-5 col-xxxl-4 mt-5">
							<div className="d-flex justify-content-center justify-content-sm-start">
								<div className="d-flex align-items-center justify-content-center flex-column">
									<ProgressBar
										percentage={45}
										statusProgress={"45%"}
										content={true}
										barWidth={"70px"}
										circleMarginTop={15}
										statusMargin={"mb-4 pb-2"}
									/>
									<p className=" fw-semibold fs-14px   text-dashboard-secondary mb-0 mt-0 text-center text-nowrap">
										Couples Counseling
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="col-12 my-3 mb-xxl-0 mt-xxl-3 ">
				<div className="bg-white-50 h-100 py-4  px-4 round-10px position-relative dashboard-card-shadow">
					<h2 className="fs-30px fw-medium mb-0">Generated Revenue</h2>

					<div className="d-flex align-items-center gap-4 my-5">
						<p className="mb-0 me-3">Aug</p>
						<div className="bg-primary h-6px  rounded-pill position-relative" style={{ width: `${1000 / 10}%` }}></div>
						<div className="   rounded-1 bg-primary position-relative text-white custom-tooltip py-1 px-1 pe-3 ">
							$1000
							<div className="triangle position-absolute  "></div>
						</div>
					</div>
					<div className="d-flex align-items-center gap-4 my-5">
						<p className="mb-0 me-3">Sep</p>
						<div className="bg-primary h-6px  rounded-pill position-relative" style={{ width: `${700 / 10}%` }}></div>
						<div className="   rounded-1 bg-primary position-relative text-white custom-tooltip py-1 px-1 pe-3 ">
							$700
							<div className="triangle position-absolute  "></div>
						</div>
					</div>
					<div className="d-flex align-items-center gap-4 mt-5">
						<p className="mb-0 me-3">Oct</p>
						<div className="bg-primary h-6px  rounded-pill position-relative" style={{ width: `${800 / 10}%` }}></div>
						<div className="   rounded-1 bg-primary position-relative text-white custom-tooltip py-1 px-1 pe-3 ">
							$800
							<div className="triangle position-absolute  "></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Stats;
