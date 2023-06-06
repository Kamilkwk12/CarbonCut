import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import Home from "./screens/Home";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

const stackOptionStyle = {
    headerShown: false,
    animation: "fade_from_bottom"
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={stackOptionStyle} initialRouteName="Login">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
