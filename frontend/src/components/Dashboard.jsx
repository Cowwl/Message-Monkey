import React from "react";
import { Div, Text, Button, Input } from "react-atomize";

const Dashboard = () => {
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [inputText, setInputText] = React.useState("");

  const chats = [
    {
      name: "Alice",
      messages: [
        { sender: "Alice", text: "Hi there!" },
        { sender: "You", text: "Hello!" },
        { sender: "Alice", text: "How are you?" },
      ],
    },
    {
      name: "Bob",
      messages: [
        { sender: "Bob", text: "Hey!" },
        { sender: "You", text: "Hi Bob!" },
        { sender: "Bob", text: "What's up?" },
      ],
    },
  ];

  React.useEffect(() => {
    if (chats.length > 0) {
      setSelectedChat(chats[0]);
    }
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      setSelectedChat((prevSelectedChat) => ({
        ...prevSelectedChat,
        messages: [
          ...prevSelectedChat.messages,
          { sender: "You", text: inputText.trim() },
        ],
      }));
      setInputText("");
    }
  };

  return (
    <Div d="flex" h="100vh">
      <Div
        d="flex"
        flexDir="column"
        border="1px solid"
        borderColor="gray200"
        w="15%"
        h="100%"
      >
        <Text tag="h4" p="1rem" textAlign="center" textColor="info700">
          Chats
        </Text>
        {chats.map((chat, index) => (
          <Button
            key={index}
            onClick={() => {
              setSelectedChat(chat);
            }}
            w="100%"
            rounded="0"
            bg="white"
            textColor="black"
            hoverTextColor="white"
            hoverBg="info700"
          >
            {chat.name}
          </Button>
        ))}
      </Div>
      <Div flex="1" border="1px solid" borderColor="gray200" w="100%" h="100%">
        <Div p="1rem" d="flex" flexDir="column" h="100%">
          <Text tag="h4" textAlign="center" textColor="info700">
            {selectedChat?.name}
          </Text>
          <Div overflowY="auto" overflowX ="hidden" flex="1">
            {selectedChat?.messages.map((message, index) => (
              <Div key={index} d="flex" flexDir="column" m={{ b: "1rem" }}>
                {/* handle overflow in the chat bubble */}
                <Text
                  p={{ x: "0.5rem", y: "0.2rem" }}
                  textAlign={message.sender === "You" ? "right" : "left"}
                  textColor={message.sender === "You" ? "info700" : "black"}
                >
                  {message.sender}
                </Text>
                {/* // Position the message to the right if it is sent by me */}
                <Div
                  d="flex"
                  m={{ l: message.sender === "You" ? "auto" : "0" }}
                  overflowWrap={"break-word"}
                  overflowX={"hidden"}
                >
                  <Text
                    p={{ x: "1rem", y: "0.5rem" }}
                    w={{ max: "70%" }}
                    overflowWrap={"break-word"}
                    overflowX={"hidden"}
                    bg={message.sender === "You" ? "info700" : "gray200"}
                    textColor={message.sender === "You" ? "white" : "black"}
                    rounded="lg"
                  >
                    {message.text}
                  </Text>
                </Div>
              </Div>
            ))}
          </Div>
          <Div d="flex" flexDir="row" p="1rem" w="100%" bg="gray300">
            <Input
              placeholder="Type a message..."
              m={{ r: "1rem" }}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default Dashboard;
