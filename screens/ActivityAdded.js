import { useCallback } from "react";
import { View, Text, Pressable, ImageBackground, StyleSheet, Dimensions } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Monoton_400Regular } from "@expo-google-fonts/monoton";
import { NovaRound_400Regular } from "@expo-google-fonts/nova-round";

const w = Dimensions.get("window").width;
const h = "100%";

export default ActivityAdded = ({ navigation }) => {
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

    const bgUri = "../assets/bgActivityType.png";

    return (
        <View onLayout={onLayoutRootView}>
            <ImageBackground source={require(bgUri)} style={styles.bg}>
                <Text style={[styles.confirm, styles.monoton]}>Dodano poprawnie!</Text>
                <Pressable
                    onPress={() => {
                        navigation.navigate("Home");
                    }}
                    style={styles.btn}
                >
                    <Text style={styles.nova}>Wróć do menu głównego</Text>
                </Pressable>
            </ImageBackground>
        </View>
    );
};

const colors = {
    background: "#1f1f1f",
    backgroundDark: "#181818",
    creamWhite: "#E8E5DA",
    grayAlpha: `rgba(255, 255, 255, 0.5)`,
    green: "#489A2E",
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
        backgroundColor: colors.background,
        bottom: 0,
        height: h,
    },
    confirm: {
        marginTop: 150,
        color: "white",
        fontSize: 40,
        textAlign: "center",
    },
    btn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.creamWhite,
        height: 50,
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 40,
    },
});
