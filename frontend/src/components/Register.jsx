import React, { useState } from "react";
import { Div, Text, Input, Button } from "atomize";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://cowwl.pythonanywhere.com/register",
        new URLSearchParams({
          name,
          email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.data === "User registered successfully") {
        alert("Registration successful!");
        window.location.href = "/login";
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
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
          Register
        </Text>
        <form onSubmit={handleSubmit}>
          <Div w={{ xs: "90%", md: "25rem" }} m={{ b: "1rem" }}>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Div>
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
          <Button
            type="submit"
            w={{ xs: "90%", md: "25rem" }}
            rounded="lg"
            fontFamily="Poppins"
            shadow="3"
            hoverShadow="4"
            m={{ t: "1rem" }}
            bg="info700"
            hoverBg="info800"
            textColor="white"
          >
            Register
          </Button>
          <div style={{ marginTop: "1rem" }}>
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      </Div>
    </Div>
  );
};

export default Register;
