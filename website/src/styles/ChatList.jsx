import { useDispatch, useSelector } from "react-redux";
import { IoChatbox } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteChat } from "../actions/chat";
import useToast from "../store/hooks/useToast";
import { setSelectedChat } from "../store/redux/chats";
import useDeleteWithConfirmation from "../store/hooks/useDeleteWithConfirmation.js";

const ChatList = ({ list, chatType }) => {
	const selectedChat = useSelector((state) => state?.chats?.selectedChat || {});
	const dispatch = useDispatch();
	const notify = useToast();
	const deleteWithConfirmation = useDeleteWithConfirmation();

	const handleDeleteItemButton = (chat) => {
		deleteWithConfirmation({
			title: "Are you sure?",
			text: "You won't be able to recover this chat!",
			deleteAction: deleteChat,
			formData: { chatId: chat?._id },
			successMessage: "Chat has been deleted.",
			errorMessage: "There was an error deleting the chat.",
		});
	};

	const sortedList = chatType === "Today" ? list.slice().sort((a, b) => new Date(b?.updatedAt) - new Date(a?.updatedAt)) : list;

	return (
		<>
			<p className="w-100 days mt-4 mb-2 text-secondary">{chatType}</p>
			{sortedList.map((chat) => (
				<div
					className={`d-flex gap-2 fs-12px w-100 justify-content-between benii-btn rounded-1 align-items-center py-2 px-2 mb-3 ${
						selectedChat?._id === chat._id ? "active-benii-btn" : ""
					}`}
					onClick={() => dispatch(setSelectedChat(chat))}
					key={chat?._id}
				>
					<div className="d-flex align-items-center gap-2 fs-12px w-100">
						<div>
							<IoChatbox className="cursor-pointer" size={17} />
						</div>
						<p className="mb-0 cursor-pointer truncate w-75">
							{chat?.latestMessage?.content ? chat.latestMessage.content : "Start Conversation"}
						</p>
						<div
							className="d-flex align-items-center gap-2"
							onClick={(e) => {
								e.stopPropagation();
								handleDeleteItemButton(chat);
							}}
						>
							<RiDeleteBin6Line size={17} className="cursor-pointer" />
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default ChatList;
