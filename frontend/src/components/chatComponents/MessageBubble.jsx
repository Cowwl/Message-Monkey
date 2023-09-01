import React from "react";
import { Div, Text } from "atomize";

const MessageBubble = ({ message, index }) => { // Add 'index' as a parameter
  return (
    <Div key={index} d="flex" flexDir="column" m={{ b: "1rem" }}>
      <Text
        p={{ x: "0.5rem", y: "0.2rem" }}
        textAlign={message.sender === "You" ? "right" : "left"}
        textColor={message.sender === "You" ? "info700" : "black"}
      >
        {message.sender}
      </Text>
      <Div
        d="flex"
        m={{ l: message.sender === "You" ? "auto" : "0" }}
        overflowWrap={"break-word"}
        overflowX={"hidden"}
      >
        <Text
          p={{ x: "1rem", y: "0.5rem" }}
          w={{ max: "70%" }}
          shadow="3"
          rounded="lg"
          overflowWrap={"break-word"}
          overflowX={"hidden"}
          bg={message.sender === "You" ? "info700" : "white"}
          textColor={message.sender === "You" ? "white" : "black"}
        >
          {message.text}
        </Text>
      </Div>
    </Div>
  );
};

export default MessageBubble;