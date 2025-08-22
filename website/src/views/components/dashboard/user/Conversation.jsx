import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useMemo, useRef, useState } from "react";
import useToast from "../../../../store/hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import {
	createNewChat,
	createUserThread,
	getChatMessages,
	getNewChatMessages,
	getUserChats,
	sendMessage,
} from "../../../../actions/chat";
import { handleFormDataInput } from "../../../../utils/helpers";
import { setEmptyUserChats, setMessages, setSelectedChat } from "../../../../store/redux/chats";
import ReactMarkdown from "react-markdown";
import { unwrapResult } from "@reduxjs/toolkit";
import ChatList from "../../../../styles/ChatList";
import { format, isToday, isYesterday, isValid, parseISO } from "date-fns";

const Conversation = () => {
	const [formData, setFormData] = useState();
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
	const [isChatLoading, setIsChatLoading] = useState(false);
	const [isCreatingChatAndSendMessage, setIsCreatingChatAndSendMessage] = useState(false);
	const [isNewChatBtnPressed, setIsNewChatBtnPressed] = useState(false);

	const chatContainerRef = useRef(null);
	const textareaRef = useRef(null);

	const dispatch = useDispatch();
	const notify = useToast();

	const currentLoggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo || false);
	const userChats = useSelector((state) => state?.chats?.userChats || []);
	const userMessages = useSelector((state) => state?.chats?.messages || []);
	const userSelectedChat = useSelector((state) => state?.chats?.selectedChat || {});

	const [height, setHeight] = useState(940); // Default height

	useEffect(() => {
	  const updateHeight = () => {
		 const screenHeight = window.innerHeight;
 
		 if ( screenHeight < 400) {
			setHeight(420);
		 }else if (screenHeight >= 400 && screenHeight < 500) {
			setHeight(380);
		 }else if (screenHeight >= 500 && screenHeight < 600) {
			setHeight(420);
		 } else if (screenHeight >= 600  && screenHeight < 650) {
			setHeight(460); 
		 } else if (screenHeight >= 650  && screenHeight < 700) {
			setHeight(530); 
		 }else if (screenHeight >= 700 && screenHeight < 750) {
			setHeight(620); 
		 }else if (screenHeight >= 750 && screenHeight <= 800) {
			setHeight(650); 
		 }else if (screenHeight >= 800 && screenHeight <= 900) {
			setHeight(680); 
		 }else if (screenHeight >= 900 && screenHeight <= 1000) {
			setHeight(780); 
		 }else if (screenHeight >= 1000 && screenHeight <= 1100) {
			setHeight(850); 
		 }else if (screenHeight >= 1100 && screenHeight <= 1200) {
			setHeight(850); 
		 }else if (screenHeight >= 1200 && screenHeight <= 1300) {
			setHeight(800); 
		 } else if (screenHeight >= 1300 && screenHeight <= 1400) {
			setHeight(800); 
		 } else if (screenHeight >= 1400 && screenHeight <= 1500) {
			setHeight(800); 
		 }else if (screenHeight >= 1500 && screenHeight <= 1600) {
			setHeight(800); 
		 }else if (screenHeight >= 1600 && screenHeight <= 1700) {
			setHeight(800); 
		 }else if (screenHeight >= 1700) {
			setHeight(900); 
		 } else {
			setHeight(940); 
		 }
	  };

	  updateHeight();
 
	  window.addEventListener('resize', updateHeight);
 
	  return () => {
		 window.removeEventListener('resize', updateHeight);
	  };
	}, []);

	useEffect(() => {
		if (!currentLoggedInUserInfo.threadID) {
			dispatch(createUserThread(notify));
		}
	}, [currentLoggedInUserInfo]);

	useEffect(() => {
		if (currentLoggedInUserInfo) {
			dispatch(getUserChats({ formData: { userId: currentLoggedInUserInfo?._id }, notify }));
		}
	}, [currentLoggedInUserInfo]);

	useEffect(() => {
		if (userSelectedChat?._id) {
			setIsChatLoading(true);
			if (isCreatingChatAndSendMessage) {
				dispatch(getNewChatMessages({ formData: { chatID: userSelectedChat?._id }, notify })).then(() =>
					setIsChatLoading(false)
				);
			} else {
				dispatch(getChatMessages({ formData: { chatID: userSelectedChat?._id }, notify })).then(() =>
					setIsChatLoading(false)
				);
			}
		}
	}, [userSelectedChat]);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [userMessages]);

	useEffect(() => {
		const textarea = textareaRef.current;
		textarea.style.height = "auto";
		textarea.style.height = `${textarea.scrollHeight}px`;
		if (textarea.scrollHeight > 200) {
			textarea.style.overflowY = "auto";
			textarea.style.height = "200px";
		} else {
			textarea.style.overflowY = "hidden";
		}
	}, [formData?.message]);

	const handleSendMessage = (e) => {
		e.preventDefault();

		if (userSelectedChat?._id) {
			setIsSubmittingRequest(true);

			dispatch(setMessages({ content: formData?.message, role: currentLoggedInUserInfo?.about?.firstName }));
			dispatch(sendMessage({ formData: { chatID: userSelectedChat?._id, message: formData?.message }, notify })).then(() => {
				dispatch(getChatMessages({ formData: { chatID: userSelectedChat?._id }, notify }));
				dispatch(getUserChats({ formData: { userId: currentLoggedInUserInfo?._id }, notify }));
				setIsSubmittingRequest(false);
			});
		} else {
			handleCreateChatAndSendMessage();
		}
		setFormData({});
	};

	const handleCreateChatAndSendMessage = async () => {
		if (!currentLoggedInUserInfo) return;
		setIsSubmittingRequest(true);
		setIsChatLoading(true);
		setIsCreatingChatAndSendMessage(true);
		try {
			dispatch(setMessages({ content: formData?.message, role: currentLoggedInUserInfo?.about?.firstName }));

			const createChatAction = await dispatch(createNewChat({ formData: { userId: currentLoggedInUserInfo?._id }, notify }));

			const response = unwrapResult(createChatAction);

			if (response._id) {
				await dispatch(sendMessage({ formData: { chatID: response._id, message: formData?.message }, notify }));

				dispatch(setSelectedChat(response));
				await dispatch(getNewChatMessages({ formData: { chatID: response._id }, notify }));
				await dispatch(getUserChats({ formData: { userId: currentLoggedInUserInfo?._id }, notify }));

				setIsSubmittingRequest(false);
				setIsChatLoading(false);
				setIsCreatingChatAndSendMessage(false);
			}

			setFormData({});
		} catch (error) {
			notify("Error creating chat and sending message.");
			setIsSubmittingRequest(false);
			setIsChatLoading(false);
		}
	};

	const handleClearChat = () => {
		if (userChats.length > 0 && userMessages.length > 0) {
			dispatch(setEmptyUserChats());
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (formData?.message) {
				handleSendMessage(e);
			}
		}
	};

	const getCategory = (date) => {
		const chatDate = parseISO(date);

		if (isToday(chatDate)) {
			return "Today";
		} else if (isYesterday(chatDate)) {
			return "Yesterday";
		} else {
			return "Previous";
		}
	};

	const categorizedChats = useMemo(() => {
		return userChats.reduce(
			(acc, chat) => {
				const category = getCategory(chat.updatedAt);
				acc[category].push(chat);
				return acc;
			},
			{ Today: [], Yesterday: [], Previous: [] }
		);
	}, [userChats]);

	const getDateLabel = (date) => {
		if (!date) {
			return "";
		}

		const chatDate = new Date(date);

		if (!isValid(chatDate)) {
			console.error("Invalid date value:", date);
			return "";
		}

		if (isToday(chatDate)) {
			return "Today";
		} else if (isYesterday(chatDate)) {
			return "Yesterday";
		} else {
			return format(chatDate, "dd MMM yyyy");
		}
	};

	const categorizedMessages = useMemo(() => {
		const categorized = {};

		userMessages.forEach((message) => {
			const dateLabel = getDateLabel(message?.createdAt);
			if (!categorized[dateLabel]) {
				categorized[dateLabel] = [];
			}
			categorized[dateLabel].push(message);
		});

		return categorized;
	}, [userMessages]);

	const displayMessageTime = (message) => {
		if (message?.createdAt) {
			return format(parseISO(message.createdAt), "hh:mm a");
		} else {
			return format(new Date(), "hh:mm a");
		}
	};

	return (
		<>
			<div className="row fade-in bg-white-50  round-10px dashboard-card-shadow ms-2 dashboard-chat-card pb-3" style={{height: `${height}px`}}>
				<div className="col-xl-4 col-xxxl-3 mt-4 mt-lg-0 border border-start-0 border-top-0 border-bottom-0 flex flex-column h-xl-100 overflow-y-auto">
					<div className="container">
						<div className="d-xl-none d-flex   align-items-center justify-content-between py-3">
							<div className="fw-semibold text-dark">Conversation</div>
							<RxHamburgerMenu
								className="fs-2"
								data-bs-toggle="offcanvas"
								data-bs-target="#offcanvasChatHistory"
								aria-controls="offcanvasChatHistory"
							/>
						</div>
					</div>
					<div
						className="offcanvas offcanvas-start"
						tabIndex={-1}
						id="offcanvasChatHistory"
						aria-labelledby="offcanvasChatHistoryLabel"
					>
						<div className="offcanvas-header">
							<h5 className="offcanvas-title" id="offcanvasExampleLabel">
								Conversations
							</h5>
							<button type="button" className="btn-close shadow-none " data-bs-dismiss="offcanvas" aria-label="Close" />
						</div>
						<div className="offcanvas-body">
							<div className="d-flex flex-column justify-content-center  align-items-center px-3 py-4    rounded-4  ">
								<form className="position-relative mt-3 w-100 ps-3">
									<input
										type="text"
										className=" border border-2 border-search-input-chat rounded-2 w-100 px-2 py-1"
										placeholder="Search..."
									/>
									<button className="border-0 bg-transparent  position-absolute end-0 pe-2 py-1">
										<FaSearch className="text-secondary-light fs-18px fw--bold" />
									</button>
								</form>
								<div className="d-flex w-100 ps-3  mt-5 mb-3">
									<button
										className={`d-flex py-2 px-4 fw-medium border-1-half-px border-primary-light cursor-pointer gap-3 rounded-2 ${
											isNewChatBtnPressed ? "scale-down" : ""
										}`}
										style={{ background: "#f2efff" }}
										onClick={handleClearChat}
										onMouseDown={() => setIsNewChatBtnPressed(true)}
										onMouseUp={() => setTimeout(() => setIsNewChatBtnPressed(false), 200)}
										onMouseLeave={() => setTimeout(() => setIsNewChatBtnPressed(false), 200)}
									>
										<span className=" ">+</span>
										<span className=" ">New chat</span>
									</button>
								</div>
								<div className="px-3 pe-5 w-100">
									{categorizedChats.Today.length > 0 && <ChatList list={categorizedChats.Today} chatType="Today" />}
									{categorizedChats.Yesterday.length > 0 && (
										<ChatList list={categorizedChats.Yesterday} chatType="Yesterday" />
									)}
									{categorizedChats.Previous.length > 0 && (
										<ChatList list={categorizedChats.Previous} chatType="Previous 7 Days" />
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="d-xl-flex d-none flex-column justify-content-center  align-items-center px-2 py-4  position-relative  rounded-4  ">
						<div>
							<p className="fs-30px fw-medium">Conversations</p>
						</div>
						<form className="position-relative mt-3 w-100">
							<input
								type="text"
								className=" border border-2 border-search-input-chat rounded-2 w-100 px-2 py-1"
								placeholder="Search..."
							/>
							<button className="border-0 bg-transparent  position-absolute end-0 pe-2 py-1">
								<FaSearch className="text-secondary-light fs-18px fw--bold" />
							</button>
						</form>
						<div className="d-flex w-100 mt-5 mb-3">
							<button
								onClick={handleClearChat}
								onMouseDown={() => setIsNewChatBtnPressed(true)}
								onMouseUp={() => setTimeout(() => setIsNewChatBtnPressed(false), 200)}
								onMouseLeave={() => setTimeout(() => setIsNewChatBtnPressed(false), 200)}
								className={`d-flex justify-content-center py-2 px-4 fw-medium border-1-half-px border-primary-light cursor-pointer gap-3 rounded-3 w-100 ${
									isNewChatBtnPressed ? "scale-down" : ""
								}`}
								style={{ background: "#f2efff" }}
							>
								<div className="me-3">
									<i class="fa-solid fa-plus me-1" />
									<span>New chat</span>
								</div>
							</button>
						</div>

						<div
							className="px-1 pe-2 w-100 overflow-y-auto  conversation-history max-height-conversation-history"
							
						>
							{categorizedChats.Today.length > 0 && <ChatList list={categorizedChats.Today} chatType="Today" />}
							{categorizedChats.Yesterday.length > 0 && (
								<ChatList list={categorizedChats.Yesterday} chatType="Yesterday" />
							)}
							{categorizedChats.Previous.length > 0 && (
								<ChatList list={categorizedChats.Previous} chatType="Previous 7 Days" />
							)}
						</div>
					</div>
				</div>

				<div className="col-xl-8 col-xxxl-9 mt-4 mt-lg-0 d-flex flex-column chat-box-message-box-height h-xl-100 ">
					<div className="d-flex flex-column py-5 pb-3 px-2 rounded-4 h-100 ">
						<div className="tyn-chat-body " ref={chatContainerRef}>
							{!isChatLoading ? (
								userSelectedChat._id ? (
									userMessages?.length > 0 ? (
										Object.entries(categorizedMessages).map(([dateLabel, messages]) => (
											<div key={dateLabel}>
												{dateLabel && (
													<div className="tyn-reply-separator">
														<span>{dateLabel}</span>
													</div>
												)}
												{messages?.map((message) => (
													<div key={message?._id} className="chat-message pe-2 w-100 mb-3">
														<div
															className={`d-flex justify-content-${
																message?.role === "benii" ? "end" : "start"
															} w-100 my-2`}
														>
															<div
																className={`${message?.role === "benii" ? "benii-chat-text" : "user-chat-text"}`}
																style={{
																	backgroundColor: `${message?.role === "benii" ? "#e8e4fc" : "#6f688d"}`,
																	width: "fit-content",
																	maxWidth: "80%",
																	paddingLeft: "7px",
																	paddingRight: "7px",
																	paddingTop: "1px",
																	paddingBottom: "1px",
																}}
															>
																<div
																	className={`${
																		message?.role === "benii" ? "dark" : "text-white"
																	} mb-0 message-content-container`}
																>
																	<ReactMarkdown>{message?.content}</ReactMarkdown>
																</div>

																<div className="text-end">
																	<time
																		className={`fs-12px mt-2 ${
																			message?.role === "benii" ? "text-dark" : "text-white"
																		}`}
																	>
																		{displayMessageTime(message)}
																	</time>
																</div>
															</div>
														</div>
													</div>
												))}
											</div>
										))
									) : (
										<HowCanIHelp userName={currentLoggedInUserInfo?.about?.firstName} />
									)
								) : (
									<HowCanIHelp userName={currentLoggedInUserInfo?.about?.firstName} />
								)
							) : (
								<div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
									<div className="spinner-grow" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
								</div>
							)}
							{!isChatLoading && isSubmittingRequest && userSelectedChat._id && (
								<div className="w-100 d-flex justify-content-end">
									<div className="chat-bubble mb-3 me-2">
										<div className="typing">
											<div className="dot" />
											<div className="dot" />
											<div className="dot" />
										</div>
									</div>
								</div>
							)}
						</div>
						<div className="tyn-chat-form rounded-2 mt-auto">
							<form className="w-100" onSubmit={handleSendMessage}>
								<div className="tyn-chat-form-enter">
									<textarea
										ref={textareaRef}
										name="message"
										className="tyn-chat-form-input"
										value={formData?.message || ""}
										onChange={(e) => handleFormDataInput(e, setFormData)}
										onKeyDown={handleKeyPress}
										rows={1}
										style={{ resize: "none" }}
										dir="auto"
										tabIndex={0}
									></textarea>
									<ul className="tyn-list-inline me-n2 my-1 px-0">
										<li className="cursor-pointer d-flex">
											<button
												type="submit"
												disabled={!formData?.message || isSubmittingRequest}
												className="btn btn-icon btn-white btn-md btn-pill my-auto p-0"
												id="tynChatSend"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={16}
													height={16}
													fill="currentColor"
													className="bi bi-send-fill"
													viewBox="0 0 16 16"
												>
													<path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
												</svg>
											</button>
										</li>
									</ul>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const HowCanIHelp = ({ userName }) => {
	return (
		<div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
			<p className="fw-semibold fs-26px mb-2 text-capitalize">hello, {userName}</p>
			<p className="fw-semibold fs-22px mb-2 text-capitalize" style={{ color: "#6f688d" }}>
				How can I help you today?
			</p>
		</div>
	);
};

export default Conversation;
