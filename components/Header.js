import React from "react";
import { Dimensions, StyleSheet, Button, Image, View, Pressable, Text, ToastAndroid } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#ff0000",
    },

    img: {
        width: 50,
        height: 50,
    },
});

function Header() {
    return (
        <View >
            <User />
        </View>
    );
}

function User() {
    const onPress = () => {
        ToastAndroid.show("Kliknięto przycisk!", ToastAndroid.SHORT);
    };

    return (
        <Pressable className={"userButton"} style={styles.button} onLongPress={onPress}>
        </Pressable>
    );
}

export { Header };
