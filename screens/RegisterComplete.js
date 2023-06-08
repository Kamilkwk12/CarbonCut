import React, { useCallback } from "react";
import { ImageBackground, View, StyleSheet, Text, Dimensions, Pressable, KeyboardAvoidingView } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Monoton_400Regular } from "@expo-google-fonts/monoton";
import { NovaRound_400Regular } from "@expo-google-fonts/nova-round";

const w = Dimensions.get("window").width;
const h = "100%";

const RegisterComplete = ({ navigation }) => {
    SplashScreen.preventAutoHideAsync();

    const [fontsLoaded] = useFonts({
        Monoton_400Regular,
        NovaRound_400Regular,
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    if (!fontsLoaded) {
        return null;
    }

    const bgUri = "../assets/bgRegisterComplete.png";
    return (
        <KeyboardAvoidingView onLayout={onLayoutRootView}>
            <ImageBackground source={require(bgUri)} style={styles.bg}>
                <Text style={[styles.monoton, styles.title]}>Zarejestrowano pomyślnie!</Text>
                <Pressable
                    style={styles.okBnt}
                    onPress={() => {
                        navigation.navigate("Login");
                    }}
                >
                    <Text style={styles.nova}>Powrót do logowania</Text>
                </Pressable>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

export default RegisterComplete;

const colors = {
    background: "#1f1f1f",
    green: "#489A2E",
    creamWhite: "#E8E5DA",
};

const styles = StyleSheet.create({
    monoton: {
        fontFamily: "Monoton_400Regular",
    },
    nova: {
        fontFamily: "NovaRound_400Regular",
        fontSize: 20,
    },
    bg: {
        alignItems: "center",
        backgroundColor: colors.background,
        bottom: 0,
        height: h,
    },
    title: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        marginTop: 600,
    },
    okBnt: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.creamWhite,
        width: w - 80,
        paddingVertical: 20,
        borderRadius: 50,
        marginTop: 20,
    },
});
