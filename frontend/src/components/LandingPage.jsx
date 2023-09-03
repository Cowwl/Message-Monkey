import React from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { Button, Container, Div } from "atomize";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const responseFacebook = (response) => {
    console.log(response);
    // Get user access token
    const userAccessToken = response.accessToken;
    // Get page access tokens
    axios
      .get(
        `https://graph.facebook.com/me/accounts?access_token=${userAccessToken}`
      )
      .then((res) => {
        console.log(res.data);
        // Post page access tokens to /setaccesstoken endpoint
        res.data.data.forEach((page) => {
          axios.post(
            "https://cowwl.pythonanywhere.com/setaccesstoken",
            {
              accessToken: page.access_token,
            }
          );
        });
      });
    setIsLoggedIn(true);
  };

  const handleReplyToMessages = () => {
    window.location.href = "/dashboard";
  };

  const handleDeleteIntegration = () => {
    window.FB.logout();
    setIsLoggedIn(false);
  };

  return (
    <Div d="flex" align="center" justify="center" h="100vh" bg="gray300">
      {!isLoggedIn && (
        <FacebookLogin
          appId="689196115932962"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      )}
      {isLoggedIn && (
        <Div
          d="flex"
          flexDir="column"
          bg="white"
          shadow="2"
          rounded="xl"
          p="1.5rem"
          justify="center"
          align="center"
        >
          <Button m={{ b: "1rem" }} onClick={handleReplyToMessages}>
            Reply to messages
          </Button>
          <Button onClick={handleDeleteIntegration}>
            Delete the integration
          </Button>
        </Div>
      )}
    </Div>
  );
};

export default LandingPage;
