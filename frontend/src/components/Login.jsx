import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Div, Text, Input, Button } from "atomize";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    const response = await axios.post(
      "https://f20202144-04ese3g34v1w0cji.socketxp.com/login",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = response.data;

    if (data === "User logged in successfully") {
      navigate("/LandingPage");
    } else {
      setError("Login failed. Check your email and password.");
    }
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
          Login
        </Text>
        <form onSubmit={handleSubmit}>
          <Div w={{ xs: "90%", md: "25rem" }} m={{ b: "1rem" }}>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Div>
          <Div w={{ xs: "90%", md: "25rem" }} m={{ b: "1rem" }}>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Div>
          {error && <div>{error}</div>}
          <Button
            w={{ xs: "90%", md: "25rem" }}
            rounded="lg"
            shadow="3"
            fontFamily="Poppins"
            hoverShadow="4"
            m={{ t: "1rem" }}
            bg="info700"
            hoverBg="info800"
            textColor="white"
          >
            Login
          </Button>
        </form>
        <div style={{ marginTop: "1rem" }}>
          Don't have an account? <a href="/register">Register</a>
        </div>
      </Div>
    </Div>
  );
};

export default Login;
