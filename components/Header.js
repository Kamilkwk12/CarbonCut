import React from "react";
import { Dimensions, StyleSheet, Button, Image, View, Pressable, Text, } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        height: 100,
        width: width,
        backgroundColor: "#22577a",
    },

    button: {
        height: 50,
        width: 50,
    },
});

function Header() {
    return (
        <View style={styles.container}>
            <AccountBtn />
        </View>
    );
}

class AccountBtn extends React.Component {
    render() {

        return (
            <Pressable style={styles.button}>
                <Text>Kliknij</Text>
            </Pressable>
        );
    }
}

export { Header };
