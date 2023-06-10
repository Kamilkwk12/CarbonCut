import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    StatusBar,
    Image,
    Dimensions,
    ImageBackground,
    FlatList,
    ScrollView,
    ActivityIndicator,
    LogBox,
    SectionList,
} from "react-native";
import { useFonts, Monoton_400Regular } from "@expo-google-fonts/monoton";
import { NovaRound_400Regular } from "@expo-google-fonts/nova-round";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import { PieChart } from "react-native-chart-kit";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCar, faLeaf, faPlus, faArrowRightFromBracket, faDrumstickBite } from "@fortawesome/free-solid-svg-icons";
import { logedInUser } from "./Login";
import { db, storage } from "../FirebaseSetup";
import { getDownloadURL, ref } from "firebase/storage";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { round } from "lodash";

const w = Dimensions.get("window").width;
const h = "100%";

let emissions = {
    transport: 0,
    consumption: 0,
};

const Home = ({ navigation }) => {
    const [profImg, setProfImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [usageDb, setUsageDb] = useState([]);
    const [chartData, setChartData] = useState();

    const getProfImg = useEffect(() => {
        setLoading(true);
        const imageRef = ref(storage, "/prof" + logedInUser.login + ".jpg");
        try {
            getDownloadURL(imageRef).then(url => {
                setProfImg(url);
            });
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }, []);

    const getData = useEffect(() => {
        setLoading(true);
        const colRef = collection(db, "users", logedInUser.id, "usageData");
        onSnapshot(colRef, snapshot => {
            const dataList = [];
            snapshot.docs.map(doc => dataList.push({ ...doc.data(), id: doc.id }));
            setUsageDb(dataList);
        });
        setLoading(false);
    }, []);

    const getEmissionsByCategory = useEffect(() => {
        const resultTransport = usageDb.filter(({ category }) => category === "transport");
        resultTransport.forEach(item => {
            emissions.transport += item.emissions;
        });

        const resultConsumption = usageDb.filter(({ category }) => category === "consumption");
        resultConsumption.forEach(item => {
            emissions.consumption += item.emissions;
        });

        setChartData([
            {
                name: "Transport",
                usage: emissions.transport,
                color: colors.tomatoRed,
                legendFontColor: colors.creamWhite,
                legendFontSize: 15,
            },
            {
                name: "Żywność",
                usage: emissions.consumption,
                color: colors.green,
                legendFontColor: colors.creamWhite,
                legendFontSize: 15,
            },
        ]);
    }, [usageDb]);

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

    const onPress = () => {
        console.log(usageDb);
    };

    const totalUsage = () => {
        let usage = 0;
        usageDb.forEach(item => {
            usage += item.emissions;
        });
        return round(usage, 2);
    };

    const chartConfig = {
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    };

    const carbonUsage = totalUsage();
    const bgUri = "../assets/bgMain.png";
    const bgTopPanel = "../assets/captionLogoWhite10p.png";
    const name = logedInUser.name;
    const surname = logedInUser.surname;

    return (
        <View
            onLayout={() => {
                onLayoutRootView;
                getData;
                getProfImg;
            }}
        >
            <StatusBar />
            <ImageBackground source={require(bgUri)} style={styles.treeBg} imageStyle={{ opacity: 0.2 }}>
                <View>
                    <ImageBackground source={require(bgTopPanel)} style={styles.topPanel}>
                        <Pressable style={styles.userPressable} onPress={onPress}>
                            <LinearGradient colors={[colors.green, "white"]} style={styles.imgBg} start={[0.1, 0.5]}>
                                {loading ? (
                                    <View style={styles.img}>
                                        <ActivityIndicator />
                                    </View>
                                ) : (
                                    <Image source={{ uri: profImg }} style={styles.img} />
                                )}
                            </LinearGradient>
                            <View>
                                <Text style={[styles.topPanelText, styles.greeting, styles.nova]}>Witaj,</Text>
                                <Text style={[styles.topPanelText, styles.userName, styles.nova]}>
                                    {name} {surname}
                                </Text>
                            </View>
                        </Pressable>
                    </ImageBackground>
                </View>

                <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                    <View style={styles.chartView}>
                        <Text style={[styles.chartHeader, styles.nova]}>Twój ślad węglowy wynosi</Text>
                        <Text style={[styles.chartSummary, styles.monoton]}>
                            {carbonUsage}KG CO<Text style={{ fontSize: 28 }}>2</Text>
                        </Text>

                        {carbonUsage == 0 ? (
                            <Text style={[styles.addFirstActivity, styles.monoton]}>Dodaj pierwszą aktywność</Text>
                        ) : (
                            <>
                                <PieChart data={chartData} width={w} height={220} chartConfig={chartConfig} accessor={"usage"} center={[10, 10]} />
                                {usageDb.map(({ id, category, date, distance, activityId, cost }) => (
                                    <Activity key={id} category={category} date={date} distance={distance} activityId={activityId} cost={cost} />
                                ))}
                            </>
                        )}
                    </View>
                </ScrollView>

                <View style={{ height: 90 }}></View>

                <View style={styles.navBar}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Login");
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            size={30}
                            color={colors.creamWhite}
                            style={{ transform: [{ rotate: "180deg" }] }}
                        />
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("ActivityType");
                        }}
                        style={{ alignItems: "center", bottom: 20 }}
                    >
                        <LinearGradient
                            colors={[colors.green, colors.background]}
                            style={styles.addBtn}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1.4 }}
                        >
                            <FontAwesomeIcon icon={faPlus} size={40} color={colors.creamWhite} />
                        </LinearGradient>
                        <Text style={[styles.addBtnText, styles.nova]}>Dodaj aktywność</Text>
                    </Pressable>
                    <Pressable>
                        <FontAwesomeIcon icon={faLeaf} size={30} color={colors.creamWhite} />
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Home;

const Activity = ({ category, date, distance, activityId, cost }) => {
    return (
        <LinearGradient style={styles.activityBorder} colors={[colors.green, colors.background, "white"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <ImageBackground blurRadius={12}>
                <Pressable style={styles.activity} opacity={0.95}>
                    {activityId == "carDriving" ? (
                        <FontAwesomeIcon icon={faCar} color={colors.creamWhite} size={50} style={styles.activityIcon} />
                    ) : (
                        <FontAwesomeIcon icon={faDrumstickBite} color={colors.creamWhite} size={50} style={styles.activityIcon} />
                    )}
                    <View style={{ marginLeft: 10 }}>
                        <Text style={[styles.activityTitle, styles.nova]}>
                            {activityId == "carDriving" ? `Jazda autem - ${distance} km` : `Spożycie mięsa`}
                        </Text>
                        <Text style={[styles.activityDetails, styles.nova]}>Kategoria: {category == "transport" ? "Transport" : "Żywność"}</Text>
                        <Text style={[styles.activityDate, styles.nova]}>{date}</Text>
                    </View>
                </Pressable>
            </ImageBackground>
        </LinearGradient>
    );
};

const colors = {
    background: "#1f1f1f",
    backgroundDark: "#181818",
    topPanel: "#181818",
    green: "#489A2E",
    lightGreen: "#61C378",
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
    container: { flex: 1 },
    treeBg: {
        backgroundColor: colors.background,
        bottom: 0,
        height: h,
    },
    topPanel: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: w,
        height: 110,
        backgroundColor: colors.topPanel,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },
    topPanelText: {
        color: "white",
    },
    greeting: {
        fontSize: 15,
    },
    userName: {
        fontSize: 20,
        letterSpacing: 1.2,
        lineHeight: 34,
    },
    img: {
        alignItems: "center",
        justifyContent: "center",
        width: 55,
        height: 55,
        borderRadius: 55,
        backgroundColor: colors.backgroundDark,
    },
    imgBg: {
        marginLeft: 20,
        marginRight: 18,
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        borderRadius: 50,
    },

    userPressable: {
        flexDirection: "row",
        alignItems: "center",
    },
    chartView: {
        marginVertical: 20,
        alignItems: "center",
    },

    chartHeader: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
    },

    chartSummary: {
        color: "white",
        fontSize: 46,
        textAlign: "center",
    },
    activityBorder: {
        borderRadius: 14,
        marginVertical: 5,
    },
    addFirstActivity: {
        color: "white",
        fontSize: 40,
        textAlign: "center",
        marginTop: 60,
    },
    activity: {
        flexDirection: "row",
        alignItems: "center",
        margin: 2,
        backgroundColor: colors.backgroundDark,
        width: w - 50,
        height: 100,
        padding: 10,
        borderRadius: 13,
    },
    activityIcon: {
        colors: colors.creamWhite,
        margin: 20,
    },
    activityTitle: {
        marginVertical: 2,
        fontSize: 18,
        color: "white",
    },
    activityDetails: {
        marginVertical: 2,
        color: "white",
    },
    activityDate: {
        marginVertical: 2,
        color: "#979797",
    },
    navBar: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: colors.backgroundDark,
        width: w,
        height: 90,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
    },
    addBtn: {
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        borderRadius: 50,
        marginBottom: 10,
    },
    addBtnText: {
        color: "white",
    },
});
