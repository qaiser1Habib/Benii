import { useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "./partials/BreadCrumb";

const VirtualCounselor = () => {
	const [process, setProcess] = useState(true);
	const [benefits, setBenefits] = useState(false);
	const [isActive, setIsActive] = useState(true);

	const handleProcess = () => {
		setProcess(true);
		setBenefits(false);
		toggleActive();
	};

	const handleBenefits = () => {
		setProcess(false);
		setBenefits(true);
		toggleActive();
	};

	const toggleActive = () => {
		setIsActive(!isActive);
	};

	return (
		<div className="fade-in">
			<BreadCrumb title="Virtual Counselor" />
			<div className="position-relative ">
				<div className="about-page-blur-bg d-none d-xl-block ">
					<div className="blur-box position-absolute"></div>
				</div>
				<div className="all-blur-bg d-none d-xl-block">
					<div className="blur-box position-absolute d-none d-xl-block "></div>
				</div>
				<div className="container py-5 my-5 ">
					<p className="text-primary fw-semibold fs-5 my-3 my-lg-0 mb-2 ">Our Approach</p>
					<h1 className="pt-2">Your journey begins with an initial consultation.</h1>
					<p className="text-secondary my-2 w-60 w-lg-100 ">
						where you&apos;ll meet with our experienced psychiatrist to discuss your concerns and goals.Following the
						initial consultation, we&apos;ll conduct a thorough assessment to gain a deeper understanding of your unique
						needs and circumstances.
					</p>
					<div className="mt-5">
						<div className="subscription-btn-card ourApproach  rounded-top-1  d-flex justify-content-between align-items-center ">
							<button
								className={`border-0 process-btn  px-5 d-flex align-items-center justify-content-center py-3 rounded-top-1 fw-medium ${
									isActive ? "active" : ""
								}`}
								onClick={handleProcess}
							>
								Process
							</button>
							<button
								className={`border-0 benefit-btn px-5 d-flex align-items-center justify-content-center py-3 rounded-top-1 fw-medium ${
									!isActive ? "active" : ""
								}`}
								onClick={handleBenefits}
							>
								Benefits
							</button>
						</div>
						{process && (
							<div className="bg-white-60 py-5 how-it-work ">
								<h1 className="text-center fw-medium ">How It Works</h1>
								<p className="text-center text-secondary">Empowering Your Mental Health Journey</p>

								<div className="row pt-4">
									<div className="col-md-6 col-xl-4 my-4">
										<div className="d-flex align-items-center justify-content-center flex-column ">
											<div className="  py-3 rounded d-flex align-items-center justify-content-center how-it-work-rotate-card mb-2">
												<img src="/assets/images/working-1.png" alt="" className="img-fluid " />
											</div>
											<span className="text-center mt-3 fw-medium fs-5">Data Collection</span>
											<p className="text-center text-secondary mt-2 px-5">
												The Benii collects and analyzes patient reports, which may include textual descriptions of
												symptoms, feelings, and experiences provided by the patients...
											</p>
										</div>
									</div>
									<div className="col-md-6 col-xl-4 my-4">
										<div className="d-flex align-items-center justify-content-center flex-column ">
											<div className=" px-1 py-3 rounded d-flex align-items-center justify-content-center how-it-work-rotate-card mb-2">
												<img src="/assets/images/working-2.png" alt="" className="img-fluid " />
											</div>
											<span className="text-center mt-3 fw-medium fs-5">Natural Language Processing (NLP)</span>
											<p className="text-center text-secondary mt-2 px-5">
												Utilizing advanced NLP techniques, the Benii interprets and understands the context, emotions,
												and nuances within the patient reports...
											</p>
										</div>
									</div>
									<div className="col-md-6 col-xl-4 my-4">
										<div className="d-flex align-items-center justify-content-center flex-column ">
											<div className=" px-2 py-3 rounded d-flex align-items-center justify-content-center how-it-work-rotate-card mb-2">
												<img src="/assets/images/working-3.png" alt="" className="img-fluid " />
											</div>
											<span className="text-center mt-3 fw-medium fs-5">Pattern Recognition</span>
											<p className="text-center text-secondary mt-2 px-5">
												Through machine learning algorithms, the Benii identifies patterns, trends, and relevant
												insights from the data to understand the patient&apos;s mental health status...
											</p>
										</div>
									</div>
									<div className="col-md-6 col-xl-4 mt-5">
										<div className="d-flex align-items-center justify-content-center flex-column ">
											<div className=" px-2 py-3 rounded d-flex align-items-center justify-content-center how-it-work-rotate-card mb-2">
												<img src="/assets/images/working-4.png" alt="" className="img-fluid " />
											</div>
											<span className="text-center mt-3 fw-medium fs-5">Risk Assessment</span>
											<p className="text-center text-secondary mt-2 px-5">
												Based on the analysis, the Benii can assess the risk levels associated with various mental
												health conditions or crises, such as depression, anxiety, or suicidal ideation...
											</p>
										</div>
									</div>
									<div className="col-md-6 col-xl-4 mt-5">
										<div className="d-flex align-items-center justify-content-center flex-column ">
											<div className=" px-2 py-3 rounded d-flex align-items-center justify-content-center how-it-work-rotate-card mb-2">
												<img src="/assets/images/working-5.png" alt="" className="img-fluid " />
											</div>
											<span className="text-center mt-3 fw-medium fs-5">Response Generation</span>
											<p className="text-center text-secondary mt-2 px-5">
												The Benii generates appropriate responses, recommendations, or interventions tailored to each
												patient&apos;s specific needs and situation...
											</p>
										</div>
									</div>
									<div className="col-md-6 col-xl-4 mt-5">
										<div className="d-flex align-items-center justify-content-center flex-column ">
											<div className=" px-2 py-3 rounded d-flex align-items-center justify-content-center how-it-work-rotate-card mb-2">
												<img src="/assets/images/working-6.png" alt="" className="img-fluid " />
											</div>
											<span className="text-center mt-3 fw-medium fs-5">Feedback Loop</span>
											<p className="text-center text-secondary mt-2 px-5">
												As patients interact with the Benii, it learns and adapts its responses over time, improving
												its accuracy and effectiveness in providing assistance....
											</p>
										</div>
									</div>
								</div>
							</div>
						)}

						{benefits && (
							<div className="bg-white-60 py-5 how-it-work ">
								<h1 className="text-center fw-medium ">Benefits Offered</h1>
								<p className="text-center text-secondary">Empowering Your Mental Wellness Journey</p>

								<div className="row pt-4">
									<div className="col-md-6 col-xl-4 my-4">
										<div className="d-flex align-items-center justify-content-center flex-column ">
											<div className="  py-3 rounded d-flex align-items-center justify-content-center how-it-work-rotate-card mb-2">
												<img src="/assets/images/working-7.png" alt="" className="img-fluid " />
											</div>
											<span className="text-center mt-3 fw-medium fs-5">Accessibility</span>
											<p className="text-center text-secondary mt-2 px-5">
												The Benii provides instant and accessible support to patients anytime, anywhere, reducing
												barriers to seeking help and support....
											</p>
										</div>
									</div>
									<div className="col-md-6 col-xl-4 my-4">
										<div className="d-flex align-items-center justify-content-center flex-column ">
											<div className=" px-1 py-3 rounded d-flex align-items-center justify-content-center how-it-work-rotate-card mb-2">
												<img src="/assets/images/availability.png" alt="" className="img-fluid " />
											</div>
											<span className="text-center mt-3 fw-medium fs-5">24/7 Availability</span>
											<p className="text-center text-secondary mt-2 px-5">
												Unlike traditional services limited by office hours, the Benii offers round-the-clock
												availability, ensuring continuous support and guidance....
											</p>
										</div>
									</div>
									<div className="col-md-6 col-xl-4 my-4">
										<div className="d-flex align-items-center justify-content-center flex-column ">
											<div className=" px-2 py-3 rounded d-flex align-items-center justify-content-center how-it-work-rotate-card mb-2">
												<img src="/assets/images/response.png" alt="" className="img-fluid " />
											</div>
											<span className="text-center mt-3 fw-medium fs-5">Prompt Responses</span>
											<p className="text-center text-secondary mt-2 px-5">
												Patients receive prompt responses and assistance from the Benii, addressing their concerns and
												providing relevant resources without delays...
											</p>
										</div>
									</div>
									<div className="col-md-6 col-xl-4 mt-5">
										<div className="d-flex align-items-center justify-content-center flex-column ">
											<div className=" px-2 py-3 rounded d-flex align-items-center justify-content-center how-it-work-rotate-card mb-2">
												<img src="/assets/images/privacy.png" alt="" className="img-fluid " />
											</div>
											<span className="text-center mt-3 fw-medium fs-5">Privacy & Confidentiality</span>
											<p className="text-center text-secondary mt-2 px-5">
												Patients can express themselves openly and confidentially to the Benii, reducing stigma and
												privacy concerns often associated with face-to-face interactions...
											</p>
										</div>
									</div>
									<div className="col-md-6 col-xl-4 mt-5">
										<div className="d-flex align-items-center justify-content-center flex-column ">
											<div className=" px-2 py-3 rounded d-flex align-items-center justify-content-center how-it-work-rotate-card mb-2">
												<img src="/assets/images/working-8.png" alt="" className="img-fluid " />
											</div>
											<span className="text-center mt-3 fw-medium fs-5">Scalability</span>
											<p className="text-center text-secondary mt-2 px-5">
												The Benii can handle a large volume of interactions simultaneously, making it scalable to
												serve a growing user base effectively...
											</p>
										</div>
									</div>
									<div className="col-md-6 col-xl-4 mt-5">
										<div className="d-flex align-items-center justify-content-center flex-column ">
											<div className="  py-3 rounded d-flex align-items-center justify-content-center how-it-work-rotate-card mb-2">
												<img src="/assets/images/working-9.png" alt="" className="img-fluid " />
											</div>
											<span className="text-center mt-3 fw-medium fs-5">Consistent Support</span>
											<p className="text-center text-secondary mt-2 px-5">
												Patients receive consistent and standardized support from the Benii, ensuring continuity of
												care and adherence to best practices in mental health support....
											</p>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="container my-5">
					<p className="text-primary fw-semibold fs-5">Our Unique Features</p>
					<h1>Explore features designed exceptional care.</h1>
					<div className="row my-5 mb-4">
						<div className="col-md-6 col-xl-4 px-3 my-4">
							<div className="d-flex align-items-center justify-content-start flex-column  counsler-feature-shadow  round-10px h-100">
								<div className="d-flex align-items-center justify-content-center flex-column  px-4 pt-4 pb-3 round-10px counsler-feature-shadow w-100 ">
									<img src="/assets/images/working-2.png" alt="" className="  mb-3" height={64} />
									<h5 className="text-center fw-medium ">Natural Language Processing (NLP)</h5>
								</div>
								<p className=" text-secondary mt-2 px-4 py-4">
									Capable of understanding and analyzing natural language inputs from users, including text descriptions
									of emotions, symptoms, and concerns related to mental health.
								</p>
							</div>
						</div>
						<div className="col-md-6 col-xl-4 px-3 my-4">
							<div className="d-flex align-items-center justify-content-start flex-column  counsler-feature-shadow  round-10px h-100">
								<div className="d-flex align-items-center justify-content-center flex-column  px-4 pt-4 pb-3 round-10px counsler-feature-shadow w-100 ">
									<img src="/assets/images/emotion-recognition.png" alt="" className="  mb-3" height={64} />
									<h5 className="text-center fw-medium ">Emotion Recognition</h5>
								</div>
								<p className=" text-secondary mt-2 px-4 py-4">
									Utilizes algorithms to recognize and interpret emotions expressed in user inputs, allowing for
									empathetic and contextually appropriate responses.
								</p>
							</div>
						</div>
						<div className="col-md-6 col-xl-4 px-3 my-4">
							<div className="d-flex align-items-center justify-content-start flex-column  counsler-feature-shadow  round-10px h-100">
								<div className="d-flex align-items-center justify-content-center flex-column  px-4 pt-4 pb-3 round-10px counsler-feature-shadow w-100 ">
									<img src="/assets/images/personalized-recommend.png" alt="" className="  mb-3" height={64} />
									<h5 className="text-center fw-medium ">Personalized Recommendations</h5>
								</div>
								<p className=" text-secondary mt-2 px-4 py-4">
									Provides tailored suggestions, coping strategies, and resources based on individual user data,
									preferences, and historical interactions with the bot.
								</p>
							</div>
						</div>
						<div className="col-md-6 col-xl-4 px-3 my-4">
							<div className="d-flex align-items-center justify-content-start flex-column  counsler-feature-shadow  round-10px h-100">
								<div className="d-flex align-items-center justify-content-center flex-column  px-4 pt-4 pb-3 round-10px counsler-feature-shadow w-100 ">
									<img src="/assets/images/working-4.png" alt="" className="  mb-4" height={64} />
									<h5 className="text-center fw-medium ">Risk Assessment</h5>
								</div>
								<p className=" text-secondary mt-2 px-4 py-4">
									Employs algorithms to assess the risk levels associated with mental health issues, such as depression,
									anxiety, self-harm, or suicidal ideation, and offers appropriate interventions and resources.
								</p>
							</div>
						</div>
						<div className="col-md-6 col-xl-4 px-3 my-4">
							<div className="d-flex align-items-center justify-content-start flex-column  counsler-feature-shadow  round-10px h-100">
								<div className="d-flex align-items-center justify-content-center flex-column  px-4 pt-4 pb-3 round-10px counsler-feature-shadow w-100 ">
									<img src="/assets/images/availability.png" alt="" className="  mb-4" height={64} />
									<h5 className="text-center fw-medium ">24/7 Availability</h5>
								</div>
								<p className=" text-secondary mt-2 px-4 py-4">
									Accessible round-the-clock, ensuring users can seek support and assistance anytime, especially during
									urgent situations or outside typical office hours.
								</p>
							</div>
						</div>
						<div className="col-md-6 col-xl-4 px-3 my-4">
							<div className="d-flex align-items-center justify-content-start flex-column  counsler-feature-shadow  round-10px h-100">
								<div className="d-flex align-items-center justify-content-center flex-column  px-4 pt-4 pb-3 round-10px counsler-feature-shadow w-100 ">
									<img src="/assets/images/continuous-learning.png" alt="" className="  mb-4" height={64} />
									<h5 className="text-center fw-medium ">Continuous Learning</h5>
								</div>
								<p className=" text-secondary mt-2 px-4 py-4">
									Learns from user interactions, feedback, and data insights to improve response accuracy, adaptability,
									and the overall quality of assistance provided over time.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container my-lg-5 py-lg-5">
					<div className="row">
						<div className="col-lg-6 my-3">
							<img src="/assets/images/close-up-hand-holding-phone.png" alt="" className="img-fluid" />
						</div>
						<div className="col-lg-6 my-3">
							<div className="d-flex flex-column justify-content-center h-100 ">
								<div className="fw-semibold text-primary fs-18px mb-2 ">Privacy & Security</div>
								<h2 className="fw-medium pb-3 pe-lg-5">We understand the importance of privacy and security</h2>
								<p className="text-secondary mt-2 pe-lg-5">
									in your mental health journey. That&apos;s why we prioritize safeguarding your sensitive information
									with the utmost care. Our platform adheres to stringent privacy standards, including HIPAA compliance,
									ensuring that your data remains confidential and protected. You can trust us to maintain the highest
									levels of encryption, secure data transmission, and strict access controls, providing you with a safe
									and confidential space to explore and address your mental health needs.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="container py-lg-5 position-relative ">
					<div className="row py-5 flex-column-reverse flex-lg-row  ">
						<div className="col-lg-6 px-auto px-xl-5 pt-5 mt-lg-5">
							<div>
								<span className="fw-semibold text-primary fs-18px">Interactive Therapy Modules</span>
								<h2 className=" fw-medium pt-3 ">
									Empower your mental health journey with our interactive therapy modules at Benii.{" "}
								</h2>
								<p className="text-secondary pt-2 ">
									Designed by experienced professionals, these modules offer a dynamic and engaging approach to mental
									well-being, allowing you to explore, learn, and practice essential skills at your own pace.
								</p>
							</div>
						</div>
						<div className="col-12 col-lg-6   d-flex align-items-center justify-content-end">
							<div className="position-relative home-banner-img   d-flex align-items-center justify-content-start  ">
								<div className="d-flex align-items-start flex-column justify-content-start position-absolute   p-4 gap-3 banner-img-text-card">
									<div className=" bg-white d-flex justify-content-center align-items-center gap-2 discussion-pill-shadow px-1 py-1 py-lg-2 px-lg-2 rounded-pill">
										<div className=" d-flex align-items-center justify-content-center  rounded-circle py-3  bg-body ">
											{" "}
											<img src="/assets/images/brain-discuss.png" alt="" className="w-50" />{" "}
										</div>
										<p className="mb-0 fw-medium text-secondary pe-1"> Empower your mental health journey </p>
									</div>
									<div className=" bg-white d-flex justify-content-center align-items-center gap-2 shadow-sm px-1 py-1 py-lg-2 px-lg-2 rounded-pill">
										<div className="d-flex align-items-center justify-content-center  rounded-circle py-3 px-2 bg-body">
											<img src="/assets/images/notebook-discuss.png" alt="" className="w-50" />
										</div>
										<p className="mb-0 fw-medium text-secondary pe-1">Unlock the potential with Benii.</p>
									</div>
								</div>
								<img src="/assets/images/man-smiley-woman-discussing.png" alt="" className="img-fluid " />
							</div>
						</div>
					</div>
				</div>

				<div className="container pb-5 mb-5 ">
					<div className="mb-5">
						<div className="feedback-learning-bg pt-2 rounded-3 position-relative ">
							<div className="blur-box position-absolute  "></div>
							<div className="row flex-column-reverse flex-lg-row">
								<div className="col-lg-8">
									<div className="d-flex align-items-start justify-content-center flex-column px-3 px-lg-5 h-100 py-4 py-lg-0">
										<span className="text-primary fw-semibold fs-18px">Feedback and Learning</span>
										<h1 className="text-black my-3 fw-medium">Our AI bot at Benii goes beyond assistance</h1>

										<p className="text-secondary my-2 pe-lg-5">
											It learns and grows with you. Engage in conversations, provide feedback, and see personalized
											recommendations evolve based on your preferences and progress. Experience a supportive journey
											where your input shapes an AI companion dedicated to enhancing your mental well-being. Join us
											and witness the power of feedback-driven learning at Benii.
										</p>
									</div>
								</div>
								<div className="col-lg-4">
									<img src="/assets/images/feedback-learning-brain.png" alt="" className="img-fluid" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VirtualCounselor;
