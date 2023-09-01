import React from "react";
import { Div, Text, Button, Input } from "atomize";

const Dashboard = () => {
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [inputText, setInputText] = React.useState("");

  const chats = [
    {
      name: "Alice",
      email: "alice@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      messages: [
        { sender: "Alice", text: "Hi there!" },
        { sender: "You", text: "Hello!" },
        { sender: "Alice", text: "How are you?" },
      ],
    },
    {
      name: "Bob",
      email: "bob@example.com",
      avatar: "https://i.pravatar.cc/150?img=2",
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
        <Div
          border={{ b: "0.5px solid" }}
          borderColor="gray500"
          p="1rem"
          shadow="2"
          h="8%"
        >
          <Text
            fontFamily="Poppins"
            textWeight="800"
            p="0.5rem"
            textAlign="center"
            textColor="info700"
            textSize="title"
          >
            Chats
          </Text>
        </Div>
        {chats.map((chat, index) => (
          <Button
            key={index}
            onClick={() => {
              setSelectedChat(chat);
            }}
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
        ))}
      </Div>
      <Div
        flex="1"
        border="1px solid"
        borderColor="gray200"
        w="100%"
        h="100%"
        bg="gray200"
      >
        <Div d="flex" flexDir="column" h="100%">
          <Div
            d="flex"
            flexDir="row"
            justify="center"
            p="1rem"
            h="8%"
            bg="white"
            border={{ b: "0.5px solid" }}
            borderColor="gray500"
            shadow="2"
            align="center"
          >
            <Text
              textAlign="center"
              textColor="info700"
              fontFamily="Poppins"
              textWeight="800"
              textSize="title"
            >
              {selectedChat?.name}
            </Text>
          </Div>
          <Div p="1rem" flex="1">
            <Div overflowY="auto" overflowX="hidden" flex="1">
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
              ))}
            </Div>
          </Div>
          <Div d="flex" flexDir="row" p="1rem" w="100%" justify="space-between">
            <Input
              placeholder="Type a message..."
              w="70vw"
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
      {/* Right sidebar with profile details */}
      <Div
        d="flex"
        flexDir="column"
        border="1px solid"
        borderColor="gray200"
        w="15%"
        h="100%"
      >
        <Div
          d="flex"
          border={{ b: "0.5px solid" }}
          borderColor="gray500"
          shadow="2"
          h="8%"
          p="1rem"
          align="center"
          justify="center"
        >
          <Text
            fontFamily="Poppins"
            textSize="title"
            textWeight="800"
            p="1rem"
            textAlign="center"
            textColor="info700"
          >
            Profile
          </Text>
        </Div>
        <Div d="flex" flexDir="column" align="center">
          <div
            style={{
              width: "80%",
              height: "auto",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "1rem auto",
            }}
          >
            <img
              src={selectedChat?.avatar}
              alt={selectedChat?.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <Div
            bg="white"
            p="1rem"
            shadow="2"
            rounded="lg"
            align="center"
            justify="center"
            w="80%"
          >
            <Text tag="h5" p={{ y: "0.5rem" }} textAlign="center">
              {selectedChat?.name}
            </Text>
            <Text tag="p" p={{ y: "0.5rem" }} textAlign="center">
              {selectedChat?.email}
            </Text>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};
export default Dashboard;
