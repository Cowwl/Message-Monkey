import React from "react";
import { Div, Text, Button, Input, Icon } from "atomize";

const Dashboard = () => {
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [inputText, setInputText] = React.useState("");

  const chats = [
    {
      name: "Alice Doe",
      email: "alice@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      messages: [
        { sender: "Alice Doe", text: "Hi there!" },
        { sender: "You", text: "Hello!" },
        { sender: "Alice Doe", text: "How are you?" },
      ],
    },
    {
      name: "Bob Smith",
      email: "bob@example.com",
      avatar: "https://i.pravatar.cc/150?img=2",
      messages: [
        { sender: "Bob Smith", text: "Hey!" },
        { sender: "You", text: "Hi Bob!" },
        { sender: "Bob Smith", text: "What's up?" },
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
      {/* Create a small left sidebar with a logout button at the bottom */}
      <Div d="flex" flexDir="column" w="4%" h="100%" bg="#17486a" shadow="2">
        {/* Button with icon for chat */}
        <Button
          bg="#17486a"
          hoverShadow="4"
          position="absolute"
          top="0"
          w="100%"
          h="4rem"
          rounded="0"
        >
          <Icon name="UserCircle" color="white" size="20px" />
        </Button>
        <Button
          bg="#17486a"
          hoverShadow="4"
          position="absolute"
          top="0"
          w="100%"
          h="4rem"
          rounded="0"
        >
          <Icon name="Message" color="white" size="20px" />
        </Button>
        <Button
          bg="#17486a"
          hoverShadow="4"
          position="absolute"
          top="0"
          w="100%"
          h="4rem"
          rounded="0"
        >
          <Icon name="Card" color="white" size="20px" />
        </Button>
        <Button
          bg="#17486a"
          hoverShadow="4"
          position="relative"
          bottom="0"
          w="100%"
          h="4rem"
          rounded="0"
        >
          <Icon name="Logout" color="white" size="20px" />
        </Button>
      </Div>
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
          h="auto"
        >
          <Icon name="Menu" size="20px" m={{ r: "1rem" }} />
          <Text
            fontFamily="Poppins"
            textWeight="800"
            p="0.5rem"
            textAlign="center"
            textColor="#17486a"
            textSize="title"
          >
            Conversations
          </Text>
          <Button
            bg="white"
            hoverBg="gray200"
            rounded="circle"
            m={{ l: "auto" }}
          >
            <Icon name="Refresh" size="20px" m={{ l: "auto" }} />
          </Button>
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
            hoverBg="#17486a"
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
            h="auto"
            bg="white"
            border={{ b: "0.5px solid" }}
            borderColor="gray500"
            shadow="2"
            align="center"
          >
            <Text
              m={{ l: "1rem" }}
              textAlign="flex-start"
              textColor="#17486a"
              fontFamily="Poppins"
              textWeight="800"
              textSize="title"
            >
              {selectedChat?.name}
            </Text>
          </Div>
          <Div p="1rem" flex="1" h="100%">
            <Div overflowY="auto" overflowX="hidden" flex="1">
              {selectedChat?.messages.map((message, index) => (
                <Div key={index} d="flex" flexDir="column" m={{ b: "1rem" }}>
                  {/* handle overflow in the chat bubble */}
                  <Text
                    p={{ x: "0.5rem", y: "0.2rem" }}
                    textAlign={message.sender === "You" ? "right" : "left"}
                    textColor={message.sender === "You" ? "#17486a" : "black"}
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
                      bg={message.sender === "You" ? "#17486a" : "white"}
                      textColor={message.sender === "You" ? "white" : "black"}
                    >
                      {message.text}
                    </Text>
                  </Div>
                </Div>
              ))}
            </Div>
          </Div>
          {/* Pin this div to the bottom of the parent div */}
          <Div
            d="flex"
            flexDir="row"
            p="1rem"
            w="100%"
            position="absolute"
            bottom="0"
            justify="space-between"
            bg="white"
            border={{ t: "0.5px solid" }}
            borderColor="gray500"
            rounded="lg"
          >
            <Input
              placeholder="Type a message..."
              w="100%"
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
        h="100%"
        w="20%"
        bg="gray400"
      >
        <Div
          d="flex"
          border={{ b: "0.5px solid" }}
          borderColor="gray500"
          shadow="2"
          h="auto"
          flexDir="column"
          p="1rem"
          align="center"
          justify="center"
          bg="white"
        >
          <div
            style={{
              width: "20%",
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
          <Text
            fontFamily="Poppins"
            textSize="title"
            textWeight="800"
            p="1rem"
            textAlign="center"
            textColor="#212121"
          >
            {selectedChat?.name}
          </Text>
          {/* Add a call and profile icon side by side */}
          <Div d="flex" w="100%" justify="space-around">
            <Button
              bg="#17486a"
              hoverBg="#00335d"
              textColor="white"
              shadow="3"
              hoverShadow="4"
              justify="space-around"
              align="center"
              w="40%"
            >
              <Icon name="Add" color="white" size="20px" />
              Call
            </Button>
            <Button
              bg="#17486a"
              hoverBg="#00335d"
              textColor="white"
              shadow="3"
              hoverShadow="4"
              justify="space-around"
              align="center"
              w="40%"
            >
              <Icon name="User" color="white" size="20px" />
              Profile
            </Button>
          </Div>
        </Div>
        {/* Text should be justified */}
        <Div d="flex" flexDir="column" align="center">
          <Div
            d="flex"
            border={{ b: "0.5px solid" }}
            borderColor="gray500"
            shadow="2"
            h="auto"
            flexDir="column"
            p="1rem"
            w="90%"
            rounded="lg"
            m={{ t: "1rem" }}
            bg="white"
          >
            <Text
              fontFamily="Poppins"
              textSize="subheader"
              textWeight="800"
              textAlign="justify"
              textColor="#212121"
              p="0.5rem"
            >
              Customer Details
            </Text>
            <Text
              fontFamily="Poppins"
              textSize="paragraph"
              textWeight="400"
              textAlign="justify"
              textColor="#212121"
              p="0.5rem"
            >
              {/* print name */}
              First Name: {selectedChat?.name.split(" ")[0]}
            </Text>
            <Text
              fontFamily="Poppins"
              textSize="paragraph"
              textWeight="400"
              textAlign="justify"
              textColor="#212121"
              p="0.5rem"
            >
              {/* print name */}
              Last Name: {selectedChat?.name.split(" ")[1]}
            </Text>
            <Text
              fontFamily="Poppins"
              textSize="paragraph"
              textWeight="400"
              textAlign="justify"
              textColor="#212121"
              p="0.5rem"
            >
              {/* print email */}
              Email: {selectedChat?.email}
            </Text>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};
export default Dashboard;
