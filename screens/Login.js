import React, { useState } from "react";
import { useCallback } from "react";
import { ImageBackground, View, StyleSheet, Dimensions, Image, Text, TextInput, Pressable } from "react-native";
import { useFonts, Monoton_400Regular } from "@expo-google-fonts/monoton";
import { NovaRound_400Regular } from "@expo-google-fonts/nova-round";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";

const w = Dimensions.get("window").width;
const h = "100%";

const Login = ({ navigaton }) => {
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

    

    const bgUri = "../assets/bgLogin.png";
    const logoUri = "../assets/captionLogoWhite.png";
    return (
        <View onLayout={onLayoutRootView}>
            <ImageBackground source={require(bgUri)} style={styles.treeBg} opacity={0.2}>
                <Image source={require(logoUri)} style={styles.mainLogo} resizeMode="contain" />
                <Text style={[styles.slogan, styles.monoton]}>Zminimalizuj swój ślad węglowy już dzisiaj!</Text>
                <Form nav={navigaton}/>
            </ImageBackground>
        </View>
    );
};

const Form = (nav) => {
    const [login, getLogin] = useState();
    const [password, getPassword] = useState();

    const onPressHandler = () => {
        nav.navigate("Home");
    };

    const bgUri = "../assets/formBg.png";
    return (
        <LinearGradient style={styles.loginBorder} colors={[colors.green, colors.backgroundDark]} start={{ x: 1, y: 1 }} end={{ x: 1, y: 0.0 }}>
            <ImageBackground source={require(bgUri)} style={styles.login}>
                <Text style={[styles.loginHeader, styles.monoton]}>ZALOGUJ SIĘ</Text>
                <TextInput
                    editable
                    placeholderTextColor={`rgba(255, 255, 255, 0.5)`}
                    placeholder="Login"
                    style={styles.input}
                    value={login}
                    onChangeText={login => getLogin(login)}
                />
                <TextInput
                    editable
                    placeholderTextColor={`rgba(255, 255, 255, 0.5)`}
                    placeholder="Hasło"
                    style={styles.input}
                    value={password}
                    onChangeText={password => getPassword(password)}
                />

                <Pressable style={[styles.btn, styles.loginBtn]} onPress={onPressHandler}>
                    <Text style={[styles.monoton, { fontSize: 20 }]}>ZALOGUJ</Text>
                </Pressable>
                <Pressable style={[styles.btn, styles.forgotPass]}>
                    <Text style={styles.nova}>Zapomniałem hasła</Text>
                </Pressable>
            </ImageBackground>
        </LinearGradient>
    );
};

export default Login;

const colors = {
    background: "#1f1f1f",
    backgroundDark: "#181818",
    topPanel: "#181818",
    green: "#489A2E",
    lightGreen: "#77ba97",
    tomatoRed: "#BC4749",
    creamWhite: "#E8E5DA",
    royalBlue: "#48639C",
};

const styles = StyleSheet.create({
    monoton: {
        fontFamily: "Monoton_400Regular",
    },
    nova: {
        fontFamily: "NovaRound_400Regular",
    },
    treeBg: {
        backgroundColor: colors.background,
        bottom: 0,
        height: h,
        alignItems: "center",
    },
    mainLogo: {
        marginTop: 30,
        width: w - 20,
    },
    slogan: {
        color: "white",
        fontSize: 23,
        textAlign: "center",
        marginBottom: 20,
    },
    loginBorder: {
        borderRadius: 50,
        width: w - 40,
        height: 500,
        padding: 3,
    },
    login: {
        // backgroundColor: colors.creamWhite,
        alignItems: "center",
        overflow: "hidden",
        height: "100%",
        borderRadius: 50,
    },
    loginHeader: {
        color: "white",
        fontSize: 35,
        marginTop: 40,
    },
    input: {
        color: "white",
        fontSize: 30,
        width: w - 100,
        borderBottomWidth: 2,
        borderBottomColor: "white",
        fontFamily: "NovaRound_400Regular",
        margin: 30,
    },
    btn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.creamWhite,
        width: w - 100,
        borderRadius: 50,
    },
    loginBtn: {
        marginTop: 20,
        height: 50,
    },
    forgotPass: {
        marginTop: 20,
        height: 35,
    },
});
