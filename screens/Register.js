import React, { useState, useCallback } from "react";
import { ImageBackground, Text, View, StyleSheet, Dimensions, Image, TextInput, Pressable, Alert } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Monoton_400Regular } from "@expo-google-fonts/monoton";
import { NovaRound_400Regular } from "@expo-google-fonts/nova-round";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Picker } from "@react-native-picker/picker";

const w = Dimensions.get("window").width;
const h = "100%";

const Register = ({navigation}) => {
    let [login, getLogin] = useState();
    let [password, getPassword] = useState();
    let [gender, getGender] = useState();
    let [name, getName] = useState();
    let [surname, getSurname] = useState();
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

    const validate = () => {
        if (
            login === undefined ||
            login == "" ||
            password == "" ||
            password === undefined ||
            gender === undefined ||
            gender == "" ||
            name === undefined ||
            name == "" ||
            surname === undefined ||
            surname == ""
        ) {
            Alert.alert("Błąd", "Uzupełnij wszystkie pola");
        } else {
            navigation.navigate("Login");
        }
    };

    const uriBg = "../assets/bgRegister.png";
    const logoUri = "../assets/captionLogoWhite.png";
    return (
        <View onLayout={onLayoutRootView}>
            <ImageBackground source={require(uriBg)} style={styles.bg}>
                <Image source={require(logoUri)} style={styles.mainLogo} resizeMode="contain" />
                <Text style={[styles.nova, styles.registerTitle]}>Zarejestruj się</Text>
                <View style={{ flexDirection: "row", paddingHorizontal: 30 }}>
                    <TextInput
                        editable
                        style={[styles.input, { flex: 1 }]}
                        value={name}
                        onChangeText={name => getName(name)}
                        placeholder="Imię"
                        placeholderTextColor={colors.grayAlpha}
                    />
                    <TextInput
                        editable
                        style={[styles.input, { flex: 1 }]}
                        value={surname}
                        onChangeText={surname => getSurname(surname)}
                        placeholder="Nazwisko"
                        placeholderTextColor={colors.grayAlpha}
                    />
                </View>
                <View style={{ width: w - 80, borderBottomColor: "white", borderBottomWidth: 2 }}>
                    <Picker
                        mode="dropdown"
                        selectedValue={gender}
                        onValueChange={gender => getGender(gender)}
                        style={styles.picker}
                        dropdownIconColor={"white"}
                    >
                        <Picker.Item label="Mężczyzna" value="M" />
                        <Picker.Item label="Kobieta" value="W" />
                    </Picker>
                </View>
                <View style={{ flexDirection: "row", paddingHorizontal: 30 }}>
                    <TextInput
                        editable
                        style={[styles.input, { flex: 1 }]}
                        value={login}
                        onChangeText={login => getLogin(login)}
                        placeholder="Login"
                        placeholderTextColor={colors.grayAlpha}
                    />
                </View>
                <View style={{ width: w, paddingHorizontal: 30 }}>
                    <TextInput
                        editable
                        style={[styles.input]}
                        value={password}
                        onChangeText={password => getPassword(password)}
                        placeholder="Password"
                        placeholderTextColor={colors.grayAlpha}
                        secureTextEntry={isHidden ? true : false}
                    />
                    <Pressable
                        style={styles.hidePass}
                        onPress={() => {
                            setHide(value => !value);
                        }}
                    >
                        <FontAwesomeIcon icon={isHidden ? faEye : faEyeSlash} size={20} color="white" />
                    </Pressable>
                </View>
                <Pressable style={styles.registerBtn} onPress={validate}>
                    <Text style={[styles.monoton, { fontSize: 20 }]}>Zarejestruj</Text>
                </Pressable>
            </ImageBackground>
        </View>
    );
};

export default Register;

const colors = {
    background: "#1f1f1f",
    backgroundDark: "#181818",
    topPanel: "#181818",
    green: "#489A2E",
    lightGreen: "#77ba97",
    tomatoRed: "#BC4749",
    creamWhite: "#E8E5DA",
    royalBlue: "#48639C",
    grayAlpha: `rgba(255, 255, 255, 0.5)`,
};

const styles = StyleSheet.create({
    monoton: {
        fontFamily: "Monoton_400Regular",
    },
    nova: {
        fontFamily: "NovaRound_400Regular",
    },
    bg: {
        alignItems: "center",
        backgroundColor: colors.background,
        bottom: 0,
        height: h,
    },
    mainLogo: {
        marginTop: 60,
        width: w - 20,
    },
    registerTitle: {
        color: "white",
        fontSize: 24,
        marginTop: 10,
    },
    input: {
        color: "white",
        margin: 10,
        fontSize: 20,
        borderColor: "white",
        borderBottomWidth: 2,
        fontFamily: "NovaRound_400Regular",
        padding: 10,
    },
    picker: {
        color: "white",
        height: 57,

        borderColor: "white",
        borderBottomWidth: 2,
        borderColor: "white",
        borderBottomWidth: 2,
    },
    pickerBorder: {
        width: "100%",
        borderBottomWidth: 2,
        borderColor: "white",
        backgroundColor: "white",
    },
    hidePass: {
        position: "absolute",
        right: 35,
        bottom: 10,
        padding: 10,
    },
    registerBtn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.creamWhite,
        width: w - 80,
        height: 50,
        marginTop: 30,
        borderRadius: 50,
    },
});
