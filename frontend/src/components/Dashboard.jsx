import React from 'react';
import { Div, Text, SideDrawer, Button } from 'react-atomize';

const Dashboard = () => {
  const [showChat, setShowChat] = React.useState(false);
  const [selectedChat, setSelectedChat] = React.useState(null);

  const chats = [
    {
      name: 'Alice',
      messages: [
        { sender: 'Alice', text: 'Hi there!' },
        { sender: 'You', text: 'Hello!' },
        { sender: 'Alice', text: 'How are you?' },
      ],
    },
    {
      name: 'Bob',
      messages: [
        { sender: 'Bob', text: 'Hey!' },
        { sender: 'You', text: 'Hi Bob!' },
        { sender: 'Bob', text: 'What\'s up?' },
      ],
    },
  ];

  return (
    <Div>
      <Div
        d="flex"
        flexDir="column"
        border="1px solid"
        borderColor="gray200"
        w="250px"
      >
        <Text tag="h4" p="1rem" textAlign="center">
          Chats
        </Text>
        {chats.map((chat, index) => (
          <Button
            key={index}
            onClick={() => {
              setSelectedChat(chat);
              setShowChat(true);
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
      <SideDrawer isOpen={showChat} onClose={() => setShowChat(false)}>
        <Div p="1rem">
          <Text tag="h4" textAlign="center">
            {selectedChat?.name}
          </Text>
          {selectedChat?.messages.map((message, index) => (
            <Div key={index} p={{ b: '1rem' }}>
              <Text
                tag="span"
                textSize="caption"
                textColor={message.sender === 'You' ? 'info700' : 'black'}
              >
                {message.sender}
              </Text>
              <Text>{message.text}</Text>
            </Div>
          ))}
        </Div>
      </SideDrawer>
    </Div>
  );
};

export default Dashboard;
