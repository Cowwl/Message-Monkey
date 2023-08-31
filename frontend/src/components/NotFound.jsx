import React from 'react';
import { Div, Text } from 'atomize';

const NotFound = () => {
    return (
        <Div d="flex" flexDir="column" align="center" justify="center" h="100vh">
            <Text fontFamily = "Poppins" tag="h1" textSize="display3" m={{ b: "1rem" }}>
                404
            </Text>
            <Text fontFamily = "Poppins" textWeight="300" tag="h2" textSize="subheader" m={{ b: "1rem" }}>
                Page Not Found
            </Text>
        </Div>
    );
};

export default NotFound;
