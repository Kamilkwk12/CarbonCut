import React, { useCallback } from "react";
import { View, Text, ImageBackground, StyleSheet, Image, Pressable } from "react-native";
import { useFonts, Monoton_400Regular } from "@expo-google-fonts/monoton";
import { NovaRound_400Regular } from "@expo-google-fonts/nova-round";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBicycle, faLeaf, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const h = "100%";

export default Enviroment = ({ navigation }) => {
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

    const bg = "../assets/bgEnvironment.png";
    const cardBg = "../assets/cardBg.png";
    return (
        <View onLayout={onLayoutRootView}>
            <ImageBackground source={require(bg)} style={styles.bg}>
                <Pressable
                    onPress={() => {
                        navigation.navigate("Home");
                    }}
                    style={styles.return}
                >
                    <FontAwesomeIcon icon={faChevronLeft} size={30} style={{ color: "white" }} />
                </Pressable>
                <FontAwesomeIcon icon={faLeaf} size={50} style={styles.icon} />
                <Text style={[styles.nova, styles.heading]}>W jaki sposób zadbać o klimat?</Text>
                <View style={styles.box}>
                    <ImageBackground source={require(cardBg)} style={styles.card1}>
                        <Text style={[styles.monoton, styles.cardHeading]}>Jazda rowerem zamiast autem</Text>
                        <FontAwesomeIcon icon={faBicycle} size={60} style={{ marginHorizontal: (320 - 60) / 2, color: "white" }} />
                        <Text style={[styles.nova, { color: "white", fontSize: 20, margin: 20, marginBottom: 0 }]}>
                            Jest zdrowy dla rowerzysty jak i środowiska, tani w utrzymaniu, zajmuje mało przestrzeni.
                        </Text>
                    </ImageBackground>
                    <View style={{ flexDirection: "row" }}>
                        <Image source={require("../assets/world.jpg")} style={[styles.image, { marginRight: 10 }]} />
                        <Image source={require("../assets/bicycle.jpg")} style={styles.image} />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const colors = {
    background: "#1f1f1f",
    backgroundDark: "#181818",
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
    bg: {
        backgroundColor: colors.background,
        bottom: 0,
        height: h,
        alignItems: "center",
    },
    icon: {
        color: "white",
        marginTop: 30,
    },
    heading: {
        color: "white",
        fontSize: 30,
        marginHorizontal: 40,
        marginTop: 20,
        textAlign: "center",
        textTransform: "uppercase",
    },
    card1: {
        backgroundColor: colors.backgroundDark,
        width: 320,
        height: 320,
        marginTop: 30,
        marginBottom: 10,
        borderRadius: 25,
        shadowRadius: 10,
        shadowColor: "black",
        overflow: "hidden",
    },
    cardHeading: {
        color: "white",
        margin: 20,
        fontSize: 25,
    },
    image: {
        borderRadius: 20,
        width: 155,
        height: 155,
        shadowRadius: 10,
        shadowColor: "black",
    },
    return: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 20,
        top: 20,
        width: 50,
        height: 50,
    },
});
