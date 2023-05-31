import React from "react";
import { useCallback } from "react";
import { StyleSheet, Text, View, Pressable, StatusBar, SafeAreaView, Image, ToastAndroid, Dimensions } from "react-native";
import { useFonts, OpenSans_400Regular, OpenSans_300Light, OpenSans_700Bold } from "@expo-google-fonts/open-sans";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faBars, faLeaf} from "@fortawesome/free-solid-svg-icons/";


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
                <StatusBar backgroundColor={colors.darkGreen} />
                <TopPanel />
                <NavBar />
            </View>
        </SafeAreaView>
    );
};

export default Home;

const TopPanel = () => {
    return (
        <View style={styles.topPanel}>
            <UserPressable />
            <BurgerIcon />
        </View>
    );
};

const UserPressable = () => {
    const onPress = () => {
        ToastAndroid.show("Kliknięto panel użytkownika!", ToastAndroid.SHORT);
    };

    return (
        <Pressable style={styles.userPressable} onPress={onPress}>
            <Image source={require("../assets/prof.jpg")} style={styles.img}></Image>
            <View>
                <Text style={[styles.fontN, styles.greeting]}>Witaj</Text>
                <Text style={[styles.userName, styles.fontB]}>Kamil Kwiatkowski</Text>
            </View>
        </Pressable>
    );
};

const BurgerIcon = () => {
    const onPress = () => {
        ToastAndroid.show("Kliknięto burger ikonke!", ToastAndroid.SHORT);
    };

    return (
        <Pressable style={styles.burgerIcon} onPress={onPress}>
            <FontAwesomeIcon icon={faBars} size={40} style={{ marginRight: 30 }} color={colors.main} />
        </Pressable>
    );
};

const NavBar = () => {
    return (
        <View style={styles.navBar}>
            <View style={styles.btnView}>
                <InfoBtn />
            </View>
            <View style={styles.btnView}>
                <PlusBtn />
                <Text style={[styles.btnCaption, styles.fontB]}>Dodaj</Text>
            </View>
            <View style={styles.btnView}>
                <Btn />

            </View>
        </View>
    );
};

const PlusBtn = () => {
    const onPress = () => {
        ToastAndroid.show("Kliknięto plus ikonke!", ToastAndroid.SHORT);
    };

    return (
        <Pressable style={styles.plusBtn} onPress={onPress}>
            <FontAwesomeIcon icon={faPlus} size={40} color={colors.yellow} />
        </Pressable>
    );
};

const InfoBtn = () => {
    const onPress = () => {
        ToastAndroid.show("Kliknięto info ikonke!", ToastAndroid.SHORT);
    };

    return (
        <Pressable style={styles} onPress={onPress}>
            <FontAwesomeIcon icon={faPlus} size={40} color={colors.darkGreen} />
        </Pressable>
    );
};
const Btn = () => {
    const onPress = () => {
        ToastAndroid.show("Kliknięto info ikonke!", ToastAndroid.SHORT);
    };

    return (
        <Pressable style={styles} onPress={onPress}>
            <FontAwesomeIcon icon={faLeaf} size={40} color={colors.darkGreen} />
        </Pressable>
    );
};

const colors = {
    main: "#f1f7ed",
    lightGreen: "#e0eec6",
    darkGreen: "#243e36",
    green: "#7ca982",
    yellow: "#c2a83e",
    navBar: "#dad7cd",
};

const styles = StyleSheet.create({
    fontL: {
        fontFamily: "OpenSans_300Light",
    },
    fontN: {
        fontFamily: "OpenSans_400Regular",
    },
    fontB: {
        fontFamily: "OpenSans_700Bold",
    },
    container: {
        flex: 1,
        backgroundColor: colors.main,
    },
    topPanel: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: w,
        height: "15%",
        backgroundColor: colors.darkGreen,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },
    userPressable: {
        width: "70%",
        flexDirection: "row",
        alignItems: "center",
    },
    greeting: {
        color: colors.main,
    },
    userName: {
        color: colors.lightGreen,
        fontSize: 18,
    },
    img: {
        borderWidth: 3,
        borderColor: colors.lightGreen,
        marginLeft: 20,
        marginRight: 15,
        width: 55,
        height: 55,
        borderRadius: 55,
    },

    navBar: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "space-around",

        margin: 20,
        borderRadius: 20,
        height: 110,
        backgroundColor: colors.navBar,
    },
    plusBtn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.darkGreen,
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    btnCaption: {
        textTransform: "uppercase",
        color: colors.darkGreen,
    },
    btnView: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
});
