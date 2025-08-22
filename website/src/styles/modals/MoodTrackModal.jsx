import React from "react";
import Modal from "react-bootstrap/Modal";
import { Line } from "react-chartjs-2";
import moodData from "../../data/moodData.json";

const MoodTrackModal = React.memo((props) => {
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
				ticks: {
					stepSize: 1, // Set step size to 1
					callback: function (value) {
						// Return value directly, so it only shows whole numbers like 0, 1, 2, 3
						return value;
					},
				},
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
		<>
			<Modal
				show={props?.showModal}
				onHide={() => props?.setShowModal(false)}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						<h5 className="modal-title">Track Your Mood</h5>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row">
						<div className="col-12">
							<div style={{ height: "300px" }}>
								<Line
									className="pb-3 px-5"
									data={{
										labels: moodData.map((data) => data.label),
										datasets: [
											{
												label: "Revenue",
												data: moodData.map((data) => data.revenue),
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
				</Modal.Body>
				<Modal.Footer>
					<div className="w-100 d-flex justify-content-start">
						<button type="button" className="btn modal-closeBtn" onClick={() => props?.setShowModal(false)}>
							Close
						</button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
});

MoodTrackModal.displayName = "MoodTrackModal";

export default MoodTrackModal;
