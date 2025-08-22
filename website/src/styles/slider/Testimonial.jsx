import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";
import TestimonialCard from "../cards/TestimonialCard";

const Testimonial = () => {
	return (
		<div className="container py-5 mb-5">
			<div className="row">
				<div className="col-xl-6 px-4">
					<p className="text-primary fw-medium fs-lg-4">Testimonials</p>
					<h1 className="fw-medium">See What Our Patients Say About Our Services</h1>
					<p className="text-secondary">
						Discover how Benii has made a difference in the lives of individuals seeking mental health support. Our users
						share their experiences, highlighting the compassionate guidance and transformative benefits they’ve received
						from our AI-powered assistant.
					</p>
				</div>
				<div className="col-xl-6">
					<Swiper
						navigation={true}
						loop={true}
						autoplay={{ delay: 3000 }}
						modules={[Navigation, Autoplay]}
						className="mySwiper swiper-container_1 "
					>
						<SwiperSlide className="ps-5  py-3">
							<TestimonialCard
								img="5.jpg"
								title="Emily R"
								text="Benii has been a game-changer for me. Whenever I feel overwhelmed, it's there to provide helpful advice and a compassionate ear. It's like having a therapist available 24/7!"
							/>
						</SwiperSlide>
						<SwiperSlide className="ps-5  py-3">
							<TestimonialCard
								img="4.jpg"
								title="Mark T"
								text="I was skeptical at first, but Benii has truly exceeded my expectations. The AI's ability to listen and respond thoughtfully has made a huge difference in managing my anxiety"
							/>
						</SwiperSlide>
						<SwiperSlide className="ps-5  py-3">
							<TestimonialCard
								img="6.jpg"
								title="Sophia M"
								text="Benii helped me navigate some tough times when I couldn't reach a therapist. It's easy to use, and I feel supported and heard every time I chat with it."
							/>
						</SwiperSlide>
					</Swiper>
					<Swiper
						navigation={true}
						loop={true}
						autoplay={{ delay: 4000 }}
						modules={[Navigation, Autoplay]}
						className="mySwiper swiper-container_2  "
					>
						<SwiperSlide className="pe-5  py-3">
							<TestimonialCard
								img="1.png"
								title="Isabella"
								text="What I love most about Benii is the convenience. It's always there when I need to talk, and its personalized advice has been incredibly helpful for my mental health journey."
							/>
						</SwiperSlide>
						<SwiperSlide className="pe-5  py-3">
							<TestimonialCard
								img="2.png"
								title="Lisa "
								text="Benii has helped me stay on track with my mental wellness. It's empathetic, non-judgmental, and offers practical suggestions that have made a real difference"
							/>
						</SwiperSlide>
						<SwiperSlide className="pe-5  py-3">
							<TestimonialCard
								img="3.png"
								title="Daniel"
								text="Benii is a fantastic resource! It feels like a safe space where I can express myself without judgment. The guidance is always thoughtful and comforting, making it easier to cope with my emotions."
							/>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default Testimonial;
