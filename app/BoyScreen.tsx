import * as React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Header, Input } from "react-native-elements"
import * as Notifications from 'expo-notifications';
import { submitToken, Token } from "./services/api";


async function getNotificationToken() {
    try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (finalStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
            if (finalStatus !== 'granted') {
                alert('Failed to request permissions');
                return;
            }
        }

        const tokenData = await Notifications.getExpoPushTokenAsync({
            projectId: '5acdb473-7c73-41a1-8e73-7b6efc36d3f1',
        });
        const token = tokenData.data;
        console.log({ token });
        // alert(`Notification Token: ${token}`);
        return token;
    } catch (error) {
        console.error('Error getting notification token:', error);
    }
}

const BoyScreen: React.FC = () => {
    const [token, setToken] = React.useState<Token | undefined>()
    return (
        <View>
            <Header centerComponent={{ text: 'Cho bạn nam 👦🏻', style: { color: '#fff' } }} />
            <View style={styles.container}>
                <Text
                    style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center', marginBottom: 20 }}
                >
                    {token ? `Mã số của bạn là ${token.id}.` : 'Bạn chưa có mã số, bấm vào đây để lấy mã' }
                </Text>
                <TouchableOpacity 
                onPress={async () => {
                    const token = await getNotificationToken()
                    if (token) {
                        const storedToken = await submitToken(token)
                        setToken(storedToken)
                    }
                }}
                style={styles.button}>
                    <Text>Bấm để lấy mã số</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
})

export default BoyScreen;