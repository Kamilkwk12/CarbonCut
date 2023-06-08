import React, { useState } from "react";
import { useCallback } from "react";
import { ImageBackground, View, StyleSheet, Dimensions, Image, Text, TextInput, Pressable, Button, Alert, Linking } from "react-native";
import { useFonts, Monoton_400Regular } from "@expo-google-fonts/monoton";
import { NovaRound_400Regular } from "@expo-google-fonts/nova-round";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import firestore from "@react-native-firebase/firestore";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

const w = Dimensions.get("window").width;
const h = "100%";

const Login = ({ navigation }) => {
    let [login, getLogin] = useState();
    let [password, getPassword] = useState();
    let [isHidden, setHide] = useState(true);

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

    const loginOnPress = () => {
        if (login === undefined || login == "" || password == "" || password === undefined) {
            Alert.alert("Błąd", "Uzupełnij wszystkie pola");
        } else {
            navigation.navigate("Home");
        }
    };


    const bgUri = "../assets/bgLogin.png";
    const logoUri = "../assets/captionLogoWhite.png";
    return (
        <View onLayout={onLayoutRootView}>
            <ImageBackground source={require(bgUri)} style={styles.treeBg} opacity={0.2}>
                <Image source={require(logoUri)} style={styles.mainLogo} resizeMode="contain" />
                <Text style={[styles.slogan, styles.monoton]}>Zminimalizuj swój ślad węglowy już dzisiaj!</Text>

                <Text style={[styles.loginHeader, styles.monoton]}>ZALOGUJ SIĘ</Text>
                <TextInput
                    editable
                    placeholderTextColor={`rgba(255, 255, 255, 0.5)`}
                    placeholder="Login"
                    style={styles.input}
                    value={login}
                    onChangeText={login => getLogin(login)}
                />
                <View>
                    <TextInput
                        editable
                        placeholderTextColor={`rgba(255, 255, 255, 0.5)`}
                        placeholder="Hasło"
                        style={styles.input}
                        value={password}
                        onChangeText={password => getPassword(password)}
                        secureTextEntry={isHidden ? true : false}
                    />
                    <Pressable
                        style={styles.hidePass}
                        onPress={() => {
                            setHide(value => !value);
                        }}
                    >
                        <FontAwesomeIcon icon={isHidden ? faEye : faEyeSlash} size={25} color="white" />
                    </Pressable>
                </View>
                <Pressable style={[styles.btn, styles.loginBtn]} onPress={loginOnPress}>
                    <Text style={[styles.monoton, { fontSize: 20 }]}>ZALOGUJ</Text>
                </Pressable>
                <Pressable style={[styles.btn, styles.forgotPass]}>
                    <Text style={styles.nova}>Zapomniałem hasła</Text>
                </Pressable>
                <View style={{ flexDirection: "row", marginTop: 25 }}>
                    <Text style={[styles.nova, { color: colors.creamWhite, fontSize: 20 }]}>Nie masz konta? </Text>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Register");
                        }}
                    >
                        <Text style={[styles.nova, styles.registerLink]}>Zarejestruj się!</Text>
                    </Pressable>
                </View>
                <View style={styles.socialView}>
                    <SocialURLButton url={"https://facebook.com"} socialType={"facebook"} />
                    <View style={styles.line}></View>
                    <SocialURLButton url={"https://instagram.com"} socialType={"instagram"} />
                    <View style={styles.line}></View>
                    <SocialURLButton url={"https://twitter.com"} socialType={"twitter"} />
                </View>
            </ImageBackground>
        </View>
    );
};

const SocialURLButton = ({ url, socialType }) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Brak wspieranej aplikacji do otwarcia linku: ${url}`);
        }
    }, [url]);

    return (
        <Pressable onPress={handlePress}>
            <FontAwesomeIcon
                icon={socialType == "facebook" ? faFacebook : socialType == "instagram" ? faInstagram : faTwitter}
                size={40}
                style={{ color: colors.creamWhite }}
            ></FontAwesomeIcon>
        </Pressable>
    );
};

export default Login;

const colors = {
    background: "#1f1f1f",
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
    registerLink: {
        color: colors.royalBlue,
        textDecorationStyle: "solid",
        textDecorationColor: colors.royalBlue,
        textDecorationLine: "underline",
        fontSize: 20,
    },
    hidePass: {
        position: "absolute",
        right: 30,
        bottom: 30,
        padding: 10,
    },
    socialView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: w,
        paddingHorizontal: 60,
        marginTop: 30,
    },
    line: {
        width: 2,
        height: 50,
        backgroundColor: colors.creamWhite,
        borderRadius: 50,
    },
});
