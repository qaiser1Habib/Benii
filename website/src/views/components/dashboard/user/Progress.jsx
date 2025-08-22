import { Line } from "react-chartjs-2";
import ProgressBar from "../../../../styles/ProgressBar";
import revenueData from "../../../../data/revenueData.json";
import { Chart, defaults } from "chart.js/auto";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

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

const Progress = () => {
	return (
		<div>
			<div className="fade-in bg-white-50 round-10px dashboard-card-shadow p-4 py-4">
				<h2 className="fs-30px fw-medium mb-3 ps-3 mt-2">Individual Goal Progress</h2>
				<div className="row">
					<div className="col-sm-6 col-lg-4 col-xl-6 col-xxl-4 col-xxxl-3 my-4">
						<div className="d-flex align-items-center flex-column">
							<div>
								<ProgressBar
									percentage={75}
									statusProgress={"75%"}
									statusWeight={"fw-bold"}
									statusMargin={"mt-4"}
									barWidth={"123px"}
									content={true}
								/>
							</div>
							<p className="fw-medium fs-20px text-secondary mt-5 mb-0 text-nowrap">Stress Management</p>
						</div>
					</div>
					<div className="col-sm-6 col-lg-4 col-xl-6 col-xxl-4 col-xxxl-3 my-4">
						<div className="d-flex align-items-center flex-column">
							<div>
								<ProgressBar
									percentage={85}
									statusProgress={"85%"}
									statusWeight={"fw-bold"}
									statusMargin={"mt-4"}
									barWidth={"123px"}
									content={true}
								/>
							</div>
							<p className="fw-medium fs-20px text-secondary mt-5 mb-0 text-nowrap">Communication Skills</p>
						</div>
					</div>
					<div className="col-sm-6 col-lg-4 col-xl-6 col-xxl-4 col-xxxl-3 my-4">
						<div className="d-flex align-items-center flex-column">
							<div>
								<ProgressBar
									percentage={65}
									statusProgress={"65%"}
									statusWeight={"fw-bold"}
									statusMargin={"mt-4"}
									barWidth={"123px"}
									content={true}
								/>
							</div>
							<p className="fw-medium fs-20px text-secondary mt-5 mb-0 text-nowrap">Boost Self Confidence</p>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white-50 round-10px dashboard-card-shadow p-4 pe-5 my-5 py-4">
				<h2 className="fs-30px fw-medium mb-3  mt-2">Overall Progress</h2>
				<div className="fs-18px fw-medium text-secondary-dark mb-5">
					Gain valuable insights into your overall progress, celebrate achievements, and stay motivated to nurture your
					mental wellness. Empower yourself with actionable data and unlock a path towards sustained well-being and personal
					growth.
				</div>
				<div className="bg-secondary-light w-100 h-17px round-8-half-px mb-5">
					<div className={`bg-primary h-100 round-8-half-px progress-bar-${"4"}-done`}></div>
				</div>
			</div>

			<div className="col-12 my-3 " style={{ height: "500px" }}>
				<div className="bg-white-50 h-100 py-3 pb-5 px-4 round-10px position-relative dashboard-card-shadow">
					<h2 className="fs-30px fw-medium mb-0 mt-3">Monthly Progress Chart</h2>
					<Line
						className="pb-4 px-5"
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
		</div>
	);
};

export default Progress;
