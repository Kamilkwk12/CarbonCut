import React from "react";
import { useCallback } from "react";
import { StyleSheet, Text, View, Pressable, StatusBar, SafeAreaView, Image, ToastAndroid, Dimensions } from "react-native";
import { useFonts, OpenSans_400Regular, OpenSans_300Light, OpenSans_700Bold } from "@expo-google-fonts/open-sans";
import * as SplashScreen from "expo-splash-screen";

const w = Dimensions.get("window").width;

const Home = () => {
    SplashScreen.preventAutoHideAsync();

    const [fontsLoaded] = useFonts({
        OpenSans_400Regular,
        OpenSans_300Light,
        OpenSans_700Bold,
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container} onLayout={onLayoutRootView}>
                <StatusBar backgroundColor={"#dad7cd"} />
                <UserPanel />
            </View>
        </SafeAreaView>
        
    );
};

export default Home;

const UserPanel = () => {
    const onPress = () => {
        ToastAndroid.show("Kliknięto przycisk!", ToastAndroid.SHORT);
    };

    return (
        <Pressable style={styles.userPanel} onLongPress={onPress}>
            <Image source={require("../assets/prof.jpg")} style={styles.img}></Image>
            <Text style={[styles.userName, styles.font]}>Kamil Kwiatkowski</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    font: {
        fontFamily: "OpenSans_700Bold",
    },
    container: {
        flex: 1,
        backgroundColor: "#344e41",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    userPanel: {
        flexDirection: "row",
        alignItems: "center",
        width: w,
        height: 160,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        overflow: "hidden",
        backgroundColor: "#dad7cd",
    },
    userName: {
        color: "#0b100d",
        fontSize: 18,
    },
    img: {
        marginHorizontal: 10,
        width: 55,
        height: 55,
        borderRadius: 50,
    },
    text: {
        color: "black",
    },
});
