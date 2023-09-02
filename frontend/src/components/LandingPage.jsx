import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";

const LandingPage = () => {
  // Login with facebook and then show pages that user manages
  const [pages, setPages] = useState([]);
  const [token, setToken] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    setToken(response.accessToken);
    // get pages that user manages
    window.FB.api("/me/accounts", (response) => {
      if (response && !response.error) {
        setPages(response.data);
      }
    });
  };

  return (
    <div>
      <FacebookLogin
        appId="1460237794823248"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <h3>Pages you manage:</h3>
      <ul>
        {pages.map((page) => (
          <li key={page.id}>{page.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LandingPage;
