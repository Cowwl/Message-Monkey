import React from "react";
import { Div, Text, Input, Button } from "atomize";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ selectedChat, inputText, setInputText, handleSendMessage }) => {
  return (
    <Div
      flex="1"
      border="1px solid"
      borderColor="gray200"
      w="60%"
      h="100%"
      bg="gray300"
    >
      <Div d="flex" flexDir="column" h="100%">
        <Div
          d="flex"
          flexDir="row"
          justify="flex-start"
          p="1rem"
          h="8%"
          bg="white"
          border={{ b: "0.5px solid" }}
          borderColor="gray500"
          shadow="2"
          align="center"
        >
          <Text
            m={{ l: "1rem" }}
            textAlign="flex-start"
            textColor="info700"
            fontFamily="Poppins"
            textWeight="800"
            p="0.5rem"
            textSize="title"
          >
            {selectedChat.name}
          </Text>
        </Div>
        <Div flex="1" p="1rem" overflowY="auto">
          {selectedChat.messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
        </Div>
        <Div
          d="flex"
          flexDir="row"
          justify="flex-start"
          p="1rem"
          h="8%"
          bg="white"
          border={{ t: "0.5px solid" }}
          borderColor="gray500"
          shadow="2"
          align="center"
        >
          <Input
            placeholder="Type a message"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            m={{ r: "1rem" }}
            w="70%"
          />
          <Button
            onClick={handleSendMessage}
            bg="info700"
            hoverBg="info600"
            textColor="white"
            rounded="circle"
          >
            Send
          </Button>
        </Div>
      </Div>
    </Div>
  );
};

export default ChatWindow;