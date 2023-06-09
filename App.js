import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Register from "./screens/Register"
import Home from "./screens/Home";
import RegisterComplete from "./screens/RegisterComplete";
import ActivityType from "./screens/ActivityType";
import ActivityAdded from "./screens/ActivityAdded";

const Stack = createNativeStackNavigator();

const stackOptionStyle = {
    headerShown: false,
    animation: "fade_from_bottom"
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={stackOptionStyle} initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="RegisterComplete" component={RegisterComplete} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ActivityType" component={ActivityType} />
                <Stack.Screen name="ActivityAdded" component={ActivityAdded} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
