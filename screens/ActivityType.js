import React, { useCallback, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, Dimensions, StatusBar, Pressable, TextInput, ActivityIndicator } from "react-native";
import { useFonts, Monoton_400Regular } from "@expo-google-fonts/monoton";
import { NovaRound_400Regular } from "@expo-google-fonts/nova-round";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCar, faChevronLeft, faDrumstickBite } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getEmissions } from "../api/apiHandler";
import { db } from "../FirebaseSetup";
import { addDoc, collection } from "firebase/firestore";
import { logedInUser } from "./Login";

const w = Dimensions.get("window").width;
const h = "100%";

export default ActivityType = ({ navigation }) => {
    const [distance, setDistance] = useState();
    const [cost, setCost] = useState("");
    const [loading, setLoading] = useState(false);

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

    const handlePress = async type => {
        setLoading(true);
        if (type == "car") {
            try {
                let request = await getEmissions({ type: type, value: distance });
                const ref = collection(db, "users", logedInUser.id, "usageData");
                console.log(ref);
                let date = new Date().toLocaleDateString();
                addDoc(ref, {
                    activityId: "carDriving",
                    category: "transport",
                    distance: request.activity_data.activity_value,
                    emissions: request.co2e,
                    date: date,
                });
                setLoading(false);
                navigation.navigate("ActivityAdded");
            } catch (error) {
                console.log(error);
                setLoading(false);
                navigation.navigate("Home");
            }
        } else if (type == "meat") {
            try {
                let request = await getEmissions({ type: type, value: cost });
                const ref = collection(db, "users", logedInUser.id, "usageData");
                let date = new Date().toLocaleDateString();
                addDoc(ref, {
                    activityId: "meatConsumption",
                    category: "consumption",
                    cost: request.activity_data.activity_value,
                    emissions: request.co2e,
                    date: date,
                });
                navigation.navigate("ActivityAdded");
                setLoading(false);
            } catch (error) {
                console.log(error);
                navigation.navigate("Home");
                setLoading(false);
            }
        }
    };

    const bgUri = "../assets/bgActivityType.png";

    return (
        <View onLayout={onLayoutRootView}>
            <ImageBackground source={require(bgUri)} style={styles.bg}>
                {!loading ? (
                    <>
                        <Pressable
                            onPress={() => {
                                navigation.navigate("Home");
                            }}
                            style={styles.return}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} size={30} style={{ color: "white" }} />
                        </Pressable>
                        <StatusBar />
                        <View style={{ marginHorizontal: 40, marginTop: 50 }}>
                            <Text style={[styles.nova, styles.heading]}>Wybierz aktywność</Text>
                            <LinearGradient colors={[colors.green, "white"]} style={styles.border} start={[0.1, 0.5]}>
                                <View style={styles.activity}>
                                    <View style={{ flexDirection: "row" }}>
                                        <FontAwesomeIcon icon={faCar} size={40} style={styles.icon} />
                                        <View>
                                            <Text style={[styles.cardHeading, styles.nova]}>Jazda samochodem</Text>
                                            <Text style={[{ color: colors.grayAlpha }, styles.nova]} s>
                                                Kategoria: Transport
                                            </Text>
                                        </View>
                                    </View>

                                    <TextInput
                                        editable
                                        placeholderTextColor={`rgba(255, 255, 255, 0.5)`}
                                        placeholder="Przejechany dystans (km)"
                                        style={styles.input}
                                        inputMode={"numeric"}
                                        value={distance}
                                        onChangeText={text => setDistance(text)}
                                    />
                                    <Pressable
                                        style={styles.submit}
                                        onPress={() => {
                                            handlePress("car", distance);
                                        }}
                                    >
                                        <Text style={[styles.nova, { fontSize: 18 }]}>Dodaj</Text>
                                    </Pressable>
                                </View>
                            </LinearGradient>
                            <LinearGradient colors={[colors.green, "white"]} style={styles.border} start={[0.1, 0.5]}>
                                <View style={styles.activity}>
                                    <View style={{ flexDirection: "row" }}>
                                        <FontAwesomeIcon icon={faDrumstickBite} size={40} style={styles.icon} />
                                        <View>
                                            <Text style={[styles.cardHeading, styles.nova]}>Spożycie mięsa</Text>
                                            <Text style={[{ color: colors.grayAlpha }, styles.nova]} s>
                                                Kategoria: Żywność
                                            </Text>
                                        </View>
                                    </View>

                                    <TextInput
                                        editable
                                        placeholderTextColor={`rgba(255, 255, 255, 0.5)`}
                                        placeholder="Koszt (PLN)"
                                        style={styles.input}
                                        inputMode={"numeric"}
                                        value={cost}
                                        onChangeText={text => setCost(text)}
                                    />
                                    <Pressable
                                        style={styles.submit}
                                        onPress={() => {
                                            handlePress("meat", cost);
                                        }}
                                    >
                                        <Text style={[styles.nova, { fontSize: 18 }]}>Dodaj</Text>
                                    </Pressable>
                                </View>
                            </LinearGradient>
                        </View>
                    </>
                ) : (
                    <ActivityIndicator size={"large"} style={{ width: 100, height: 100, margin: "auto" }} />
                )}
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
    },
    bg: {
        backgroundColor: colors.background,
        bottom: 0,
        height: h,
    },
    activity: {
        width: "100%",
        // height: 200,
        paddingTop: 25,
        backgroundColor: colors.backgroundDark,
        borderRadius: 25,
    },
    heading: {
        marginBottom: 25,
        fontSize: 23,
        color: "white",
        textAlign: "center",
    },
    cardHeading: {
        color: "white",
        fontSize: 20,
    },
    icon: {
        color: colors.creamWhite,
        marginHorizontal: 25,
    },
    border: {
        borderRadius: 25,
        padding: 2,
        marginBottom: 20,
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
    input: {
        fontFamily: "NovaRound_400Regular",
        fontSize: 20,
        color: "white",
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 20,
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: "white",
    },
    submit: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderRadius: 15,
        margin: 20,
        marginTop: 5,
        backgroundColor: colors.creamWhite,
    },
});
