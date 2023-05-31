import React from "react";
import { Dimensions, StyleSheet, Button, Image, View, Pressable, Text, ToastAndroid } from "react-native";
const { width, height } = Dimensions.get("window");

function Header() {
    return (
        <View style={styles.view}>
            <UserProf />
            <UserName />
        </View>
    );
}

function UserProf() {
    const onPress = () => {
        ToastAndroid.show("Kliknięto przycisk!", ToastAndroid.SHORT);
    };

    return (
        <Pressable className={"userButton"} style={styles.button} onLongPress={onPress}>
            <Image source={require("../assets/prof.jpg")} style={styles.img}></Image>
        </Pressable>
    );
}

function UserName() {
    const onPress = () => {
        ToastAndroid.show("Kliknięto nazwę!", ToastAndroid.SHORT);
    };

    return (
    
        <Pressable onPress={onPress}>
            <Text>Kamil Kwiatkowski</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: "red",
        flexDirection: "row",
        alignItems:"center",
        
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: "red",
        borderRadius: 50,
        overflow: "hidden",
        margin: 10,
    },

    img: {
        width: 50,
        height: 50,
    },
});

export { Header };
