import React from "react";
import { Button } from "atomize";

const ChatItem = ({ chat, onClick }) => {
  return (
    <Button
      onClick={onClick}
      m={{ t: "0.5rem" }}
      w="100%"
      bg="white"
      textColor="black"
      hoverShadow="3"
      hoverBg="info700"
      hoverTextColor="white"
    >
      {chat.name}
    </Button>
  );
};

export default ChatItem;