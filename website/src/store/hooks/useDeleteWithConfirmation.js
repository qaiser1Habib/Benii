import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

const useDeleteWithConfirmation = () => {
	const dispatch = useDispatch();

	const deleteWithConfirmation = ({ deleteAction, formData, afterDeleteAction, afterDeleteActionPayload }) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Deleting this is a permanent action and cannot be undone.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel!",
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteAction(formData))
					.then(() => {
						Swal.fire({
							title: "Deleted!",
							text: "Record has been deleted.",
							icon: "success",
							showConfirmButton: false,
							timer: 1000,
						});

						// Dispatch the optional second action if provided
						if (afterDeleteAction) {
							dispatch(afterDeleteAction(afterDeleteActionPayload));
						}
					})
					.catch(() => {
						Swal.fire("Error", "There was an error deleting the Record.", "error");
					});
			}
		});
	};

	return deleteWithConfirmation;
};

export default useDeleteWithConfirmation;
