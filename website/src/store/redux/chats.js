import { createSlice } from "@reduxjs/toolkit";
import { getChatMessages, getUserChats, createNewChat, deleteChat, getNewChatMessages } from "../../actions/chat";

const chatSlice = createSlice({
	name: "chats",
	initialState: {
		userChats: [],
		messages: [],
		selectedChat: {},
	},
	reducers: {
		setMessages: (state, action) => {
			state.messages.push(action.payload);
		},
		setEmptyUserChats: (state) => {
			state.selectedChat = {};
			state.messages = [];
		},
		setSelectedChat: (state, action) => {
			state.selectedChat = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getChatMessages.fulfilled, (state, action) => {
			state.messages = action.payload;
		});
		builder.addCase(getUserChats.fulfilled, (state, action) => {
			state.userChats = action.payload || [];
		});
		builder.addCase(createNewChat.fulfilled, (state, action) => {
			const newChat = action.payload;
			state.userChats.push(newChat);
			state.selectedChat = newChat;
		});
		builder.addCase(getNewChatMessages.fulfilled, (state, action) => {
			state.messages = action.payload.length > 0 ? action.payload : state.messages;
		});
		builder.addCase(deleteChat.fulfilled, (state, action) => {
			const chatIdToDelete = action.payload;
			state.userChats = state.userChats.filter((chat) => chat._id !== chatIdToDelete._id);
			if (state.selectedChat._id === chatIdToDelete._id) {
				state.selectedChat = {};
				state.messages = [];
			}
		});
	},
});

export const { setMessages, setEmptyUserChats, setSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;
