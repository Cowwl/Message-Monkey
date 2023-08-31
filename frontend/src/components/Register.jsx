import React from 'react';
import { Div, Text, Input, Button } from 'atomize';

const Register = () => {
    return (
        <Div d="flex" flexDir="column" align="center" justify="center" h="100vh" bg="gray300">
            <Div
                p="2rem"
                m={{ b: "1rem" }}
                rounded="xl"
                shadow="4"
                hoverShadow="5"
                bg="white"
            >
                <Text fontFamily = "Poppins" textSize="display1" m={{ b: "1rem" }} textAlign="center">
                    Register
                </Text>
                <Div w={{ xs: "90%", md: "25rem" }} m={{ b: "1rem" }}>
                    <Input placeholder="Name" />
                </Div>
                <Div w={{ xs: "90%", md: "25rem" }} m={{ b: "1rem" }}>
                    <Input placeholder="Email" />
                </Div>
                <Div w={{ xs: "90%", md: "25rem" }} m={{ b: "1rem" }}>
                    <Input placeholder="Password" type="password" />
                </Div>
                <Button
                    w={{ xs: "90%", md: "25rem" }}
                    rounded="lg"
                    fontFamily = "Poppins"
                    shadow="3"
                    hoverShadow="4"
                    m={{ t: "1rem" }}
                    bg="info700"
                    hoverBg="info800"
                    textColor="white"
                >
                    Register
                </Button>
            </Div>
        </Div>
    );
};

export default Register;
