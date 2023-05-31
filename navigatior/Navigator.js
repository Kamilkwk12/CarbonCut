import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

const stackOptionStyle = {
    headerShown: false,
};
const HomeNavigator = () => {
    return (
        <Stack.Navigator screenOptions={stackOptionStyle}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
};

export default HomeNavigator;
