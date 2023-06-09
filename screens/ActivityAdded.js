import { View, Text, Pressable } from "react-native";

export default ActivityAdded = ({ navigation }) => {
    return (
        <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Text>Dodano poprawnie!</Text>
            <Pressable
                onPress={() => {
                    navigation.navigate("Home");
                }}
            >
                <Text>Okej, wróć do menu głównego</Text>
            </Pressable>
        </View>
    );
};
