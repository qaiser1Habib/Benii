import { MdOutlineSelfImprovement } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BsMoonStars } from "react-icons/bs";
import { TbClipboardList } from "react-icons/tb";
import { IoLogoWechat } from "react-icons/io5";
import { IoGridOutline } from "react-icons/io5";
import { useState } from "react";

const GoalCard = ({ icon, title }) => {
	const [checked, setChecked] = useState(false);

	const handleCheckboxChange = () => {
		setChecked(!checked);
	};

	console.log(checked);

	return (
		<div className="col-md-6 col-xl-12 col-xxl-4 my-4 ">
			<label htmlFor={`${title}Checkbox`} className="w-100">
				<input type="checkbox" id={`${title}Checkbox`} className="d-none" checked={checked} onChange={handleCheckboxChange} />
				<div className={`goal-card ${checked ? "active" : ""} w-100 p-3 round-10px`}>
					<div className="d-flex justify-content-between align-items-start">
						{icon}
						{checked && <FaCheckCircle className="fs-20px" />}
					</div>
					<p className="fs-16px fw-medium mb-0 mt-3 text-nowrap">{title}</p>
				</div>
			</label>
		</div>
	);
};

const Goals = () => {
	const [stress, setStress] = useState(50);
	const [communication, setCommunication] = useState(50);

	const [checked, setChecked] = useState(false);

	const handleCheckboxChange = () => {
		setChecked(!checked);
	};

	return (
		<div className="bg-white-50 h-100 round-10px fade-in dashboard-card-shadow p-4">
			<div className="px-2 py-4">
				<p className="fs-30px fw-medium text-dark">Goals</p>
				<p className="fs-30px fw-medium text-primary-dark">Set Your Goal</p>
				<p>
					Let&apos;s set some goals together to support your mental well-being. What would you like to achieve or{" "}
					<br className="d-none d-xxl-block " /> improve upon during your time here?
				</p>
				<div className="row flex-wrap">
					<GoalCard icon={<MdOutlineSelfImprovement className="fs-48px" />} title="Improve Stress Management" />
					<GoalCard icon={<BsMoonStars className="fs-48px" />} title="Enhance Sleep Quality" />
					<GoalCard icon={<MdOutlineSelfImprovement className="fs-48px" />} title="Boost Self Confidence" />
					<GoalCard icon={<TbClipboardList className="fs-48px" />} title="Develop Coping Strategies" />

					<GoalCard icon={<IoLogoWechat className="fs-48px" />} title="Improve Communication Skills" />
					<GoalCard icon={<IoGridOutline className="fs-48px" />} title="Other" />
				</div>
				<div>
					<p className="fs-18px text-chat-color ">Please Describe Your Goal Briefly</p>
					<textarea
						name="goals"
						rows="5"
						className="w-100 bg-white px-3 py-3 resize-none outline-none round-10px border-secondary text-secondary"
						placeholder="Your goals..."
					></textarea>
				</div>
				<p className="fs-30px fw-medium text-primary-dark mt-5">Current Status</p>
				<p className="">
					Understanding your current status helps us provide tailored support. How would you describe your{" "}
					<br className="d-none d-xxl-block " /> current condition of the selected options?
				</p>
				<div className="row">
					<div className="col-lg-6 user-range-slider">
						<div className="range-slider">
							<input
								className="range-slider__range"
								type="range"
								defaultValue={50}
								min={0}
								max={100}
								onChange={(e) => {
									setStress(e.target.value);
								}}
							/>
							<span className="range-slider__value">{stress}</span>
						</div>
					</div>
					<div className="col-lg-6 user-range-slider">
						<div className="range-slider">
							<input
								className="range-slider__range"
								type="range"
								defaultValue={50}
								min={0}
								max={100}
								onChange={(e) => {
									setCommunication(e.target.value);
								}}
							/>
							<span className="range-slider__value">{communication}</span>
						</div>
					</div>
				</div>
				<p className="fs-18px text-chat-color mt-4">Please Explain Your Current Status Briefly</p>
				<textarea
					name="explain"
					rows="5"
					className="resize-none w-100 bg-white px-3 py-3 outline-none round-10px border-secondary text-secondary"
					placeholder="Briefly Explain...."
				></textarea>
				<div>
					<div className="text-center">
						<button className="btn btn-primary  mt-4 py-2 px-5 round-10px" type="submit">
							<span className="px-4">Submit</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Goals;
