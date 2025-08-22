import { Link } from "react-router-dom";
import TeamMember from "../styles/cards/TeamMember";
import AchievementCard from "../styles/cards/AchievementCard";
import Testimonial from "../styles/slider/Testimonial";
import BreadCrumb from "./partials/BreadCrumb";

const About = () => {
	return (
		<div className="fade-in">
			<BreadCrumb title="About Us" />
			<div className="position-relative ">
				<div className="about-page-blur-bg d-none d-xl-block ">
					<div className="blur-box position-absolute"></div>
				</div>
				<div className="container py-5 my-5 ">
					<div className="row flex-column-reverse flex-lg-row py-5 ">
						<div className="col-lg-6  d-flex  justify-content-center flex-column   ">
							<p className="text-primary fw-medium fs-4 my-3 my-lg-0 mb-2 ">About Us</p>
							<h1>A Legacy of Compassionate Care!</h1>
							<p className="text-secondary my-4">
								At Benii, we believe that mental health support should be accessible to everyone, no matter where they
								are. Rooted in a deep commitment to emotional well-being, Benii is designed to offer compassionate and
								personalized guidance. Our AI-driven assistant combines modern technology with the timeless principles of
								empathy, active listening, and thoughtful advice. Whether you're seeking help with everyday stress,
								personal challenges, or emotional growth, Benii is here to support you with a caring, non-judgmental
								approach, ensuring you're never alone in your journey toward better mental health.
							</p>
						</div>
						<div className="col-lg-6 d-flex align-items-center justify-content-center about-banner position-relative ">
							<div className="blur-box position-absolute d-none d-xl-block "></div>
							<img src="/assets/images/about-img.png" alt="" className="img-fluid w-100 " />
						</div>
					</div>
				</div>
				<div className="container pb-5 my-5">
					<div className="text-center">
						<span className="text-primary fw-medium fs-4">Our Mission</span>
						<h1 className="fw-medium px-lg-5">
							Provide compassionate, personalized, and evidence-based mental health care
						</h1>
						<p className="text-secondary my-4 px-5">
							At Benii, our mission is to provide compassionate, personalized, and evidence-based mental health care to
							everyone. We believe in using advanced AI technology to deliver thoughtful, tailored support that addresses
							individual needs. By combining empathy with scientifically backed techniques, we aim to empower users to
							navigate their mental health journey with confidence and care, ensuring accessible, reliable support whenever
							it's needed.
						</p>
					</div>
				</div>
				<div className="container pb-5 my-5">
					<div className="text-center">
						<span className="text-primary fw-medium fs-4">Our Vision</span>
						<h1 className="fw-medium px-lg-5">
							Pioneer a future where mental health is destigmatized, accessible, and prioritized by all.
						</h1>
						<p className="text-secondary my-4 px-5">
							At Benii, we aim to pioneer a future where mental health is destigmatized, accessible, and prioritized by
							all. We envision a world where open conversations about mental health are the norm, empowering individuals to
							seek help without fear or shame. By leveraging innovative technology and compassionate support, we strive to
							break down barriers to mental health care, ensuring that everyone has the resources they need to thrive.
							Together, we can create a community that values emotional well-being as essential to overall health,
							fostering resilience and growth for individuals everywhere.
						</p>
					</div>
				</div>
				<div className="container py-5 my-5">
					<div className="text-center">
						<span className="text-primary fw-medium fs-4">Team Members</span>
						<h1>Meet Our Compassionate Doctors</h1>
						<div className="row mt-5 pt-5">
							<TeamMember imageSrc={"/assets/images/team-member-1.png"} name={"Emily Carter"} role={"Pediatrician"} />
							<TeamMember imageSrc={"/assets/images/team-member-2.png"} name={"Christopher Lee"} role={"ENT Specialist"} />
							<TeamMember imageSrc={"/assets/images/team-member-3.png"} name={"Michael Reynolds"} role={"Neurologist"} />
							<TeamMember imageSrc={"/assets/images/team-member-4.png"} name={"Rebecca Harris"} role={"Cardiologist"} />
						</div>
					</div>
				</div>
				<div className="container-fluid py-5 my-5 px-0 ">
					<div className="text-center mb-5 ">
						<div className="bg-white achievement-shadow pt-2">
							<div className="container py-5">
								<span className="text-primary fw-medium fs-4 pb-4">Achievements</span>
								<h1 className="my-3">Celebrating Milestones in Transforming Mental Health Support</h1>
								<p className="text-secondary mb-5 px-5">
									we take pride in our journey and the positive impact we've made in the realm of mental health care.
								</p>
								<div className="row">
									<AchievementCard
										imageSrc={"/assets/images/achievement-1.png"}
										title={"Year of Experience"}
										countNumber={25}
									/>
									<AchievementCard
										imageSrc={"/assets/images/achievement-2.png"}
										title={"Medical Specialist"}
										countNumber={470}
									/>

									<AchievementCard
										imageSrc={"/assets/images/achievement-4.png"}
										title={"Happy Patients"}
										countNumber={9036}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="py-5">
					<Testimonial />
				</div>
			</div>
		</div>
	);
};

export default About;
