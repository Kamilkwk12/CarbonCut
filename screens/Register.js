import React, { useState, useCallback } from "react";
import { ImageBackground, Text, View, StyleSheet, Dimensions, Image, TextInput, Pressable, Alert, FlatList } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Monoton_400Regular } from "@expo-google-fonts/monoton";
import { NovaRound_400Regular } from "@expo-google-fonts/nova-round";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../FirebaseSetup";
import { storage } from "../FirebaseSetup";
import { ref, uploadBytes } from "firebase/storage";

const w = Dimensions.get("window").width;
const h = "100%";

const Register = ({ navigation }) => {
    const [user, setUser] = useState({ name: "", surname: "", gender: "M", login: "", password: "", profUri: "" });
    const [isHidden, setHide] = useState(true);
    const [image, setImage] = useState(null);

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
        if (user.name.trim().length === 0) {
            Alert.alert("Błąd", "Wypełnij pole 'imię'");
            return;
        }
        if (user.surname.trim().length === 0) {
            Alert.alert("Błąd", "Wypełnij pole 'nazwisko'");
            return;
        }
        if (user.login.trim().length === 0) {
            Alert.alert("Błąd", "Wypełnij pole 'login'");
            return;
        }
        if (user.password.trim().length === 0) {
            Alert.alert("Błąd", "Wypełnij pole 'hasło'");
            return;
        }
        try {
            uploadImage();
            addUser();
        } catch (error) {
            Alert.alert("Error: ", error.message);
            return;
        }
        navigation.navigate("RegisterComplete");
    };

    const addUser = () => {
        const userDb = collection(db, "users");
        addDoc(userDb, {
            name: user.name,
            surname: user.surname,
            login: user.login,
            password: user.password,
            gender: user.gender,
            profImage: "prof" + user.login + ".jpg",
        });
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Potrzebujemy dostępu do galerii w celu wykonania tej czynności");
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        const storageRef = ref(storage, "/prof" + user.login + ".jpg");

        const getBlobFromUri = async uri => {
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", uri, true);
                xhr.send(null);
            });

            return blob;
        };

        const imageBlob = await getBlobFromUri(image);
        try {
            uploadBytes(storageRef, imageBlob);
        } catch (error) {
            console.log(error);
        }
    };

    const uriBg = "../assets/bgRegister.png";
    const logoUri = "../assets/captionLogoWhite.png";
    const defaultImage = "../assets/noImage.png";
    return (
        <View onLayout={onLayoutRootView}>
            <ImageBackground source={require(uriBg)} style={styles.bg}>
                <Image source={require(logoUri)} style={styles.mainLogo} resizeMode="contain" />
                <Text style={[styles.nova, styles.registerTitle]}>Zarejestruj się</Text>
                <Pressable onPress={pickImage}>
                    <Image source={image !== null ? { uri: image } : require(defaultImage)} style={styles.imagePicker} resizeMode="contain" />
                </Pressable>
                <View style={{ flexDirection: "row", paddingHorizontal: 30 }}>
                    <TextInput
                        editable
                        style={[styles.input, { flex: 1 }]}
                        value={user.name}
                        onChangeText={text => setUser({ ...user, name: text })}
                        placeholder="Imię"
                        placeholderTextColor={colors.grayAlpha}
                    />
                    <TextInput
                        editable
                        style={[styles.input, { flex: 1 }]}
                        value={user.surname}
                        onChangeText={text => setUser({ ...user, surname: text })}
                        placeholder="Nazwisko"
                        placeholderTextColor={colors.grayAlpha}
                    />
                </View>
                <View style={{ width: w - 80, borderBottomColor: "white", borderBottomWidth: 2 }}>
                    <Picker
                        mode="dropdown"
                        selectedValue={user.gender}
                        onValueChange={symbol => setUser({ ...user, gender: symbol })}
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
                        value={user.login}
                        onChangeText={text => setUser({ ...user, login: text })}
                        placeholder="Login"
                        placeholderTextColor={colors.grayAlpha}
                    />
                </View>
                <View style={{ width: w, paddingHorizontal: 30 }}>
                    <TextInput
                        editable
                        style={[styles.input]}
                        value={user.password}
                        onChangeText={password => setUser({ ...user, password: password })}
                        placeholder="Hasło"
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
    creamWhite: "#E8E5DA",
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
    imagePicker: {
        marginTop: 20,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});
