import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { Div, Text, Button } from "atomize";

const LandingPage = () => {
  const [fbData, setFbData] = useState(null);

  const responseFacebook = (response) => {
    // handle response from Facebook
    setFbData(response);
    // post api secret key for messenger to the backend
    // ...
  };

  return (
    <Div
      d="flex"
      flexDir="column"
      align="center"
      justify="center"
      h="100vh"
      bg="gray300"
    >
      <Div
        p="2rem"
        m={{ b: "1rem" }}
        rounded="xl"
        shadow="4"
        hoverShadow="5"
        bg="white"
      >
        <Text
          fontFamily="Poppins"
          textSize="display1"
          m={{ b: "1rem" }}
          textAlign="center"
        >
          Landing Page
        </Text>
        {!fbData ? (
          <FacebookLogin
            appId="804885698097294"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
          />
        ) : (
          <Div>
            <Text tag="h2" textSize="heading">
              Welcome, {fbData.name}!
            </Text>
            <Text>Connected to Facebook Business Page: ...</Text>
          </Div>
        )}
      </Div>
    </Div>
  );
};

export default LandingPage;
