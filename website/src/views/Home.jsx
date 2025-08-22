import { Link } from "react-router-dom";
import ServiceCard from "../styles/cards/ServiceCard";
import Testimonial from "../styles/slider/Testimonial";
import SubscriptionsPlans from "./components/subscriptions/SubscriptionsPlans";
import Blogs from "./Blogs";
import { useSelector } from "react-redux";

const Home = () => {
	const loggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo);

	return (
		<div className="fade-in">
			<div className="container py-5 position-relative ">
				<div className="row py-5 flex-column-reverse flex-lg-row  ">
					<div className="col-lg-6 px-auto px-xl-5 pt-5">
						<div>
							<h1 className=" h1 ">Empathy, Insight, Progress Your Mental Health Partner</h1>
							<p className="text-secondary pt-2 ">
								Experience the transformative power of AI-driven empathy, providing insightful guidance and personalized
								strategies to support progress on your unique mental health journey.
							</p>
							<div className="d-flex align-items-center gap-3 pt-4 ">
								<Link className="btn btn-primary py-3" to="/about">
									More About Us
								</Link>
								<Link className="btn btn-primary-outline py-3 px-4" to="/contact">
									Contact Us
								</Link>
							</div>
						</div>
					</div>
					<div className="col-12 col-lg-6   d-flex align-items-center justify-content-end">
						<div className="position-relative home-banner-img bg-primary  d-flex align-items-center justify-content-end  ">
							<div className="position-absolute  blur-box d-none d-xl-block"></div>
							<div className="d-flex align-items-start flex-column justify-content-start position-absolute   p-4 gap-3 banner-img-text-card">
								<div className="home-banner-img-text d-flex justify-content-center align-items-center gap-2 shadow-sm ">
									<span className="text-primary fw-medium fs-4 ">Best </span>
									<span>Ai self learning bot</span>
								</div>
								<div className="home-banner-img-text d-flex justify-content-center align-items-center gap-2 shadow-sm">
									<span className="text-primary fw-medium fs-4">20K </span>
									<span> Patients healed</span>
								</div>
							</div>
							<img src="/assets/images/home-banner.png" alt="" className="img-fluid " />
						</div>
					</div>
				</div>
				<div className="position-absolute  blur-box-bottom d-none d-lg-block"></div>
			</div>
			<div className="container py-5 my-3 ">
				<div className="row justify-content-end justify-content-md-between align-items-center  ">
					<div className="col-11   col-lg-6 col-xxl-4 px-4 my-3 my-xxl-0  ">
						<div className="bg-primary p-4 position-relative mx-3 round-10px choose-us-card">
							<div className="choose-us-blur-circle d-flex align-items-center justify-content-center position-absolute shadow-sm">
								<img src="/assets/images/response.png" alt="" className="img-fluid w-50 " />
							</div>
							<div className="ps-4">
								<p className="text-white ps-3 fs-5 mb-2">Prompt Responses</p>
								<p className="text-white fw-light ps-3 mb-2 fs-15px">
									Patients receive prompt responses and assistance from the AI bot
								</p>
							</div>
						</div>
					</div>
					<div className="col-11 col-lg-6 col-xxl-4 px-4 my-3 my-xxl-0">
						<div className="bg-primary p-4 position-relative mx-3 round-10px choose-us-card">
							<div className="choose-us-blur-circle d-flex align-items-center justify-content-center position-absolute shadow-sm">
								<img src="/assets/images/privacy.png" alt="" className="img-fluid w-50 " />
							</div>
							<div className="ps-4">
								<p className="text-white ps-3 fs-5 mb-2">Privacy & Confidentiality</p>
								<p className="text-white fw-light ps-3  mb-0 fs-15px">
									Patients can express themselves openly and confidentially to the AI bot.
								</p>
							</div>
						</div>
					</div>
					<div className="col-11 col-lg-6  col-xxl-4 px-4 my-3 my-xxl-0">
						<div className="bg-primary p-4 position-relative mx-3 round-10px choose-us-card">
							<div className="choose-us-blur-circle d-flex align-items-center justify-content-center position-absolute shadow-sm">
								<img src="/assets/images/availability.png" alt="" className="img-fluid w-50 " />
							</div>
							<div className="ps-4">
								<p className="text-white ps-3 fs-5 mb-2 ">24/7 Availability</p>
								<p className="text-white fw-light ps-3 mb-0 fs-15px">
									Unlike traditional services limited by office hours, the AI bot offers round-the-clock availability.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container py-5 my-5 ">
				<div className="row flex-column-reverse flex-lg-row">
					<div className="col-lg-6 mt-4 mt-lg-0 ">
						<p className="text-primary fw-medium fs-lg-4">About Us</p>
						<h1>A Legacy of Compassionate Care!</h1>
						<p className="text-secondary my-4">
							Benii is built on the belief that everyone deserves accessible, empathetic mental health support. Combining
							cutting-edge AI with a compassionate approach, Benii offers personalized guidance for life's challenges,
							helping you navigate your emotional well-being with care and understanding.
						</p>
						<div className="row">
							<div className=" col-md-6 col-lg-10 col-xl-6 my-3 my-xl-0">
								<div className="card-shadow p-4 round-10px ">
									<h4>Our Vision</h4>
									<p>
										To Provide accessible, compassionate mental health support for all, empowering individuals with
										AI-driven guidance that promotes emotional well-being and personal growth.
									</p>
								</div>
							</div>
							<div className="col-md-6 col-lg-10 col-xl-6 my-3 my-xl-0">
								<div className="card-shadow p-4 round-10px ">
									<h4>Our Mission</h4>
									<p>
										To Deliver personalized, empathetic mental health support through innovative AI technology, helping
										individuals navigate life's challenges with care and confidence.
									</p>
								</div>
							</div>
						</div>
						<Link to="/about" className="btn btn-primary mt-5 py-3 ">
							Learn More
						</Link>
					</div>
					<div className="col-lg-6 d-flex align-items-center justify-content-center">
						<img src="/assets/images/about-img.png" alt="" className="img-fluid w-100 " />
					</div>
				</div>
			</div>
			<div className="container py-5">
				<p className="text-primary fw-medium fs-lg-4">Services</p>
				<h1>Our Care Offerings</h1>
				<div className="row mt-4 ">
					<ServiceCard
						title={"Natural Language Processing (NLP)"}
						description={
							"Capable of understanding and analyzing natural language inputs from users, including text descriptions of emotions, symptoms, and concerns related to mental health."
						}
						image={"/assets/images/nlp.png"}
					/>
					<ServiceCard
						title={"Emotion Recognition"}
						description={
							"Utilizes algorithms to recognize and interpret emotions expressed in user inputs, allowing for empathetic and contextually appropriate responses."
						}
						image={"/assets/images/emotion-recognition.png"}
					/>
					<ServiceCard
						title={"Personalized Recommendations"}
						description={
							"Provides tailored suggestions, coping strategies, and resources based on individual user data, preferences, and historical interactions with the bot."
						}
						image={"/assets/images/personalized-recommend.png"}
					/>
					<ServiceCard
						title={"Risk Assessment"}
						description={
							"Employs algorithms to assess the risk levels associated with mental health issues, such as depression, anxiety, self-harm, or suicidal ideation, and offers..."
						}
						image={"/assets/images/risk-assessment.png"}
					/>
					<ServiceCard
						title={"24/7 Availability"}
						description={
							"Accessible round-the-clock, ensuring users can seek support and assistance anytime, especially during urgent situations or outside typical office hours."
						}
						image={"/assets/images/availability.png"}
					/>
					<ServiceCard
						title={"Continuous Learning"}
						description={
							"Learns from user interactions, feedback, and data insights to improve response accuracy, adaptability, and the overall quality of assistance provided over time."
						}
						image={"/assets/images/continuous-learning.png"}
					/>
				</div>
			</div>
			<div className="container py-5 my-5 ">
				<div className="helpline-bg pt-2 rounded-3 position-relative px-3 px-sm-5 px-lg-0">
					<div className="blur-box position-absolute  "></div>
					<div className="row pt-2 flex-column-reverse flex-lg-row">
						<div className="col-lg-6">
							<div className="d-flex align-items-start justify-content-center flex-column px-3 px-lg-5 h-100 mt-5">
								<h1 className="text-white my-2 ">Get Helpline Services with one Call Away</h1>
								<a href="tel:123 456 789" className="text-primary-dark text-decoration-none fs-1 my-2">
									<i className="fa-solid fa-phone"></i> +123 456 789
								</a>
								<p className="text-white my-2">We are available for your help 24/7</p>
								<Link to="/contact" className="btn helpline-btn mt-3 mb-5 my-lg-3 py-3">
									Contact Us
								</Link>
							</div>
						</div>
						<div className="col-lg-6">
							<img
								src="/assets/images/helpline-service.png"
								style={{ transform: "scaleX(-1)" }}
								alt=""
								className="img-fluid"
							/>
						</div>
					</div>
				</div>
			</div>
			{(!loggedInUserInfo?._id || loggedInUserInfo?.userRole === "therapist") && <SubscriptionsPlans />}
			<Blogs />
			<Testimonial />
		</div>
	);
};

export default Home;
