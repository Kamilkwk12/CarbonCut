import { StyleSheet, Text, View, Button } from "react-native";
import { Header } from "./components/Header";
import styles from "./scss/app.scss";
export default function App() {
    return (
        <View style={styles.container}>
            <Header />
        </View>
    );
}

const Appstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#38asr3a5",
    },
});
