import { StyleSheet, Text, View, Button } from "react-native";
import { Header } from "./components/Header";

export default function App() {
    return (
        <View style={styles.container}>
            <Header />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        height:"100%",
        backgroundColor: "#38a3a5",
    },
});
