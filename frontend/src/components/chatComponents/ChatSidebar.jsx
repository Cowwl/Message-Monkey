import React from "react";
import { Div, Icon, Text } from "atomize";
import ChatItem from "./ChatItem";

const ChatSidebar = ({ chats, selectedChat, setSelectedChat }) => {
  return (
    <Div
      d="flex"
      flexDir="column"
      border="1px solid"
      borderColor="gray200"
      w="20%"
      h="100%"
    >
      <Div
        d="flex"
        border={{ b: "0.5px solid" }}
        borderColor="gray500"
        p="1rem"
        shadow="2"
        flexDir="row"
        align="center"
        justify="flex-start"
        h="8%"
      >
        <Icon name="Menu" size="20px" m={{ r: "1rem" }} />
        <Text
          fontFamily="Poppins"
          textWeight="800"
          p="0.5rem"
          textAlign="center"
          textColor="info700"
          textSize="title"
        >
          Conversations
        </Text>
      </Div>
      {chats.map((chat, index) => (
        <ChatItem
          key={index}
          chat={chat}
          onClick={() => setSelectedChat(chat)}
        />
      ))}
    </Div>
  );
};

export default ChatSidebar;