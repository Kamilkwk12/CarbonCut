import React from "react";
import { useCallback } from "react";
import { StyleSheet, Text, View, Pressable, StatusBar, Image, ToastAndroid, Dimensions, ImageBackground, FlatList, ScrollView } from "react-native";
import { useFonts, Monoton_400Regular } from "@expo-google-fonts/monoton";
import { NovaRound_400Regular } from "@expo-google-fonts/nova-round";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import { PieChart } from "react-native-chart-kit";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCar, faBars, faLeaf, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Circle, Svg } from "react-native-svg";

const w = Dimensions.get("window").width;
const h = "100%";

const Home = () => {
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

    const bgUri = "../assets/bgMain.png";

    return (
        <View onLayout={onLayoutRootView}>
            <ImageBackground source={require(bgUri)} style={styles.treeBg} imageStyle={{ opacity: 0.2 }}>
                <TopPanel />
                <StatusBar backgroundColor={colors.darkGreen} />
                <UsageChart />
                <ScrollView contentContainerStyle={{ alignItems: "center", marginTop: 10 }}>
                    <Activity />
                    <Activity />
                    <Activity />
                    <Activity />
                    <Activity />
                    <Activity />
                </ScrollView>
                <View style={{ height: 90 }}></View>
                <NavBar />
            </ImageBackground>
        </View>
    );
};

export default Home;

const TopPanel = () => {
    const onPress = () => {
        ToastAndroid.show("Kliknięto panel użytkownika!", ToastAndroid.SHORT);
    };
    const uri = "../assets/captionLogoWhite10p.png";
    const profUri = "../assets/prof.jpg";
    const userName = "Kamil Kwiatkowski";
    return (
        <View>
            <ImageBackground source={require(uri)} style={styles.topPanel}>
                <Pressable style={styles.userPressable} onPress={onPress}>
                    <LinearGradient colors={[colors.green, "white"]} style={styles.imgBg} start={[0.1, 0.5]}>
                        <Image source={require(profUri)} style={styles.img}></Image>
                    </LinearGradient>
                    <View>
                        <Text style={[styles.topPanelText, styles.greeting, styles.nova]}>Witaj,</Text>
                        <Text style={[styles.topPanelText, styles.userName, styles.nova]}>{userName}</Text>
                    </View>
                </Pressable>
            </ImageBackground>
        </View>
    );
};

const UsageChart = () => {
    const chartConfig = {
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    };

    const data = [
        {
            name: "Seoul",
            population: 120,
            color: colors.tomatoRed,
            legendFontColor: colors.creamWhite,
            legendFontSize: 15,
        },
        {
            name: "Beijing",
            population: 52,
            color: colors.green,
            legendFontColor: colors.creamWhite,
            legendFontSize: 15,
        },
        {
            name: "New York",
            population: 850,
            color: colors.royalBlue,
            legendFontColor: colors.creamWhite,
            legendFontSize: 15,
        },
        {
            name: "Moscow",
            population: 110,
            color: colors.lightGreen,
            legendFontColor: colors.creamWhite,
            legendFontSize: 15,
        },
    ];

    const g = "M";
    const Gender = g => {
        return g === "M" ? "e" : "a";
    };

    const carbonUsage = "340,6";

    return (
        <View style={styles.chartView}>
            <Text style={[styles.chartHeader, styles.nova]}>W tym miesiącu wygenerował{Gender(g)}ś</Text>
            <Text style={[styles.chartSummary, styles.monoton]}>
                {carbonUsage}KG CO<Text style={{ fontSize: 28 }}>2</Text>
            </Text>

            <PieChart
                data={data}
                width={w}
                height={220}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                center={[10, 10]}
                absolute
            />
        </View>
    );
};

const Activity = () => {
    return (
        <LinearGradient style={styles.activityBorder} colors={[colors.green, colors.background, "white"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <ImageBackground blurRadius={12}>
                <Pressable style={styles.activity} opacity={0.95}>
                    <FontAwesomeIcon icon={faCar} color={colors.creamWhite} size={50} />
                    <View style={styles.ativityText}>
                        <Text style={[styles.activityTitle, styles.nova]}>JAZDA AUTEM/PALIWO</Text>
                        <Text style={[styles.activityDetails, styles.nova]}>Przejechano 15km - 3l paliwa</Text>
                        <Text style={[styles.activityDate, styles.nova]}>Dzisiaj 15:53</Text>
                    </View>
                </Pressable>
            </ImageBackground>
        </LinearGradient>
    );
};

const NavBar = () => {
    return (
        <View style={styles.navBar}>
            <Pressable>
                <FontAwesomeIcon icon={faBars} size={30} color={colors.creamWhite} />
            </Pressable>
            <Pressable style={{ alignItems: "center", bottom: 20 }}>
                <LinearGradient colors={[colors.green, colors.background]} style={styles.addBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1.4 }}>
                    <FontAwesomeIcon icon={faPlus} size={40} color={colors.creamWhite} />
                </LinearGradient>
                <Text style={[styles.addBtnText, styles.nova]}>Dodaj aktywność</Text>
            </Pressable>
            <Pressable>
                <FontAwesomeIcon icon={faLeaf} size={30} color={colors.creamWhite} />
            </Pressable>
        </View>
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
        width: 55,
        height: 55,
        borderRadius: 55,
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
        marginTop: 25,
        alignItems: "center",
    },

    chartHeader: {
        color: "white",
        fontSize: 20,
    },

    chartSummary: {
        color: "white",
        fontSize: 46,
    },
    activityBorder: {
        borderRadius: 14,
        marginVertical: 5,
    },
    activity: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        margin: 2,
        backgroundColor: colors.backgroundDark,
        width: w - 50,
        height: 100,
        padding: 10,
        borderRadius: 13,
    },
    activityIcon: {
        colors: colors.creamWhite,
    },
    activityTitle: {
        color: "white",
    },
    activityDetails: {
        color: "white",
    },
    activityDate: {
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
