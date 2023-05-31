import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "./navigatior/Navigator";

export default function App() {
    return (
        <NavigationContainer>
            <HomeNavigator />
        </NavigationContainer>
    );
}
